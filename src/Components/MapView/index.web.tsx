import Constants from "expo-constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { LatLng, MapViewProps } from "react-native-maps";

import { getMapMarkerString } from "../../Util/ComponentStrings";
import { getZoomFromDelta } from "../../Util/ZoomDelta";

export default function MapView({
  style,
  camera,
  children,
  compassOffset,
  customMapStyle,
  initialCamera,
  initialRegion,
  kmlSrc,
  googleMapId, // Required if using markers, overrides customMapStyle
  loadingBackgroundColor,
  loadingEnabled,
  loadingIndicatorColor,
  mapPadding,
  mapType,
  maxZoomLevel,
  minZoomLevel,
  moveOnMarkerPress,
  onCalloutPress,
  onDoublePress,
  onIndoorBuildingFocused,
  onIndoorLevelActivated,
  onKmlReady,
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
  zoomControlEnabled,
  zoomEnabled,
  zoomTapEnabled,
}: MapViewProps) {
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
                const { Map } = await google.maps.importLibrary("maps");
                const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

                var map = new Map(document.getElementById("map"), {
                  ${
                    center
                      ? `center: { lat: ${center.latitude}, lng: ${center.longitude} },`
                      : ""
                  }
                  zoom: ${zoom ?? 5},
                  ${heading !== undefined ? `heading: ${-360 + heading},` : ""}
                  ${altitude !== undefined ? `altitude: ${altitude},` : ""}
                  ${pitch !== undefined ? `tilt: ${pitch},` : ""}
                  // fullscreenControl: false,
                  ${googleMapId ? `mapId: "${googleMapId}",` : ""}
                  ${(customMapStyle ?? []).length > 0 ? `styles: ${JSON.stringify(customMapStyle)},` : ""}
                  ${maxZoomLevel !== undefined ? `maxZoom: "${maxZoomLevel}",` : ""}
                  ${minZoomLevel !== undefined ? `minZoom: "${minZoomLevel}",` : ""}
                });

                ${mapType ? `map.setMapTypeId('${mapType}');` : ""}

                ${
                  kmlSrc
                    ? `
                const georssLayer = new google.maps.KmlLayer({
                  url: "${kmlSrc}",
                });
              
                georssLayer.setMap(map);`
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

                // var markers = [];
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
                      cordinate: {
                        latitude: event.latLng.lat(), 
                        longitude: event.latLng.lng()
                      }, 
                      position: event.pixel}
                    }, "*");
                }

                const debounceClick = debounce(handleClick, debounceDelay);

                map.addListener("click", debounceClick);

                map.addListener("dblclick", function (event) {
                  isDoubleClick = true;

                  window.parent.postMessage({
                    type: "dblclick", 
                    payload: {
                      cordinate: {
                        latitude: event.latLng.lat(), 
                        longitude: event.latLng.lng()
                      }, 
                      position: event.pixel}
                    }, "*");

                    setTimeout(() => {
                      isDoubleClick = false;
                    }, debounceDelay + 1);
                });

                map.addListener("tilesloaded", function () {
                  window.parent.postMessage("initialInfoWindow", "*");
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
