import React from "react";
import ReactDOMServer from "react-dom/server";
import { MapCalloutProps, MapMarkerProps } from "react-native-maps";

type ChildType =
  | string
  | number
  | boolean
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | null
  | undefined;

export function getMapMarkerString(marker: ChildType, index: number) {
  if (!marker) return "";

  const {
    anchor,
    calloutAnchor,
    coordinate,
    description,
    draggable,
    flat,
    icon,
    identifier,
    id,
    image,
    onCalloutPress,
    onDrag,
    onDragEnd,
    onDragStart,
    onPress,
    opacity,
    pinColor,
    rotation,
    title,
    zIndex,
  } = marker["props"] as MapMarkerProps;

  return `

  const latLng${index} = { lat: ${coordinate.latitude}, lng: ${coordinate.longitude} };

  // bounds.extend(latLng${index});

  var marker${index} = new AdvancedMarkerElement({
    position: latLng${index},
    map: map,
    title: "${title}",
  });
//   markers.push(marker${index});
  
  ${getInfoWindowString(marker, index)}
  
  marker${index}.addListener("click", function () {
      
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }
    
    if (infoWindow${index}) {
      currentInfoWindow = infoWindow${index};
      infoWindow${index}.open({anchor: marker${index}, map});
    }
    window.parent.postMessage(${index}, "*");
  });

  `;
}

export function getInfoWindowString(marker: ChildType, index: number) {
  if (!marker) return "";
  const { title, description, children } = marker["props"] as MapMarkerProps;

  let response =
    title || description
      ? `
var infoWindow${index} = new google.maps.InfoWindow({
  content: "${title ? `<b>${title}</b>` : ""}${title && description ? "<br/>" : ""}${description ? description : ""}"
});
infoWindows.push(infoWindow${index});
`
      : `
  infoWindows.push(null);
  `;

  React.Children.forEach(children, (child, index) => {
    if (child && child["type"] && child["type"]["name"]) {
      if (child["type"]["name"] === "Callout") {
        const childs = (child["props"] as MapCalloutProps).children;
        if (childs) {
          const val = ReactDOMServer.renderToString(childs);
          if (val) {
            response = `
            var infoWindow${index} = new google.maps.InfoWindow({
              content: '${val}'
            });
            infoWindows.push(infoWindow${index});
            `;
          }
        }
      }
    }
  });

  return response;
}
