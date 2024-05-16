import Constants from "expo-constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { KmlMapEvent, LatLng } from "react-native-maps";

import { MapViewProps } from "./MapViewProps";
import { getMapMarkerString } from "../../Util/ComponentStrings";
import emptyEvent from "../../Util/EmptyEvent";
import mapFunctions from "../../Util/MapFunctions";
import { getZoomFromDelta } from "../../Util/ZoomDelta";

export default function MapView({
  style,
  camera,
  children,
  customMapStyle,
  initialCamera,
  initialRegion,
  kmlSrc,
  googleMapId, // Required if using markers, overrides customMapStyle
  loadingBackgroundColor,
  mapPadding,
  mapTypeWeb,
  maxZoomLevel,
  minZoomLevel,
  moveOnMarkerPress,
  onCalloutPress,
  onDoublePress,
  onIndoorBuildingFocused,
  onIndoorLevelActivated,
  onKmlReady, // partially supported (does not return KMLEvent)
  onLongPress,
  onMapLoaded,
  onMapReady,
  onMarkerDrag,
  onMarkerDragEnd,
  onMarkerDragStart,
  onMarkerPress,
  onPanDrag,
  onPoiClick,
  onPress,
  onRegionChange,
  onRegionChangeComplete,
  onUserLocationChange,
  pitchEnabled,
  region,
  renderingType = "RASTER",
  rotateEnabled,
  scrollDuringRotateOrZoomEnabled,
  scrollEnabled,
  showsBuildings,
  showsCompass, // Not supported
  showsIndoorLevelPicker,
  showsIndoors,
  showsMyLocationButton,
  showsTraffic, // iOS only maybe
  showsUserLocation,
  zoomControlEnabled = true,
  zoomEnabled,
  zoomTapEnabled,
}: Omit<MapViewProps, "onKmlReady"> & {
  onKmlReady?: (event?: KmlMapEvent) => void;
}) {
  const [height, setHeight] = useState(0);
  const [center, setCenter] = useState<LatLng | undefined>();
  const [heading, setHeading] = useState<number | undefined>();
  const [zoom, setZoom] = useState<number | undefined>();
  const [pitch, setPitch] = useState<number | undefined>();
  const [altitude, setAltitude] = useState<number | undefined>();

  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const cameraValue = camera ?? region ?? initialCamera ?? initialRegion;

    if (cameraValue) {
      if ("center" in cameraValue) {
        setCenter(cameraValue.center);
        setHeading(cameraValue.heading);
        setZoom(cameraValue.zoom);
        setPitch(cameraValue.pitch);
        setAltitude(cameraValue.altitude);
      } else {
        setCenter({
          latitude: cameraValue.latitude,
          longitude: cameraValue.longitude,
        });
        setZoom(getZoomFromDelta(cameraValue.latitudeDelta));
      }
    }
  }, [camera, region]);

  const getMarkers = useCallback(() => {
    let result = "";

    React.Children.forEach(children, (child, index) => {
      if (child && child["type"] && child["type"]["name"]) {
        if (child["type"]["name"] === "MapMarker") {
          result = result + getMapMarkerString(child, index);
        }
      }
    });

    return result;
  }, [children]);

  const handleMessage = useCallback((event: MessageEvent) => {
    switch (event.data.type) {
      case "click":
        if (onPress) onPress(event.data.payload);
        break;
      case "dblclick":
        if (onDoublePress) onDoublePress(event.data.payload);
        break;
      case "kmlReady":
        if (onKmlReady)
          onKmlReady({ ...emptyEvent, nativeEvent: { markers: [] } });
        break;
      case "mapLoaded":
        if (onMapLoaded) onMapLoaded(emptyEvent);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  return (
    <View
      style={[{ width: "100%", height: "100%", padding: 0 }, style]}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      //   {...rest}
    >
      <iframe
        ref={frameRef}
        style={{ border: 0 }}
        width="100%"
        height="100%"
        //  https://developers.google.com/maps/documentation/javascript/
        srcDoc={`
          <!DOCTYPE html>
          <html>
          <body>
            <div id="map" style="height: ${height}px; margin: -8px;"/>
            <script>
              var currentInfoWindow = null;

              async function initMap() {
                const { Map, RenderingType } = await google.maps.importLibrary("maps");
                const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

                ${mapFunctions}

                var map = new Map(document.getElementById("map"), {
                  renderingType: RenderingType.${renderingType},
                  ${
                    center
                      ? `center: { lat: ${center.latitude}, lng: ${center.longitude} },`
                      : ""
                  }
                  zoom: ${zoom ?? 5},
                  zoomControl: ${zoomControlEnabled},
                  ${heading !== undefined ? `heading: ${-360 + heading},` : ""}
                  ${altitude !== undefined ? `altitude: ${altitude},` : ""}
                  ${pitch !== undefined ? `tilt: ${pitch},` : ""}
                  // fullscreenControl: false,
                  ${googleMapId ? `mapId: "${googleMapId}",` : ""}
                  ${(customMapStyle ?? []).length > 0 ? `styles: ${JSON.stringify(customMapStyle)},` : ""}
                  ${maxZoomLevel !== undefined ? `maxZoom: "${maxZoomLevel}",` : ""}
                  ${minZoomLevel !== undefined ? `minZoom: "${minZoomLevel}",` : ""}
                  ${loadingBackgroundColor !== undefined ? `backgroundColor: "${loadingBackgroundColor}",` : ""}
                });

                ${mapTypeWeb ? `map.setMapTypeId('${mapTypeWeb}');` : ""}

                ${
                  kmlSrc
                    ? `
                const kmlLayer = new google.maps.KmlLayer({
                  url: "${kmlSrc}",
                });
              
                kmlLayer.setMap(map);
                
                ${
                  onKmlReady
                    ? `
                    google.maps.event.addListener(kmlLayer, 'status_changed', function() {
                      window.parent.postMessage({
                        type: "kmlReady",
                      }, "*");
                    });`
                    : ""
                }
                
                `
                    : ""
                }

                ${
                  showsTraffic
                    ? `
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
                `
                    : ""
                }

                const bounds = new google.maps.LatLngBounds();
                
                var infoWindows = [];

                ${getMarkers()}

                let isDoubleClick = false;
                let debounceDelay = 2500;

                function debounce(fn, delay) {
                  let timeoutID = null;
                  return function(...args) {
                      clearTimeout(timeoutID);
                      timeoutID = setTimeout(() => fn.apply(this, args), delay);
                  };
                }

                function handleClick(event) {
                  if (isDoubleClick) {
                    return;
                  }

                  if (currentInfoWindow) {
                    currentInfoWindow.close();
                  }
                  window.parent.postMessage({
                    type: "click", 
                    payload: {
                      coordinate: getLatLng(event.latLng),
                      position: event.pixel
                    }
                  }, "*");
                }

                const debounceClick = debounce(handleClick, debounceDelay);

                map.addListener("click", debounceClick);

                map.addListener("dblclick", function (event) {
                  isDoubleClick = true;

                  window.parent.postMessage({
                    type: "dblclick", 
                    payload: {
                      coordinate: getLatLng(event.latLng), 
                      position: event.pixel
                    }
                  }, "*");

                  setTimeout(() => {
                    isDoubleClick = false;
                  }, debounceDelay + 1);
                });

                map.addListener("tilesloaded", function () {
                  window.parent.postMessage("mapLoaded", "*");
                });
                
                // map.fitBounds(bounds);


                window.addEventListener('message', function(event) {
                  // Always verify the origin
                  // if (event.origin !== 'http://your-parent-window-origin') return; 
                
                  if (currentInfoWindow) currentInfoWindow.close();
                  if (event.data === -1) {
                    currentInfoWindow = infoWindowUser;
                    infoWindowUser.open(map, markerUser);
                  } else if (event.data !== undefined) {
                    currentInfoWindow = infoWindows[event.data];
                    infoWindows[event.data].open(map, markers[event.data]);
                  }
                  
                });
              }
          
              // Load Google Maps JavaScript API dynamically
              async function loadGoogleMapsScript() {
                var script = document.createElement("script");
                script.src = "https://maps.googleapis.com/maps/api/js?key=${
                  Constants.expoConfig?.web?.config?.googleMapsApiKey
                }&callback=initMap";
                script.defer = true;
                document.head.appendChild(script);
              }
          
              // Call the function to load the API
              loadGoogleMapsScript();
            </script>
          </body>
          </html>
        `}
      />
    </View>
  );
}
