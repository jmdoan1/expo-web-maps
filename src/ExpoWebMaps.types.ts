import { StyleProp, ViewStyle } from "react-native";

export interface MapViewProps {
  mapId: string;
  style: StyleProp<ViewStyle>;
  center?: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
  markers?: {
    // id: string;
    name: string;
    latitude: number;
    longitude: number;
    annotation?: {
      header: string;
      info: string;
    };
  }[];
}

export type ChangeEventPayload = {
  value: string;
};

export type ExpoWebMapsViewProps = {
  name: string;
};
