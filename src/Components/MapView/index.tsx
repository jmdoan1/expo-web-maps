import React from "react";
import { default as RNMapView, MapViewProps } from "react-native-maps";

export default function MapView(props: MapViewProps) {
  return <RNMapView {...props} />;
}
