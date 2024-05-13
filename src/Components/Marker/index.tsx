import { MapMarker as RNMarker, MapMarkerProps } from "react-native-maps";

export default function MapMarker(props: MapMarkerProps) {
  return <RNMarker {...props} />;
}
