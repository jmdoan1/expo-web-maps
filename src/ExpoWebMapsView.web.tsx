import * as React from 'react';

import { ExpoWebMapsViewProps } from './ExpoWebMaps.types';

export default function ExpoWebMapsView(props: ExpoWebMapsViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
