import React from "react";
import { default as RNMapView } from "react-native-maps";

import { MapViewProps } from "./MapViewProps";

export default function MapView(props: MapViewProps) {
  return <RNMapView {...props} />;
}
