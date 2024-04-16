import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoWebMaps.web.ts
// and on native platforms to ExpoWebMaps.ts
import ExpoWebMapsModule from "./ExpoWebMapsModule";
import ExpoWebMapsView from "./ExpoWebMapsView";
import { ChangeEventPayload, ExpoWebMapsViewProps } from "./ExpoWebMaps.types";
import MapView from "./Components/MapView";

// Get the native constant value.
export const PI = ExpoWebMapsModule.PI;

export function hello(): string {
  return ExpoWebMapsModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoWebMapsModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ExpoWebMapsModule ?? NativeModulesProxy.ExpoWebMaps
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ExpoWebMapsView, ExpoWebMapsViewProps, ChangeEventPayload };

export default MapView;
