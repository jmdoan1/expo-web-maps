import React from "react";
import { Text } from "react-native";
import {
  default as RNMapView,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import { MapViewProps } from "../../ExpoWebMaps.types";

export default function MapView(props: MapViewProps) {
  function getDeltaFromZoom(zoom: number) {
    const earthCircumference = 40075; // in kilometers
    const angle = earthCircumference / Math.pow(2, zoom + 0.25); // +1 because map's full width shows at zoom 0

    return {
      latitudeDelta: angle / 110.574,
      longitudeDelta: angle / (111.32 * Math.cos(0)),
    };
  }

  return (
    <RNMapView
      style={{ width: "100%", height: "100%" }}
      // provider={PROVIDER_GOOGLE}
      initialRegion={
        props.center
          ? {
              latitude: props.center.latitude,
              longitude: props.center.longitude,
              ...getDeltaFromZoom(props.zoom ?? 10),
            }
          : undefined
      }
    >
      {props.markers?.map((marker, index) => {
        return (
          <Marker
            key={`marker${index}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        );
      })}
    </RNMapView>
  );
}
