import Constants from "expo-constants";
import React, { useRef, useState } from "react";
import { View } from "react-native";

import { MapViewProps } from "../../ExpoWebMaps.types";

export default function MapView({
  style,
  center,
  zoom,
  markers,
}: MapViewProps) {
  const [height, setHeight] = useState(0);

  const frameRef = useRef<HTMLIFrameElement>(null);

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
                    center &&
                    `center: { lat: ${center.latitude}, lng: ${center.longitude} }`
                  },
                  zoom: ${zoom ?? 7},
                  fullscreenControl: false,
                  mapId: "${Constants.manifest.web.config.googleMapId}",
                });

                const bounds = new google.maps.LatLngBounds();

                var markers = [];
                var infoWindows = [];
          
                ${(markers ?? [])
                  .map(
                    (obj, index) => `
                    const latLng${index} = { lat: ${obj.latitude}, lng: ${obj.longitude} };

                    // bounds.extend(latLng${index});
                
                    var marker${index} = new AdvancedMarkerElement({
                      position: latLng${index},
                      map: map,
                      title: "${obj.title}",
                    });
                    markers.push(marker${index});
                    
                    var infoWindow${index} = new google.maps.InfoWindow({
                        content: "<b>${obj.title}</b><br/>${obj.description}"
                    });
                    infoWindows.push(infoWindow${index});
                    
                    marker${index}.addListener("click", function () {
                        
                      if (currentInfoWindow) {
                        currentInfoWindow.close();
                      }
                      
                      currentInfoWindow = infoWindow${index};
                      infoWindow${index}.open({anchor: marker${index}, map});
                      window.parent.postMessage(${index}, "*");
                    });
                    `
                  )
                  .join("")}

                map.addEventListener("click", function () {
                  if (currentInfoWindow) {
                    currentInfoWindow.close();
                  }
                });

                map.addEventListener("tilesloaded", function () {
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
                  Constants.manifest.web.config.googleMapsApiKey
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
