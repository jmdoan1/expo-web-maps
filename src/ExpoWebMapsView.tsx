import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoWebMapsViewProps } from './ExpoWebMaps.types';

const NativeView: React.ComponentType<ExpoWebMapsViewProps> =
  requireNativeViewManager('ExpoWebMaps');

export default function ExpoWebMapsView(props: ExpoWebMapsViewProps) {
  return <NativeView {...props} />;
}
