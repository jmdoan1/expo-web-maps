import { StyleProp, ViewStyle } from "react-native";

export interface MapViewProps {
  // https://developers.google.com/maps/documentation/javascript/advanced-markers/start#create_a_map_id
  // mapId: string;
  style?: StyleProp<ViewStyle>;
  center?: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
  markers?: {
    title?: string;
    description?: string;
    latitude: number;
    longitude: number;
  }[];
}

export type ChangeEventPayload = {
  value: string;
};

export type ExpoWebMapsViewProps = {
  name: string;
};
