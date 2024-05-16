# expo-web-maps

`react-native-maps` extension with compatibility for expo web.

Utilizes the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)

Requires [additional setup with google](https://developers.google.com/maps/documentation/javascript/cloud-setup)

# Installation

## Expo

```bash
npx expo install expo-web-maps
```

Add the following to your app config:

```typescript
...
web: {
  ...
  config: {
    ...
    googleMapsApiKey: YOUR_API_KEY,
  },
},
```

Then follow the additional iOS and Android installation instructions for `react-native-maps`: https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md

## Bare React Native

Use `react-native-maps`

# Using the example app

- Clone the project

```bash
git clone git@github.com:jmdoan1/expo-web-maps.git
```

- cd into the project

```bash
cd expo-web-maps
```

- install dependencies

```bash
npm i
cd example
npm i
cd ios
pod install
```

- create a `.env` file in the example folder and copy over the placeholders from `.envexample`
- Add your own google maps js api key: https://developers.google.com/maps/documentation/javascript/get-api-key
- Add your own map id: https://developers.google.com/maps/documentation/javascript/advanced-markers/start#create_a_map_id
- From the example folder, run the project on web

```bash
cd example #if necessary
npx expo start --web
```

- Play around in the `example/App.tsx` file
  - All props are currently utilized in the example except for `style`

# Supported Components

## MapView

### Props

| Property                          | Default          | iOS                                                                                  | Android                                    | Web                                                 | Description                                                                                                                                                            |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cacheEnabled`                    | `false`          | Apple Maps only                                                                      | Supported                                  | Not supported                                       | If `true` map will be cached and displayed as an image instead of being interactable, for performance usage.                                                           |
| `camera`                          |                  | Supported                                                                            | Supported                                  | Supported                                           | The camera view the map should display. Use the camera system, instead of the region system, if you need control over the pitch or heading.                            |
| `compassOffset`                   |                  | Apple Maps only                                                                      | Not supported                              | Not supported                                       | If set, changes the position of the compass.                                                                                                                           |
| `customMapStyle`                  |                  | Google Maps only                                                                     | Supported                                  | Supported (Do not use if using `Marker` components) | Adds custom styling to the map component. See [README](https://github.com/react-native-maps/react-native-maps#customizing-the-map-style) for more information.         |
| `followsUserLocation`             | `false`          | Apple Maps only                                                                      | Not supported                              | Not supported                                       | If `true` the map will focus on the user's location. This only works if `showsUserLocation` is true and the user has shared their location.                            |
| `initialCamera`                   |                  | Supported                                                                            | Supported                                  | Supported                                           | The initial camera view the map should use. Use this prop instead of `camera` only if you don't want to control the camera of the map besides the initial view.        |
| `initialRegion`                   |                  | Supported                                                                            | Supported                                  | Supported                                           | The initial region to be displayed by the map. Use this prop instead of `region` only if you don't want to control the viewport of the map besides the initial region. |
| `kmlSrc`                          |                  | Google Maps only                                                                     | Supported                                  | Supported                                           | The URL for KML file.                                                                                                                                                  |
| `legalLabelInsets`                |                  | Apple Maps only                                                                      | Not supported                              | Not supported                                       | If set, changes the position of the "Legal" label link in Apple maps.                                                                                                  |
| `liteMode`                        |                  | Not supported                                                                        | Supported                                  | Not supported                                       | Enables lite mode on Android.                                                                                                                                          |
| `googleMapId`                     |                  | Google Maps only                                                                     | Supported                                  | Supported (Required if using Markers)               | Google cloud mapId to enable cloud styling and more.                                                                                                                   |
| `googleRenderer`                  | `LATEST`         | Not supported                                                                        | Supported                                  | Not supported. Use `renderingType`                  | Google maps renderer.                                                                                                                                                  |
| `loadingBackgroundColor`          | `#FFFFFF`        | Apple Maps only                                                                      | Supported                                  | Supported                                           | Sets loading background color.                                                                                                                                         |
| `loadingEnabled`                  | `false`          | Apple Maps only                                                                      | Supported                                  | Not supported                                       | If `true` a loading indicator will show while the map is loading.                                                                                                      |
| `loadingIndicatorColor`           | `#606060`        | Apple Maps only                                                                      | Supported                                  | Not supported                                       | Sets loading indicator color.                                                                                                                                          |
| `mapPadding`                      |                  | Supported                                                                            | Supported                                  | Not supported -- TODO                               | Adds custom padding to each side of the map. Useful when map elements/markers are obscured.                                                                            |
| `mapType`                         | `standard`       | hybrid, mutedStandard, satellite, standard, terrain, hybridFlyover, satelliteFlyover | hybrid, none, satellite, standard, terrain | Not supported. Use `mapTypeWeb`                     | The map type to be displayed.                                                                                                                                          |
| `mapTypeWeb`                      |                  | Not supported                                                                        | Not supported                              | hybrid, roadmap, satellite, terrain                 | The map type to be displayed.                                                                                                                                          |
| `maxDelta`                        |                  | Apple Maps only                                                                      | Not supported                              | Not supported                                       | TODO: Add documentation                                                                                                                                                |
| `maxZoomLevel`                    | `20`             | Supported                                                                            | Supported                                  | Supported                                           | Maximum zoom value for the map, must be between 0 and 20.                                                                                                              |
| `minDelta`                        |                  | Apple Maps only                                                                      | Not supported                              | Not supported                                       | TODO: Add documentation                                                                                                                                                |
| `minZoomLevel`                    | `0`              | Supported                                                                            | Supported                                  | Supported                                           | Minimum zoom value for the map, must be between 0 and 20.                                                                                                              |
| `moveOnMarkerPress`               | `true`           | Not supported                                                                        | Supported                                  | TODO                                                | If `false` the map won't move to the marker when pressed.                                                                                                              |
| `onCalloutPress`                  |                  | Apple Maps only                                                                      | Supported                                  | TODO                                                | Callback that is called when a callout is tapped by the user.                                                                                                          |
| `onDoublePress`                   |                  | Apple Maps only                                                                      | Supported                                  | Supported                                           | Callback that is called when user double taps on the map.                                                                                                              |
| `onIndoorBuildingFocused`         |                  | Google Maps only                                                                     | Supported                                  | TODO                                                | Callback that is called when an indoor building is focused/unfocused.                                                                                                  |
| `onIndoorLevelActivated`          |                  | Google Maps only                                                                     | Supported                                  | TODO                                                | Callback that is called when a level on indoor building is activated.                                                                                                  |
| `onKmlReady`                      |                  | Google Maps only                                                                     | Supported                                  | Partially supported (returns empty event)           | Callback that is called once the kml is fully loaded.                                                                                                                  |
| `onLongPress`                     |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called when user makes a "long press" somewhere on the map.                                                                                           |
| `onMapLoaded`                     |                  | Google Maps only                                                                     | Supported                                  | Partially supported (returns empty event)           | Callback that is called when the map has finished rendering all tiles.                                                                                                 |
| `onMapReady`                      |                  | Supported                                                                            | Supported                                  | Not supported                                       | Callback that is called once the map is ready.                                                                                                                         |
| `onMarkerDeselect`                |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called when a marker on the map becomes deselected.                                                                                                   |
| `onMarkerDrag`                    |                  | Apple Maps only                                                                      | Supported                                  | TODO                                                | Callback called continuously as a marker is dragged.                                                                                                                   |
| `onMarkerDragEnd`                 |                  | Apple Maps only                                                                      | Supported                                  | TODO                                                | Callback that is called when a drag on a marker finishes.                                                                                                              |
| `onMarkerDragStart`               |                  | Apple Maps only                                                                      | Supported                                  | TODO                                                | Callback that is called when the user initiates a drag on a marker (if it is draggable).                                                                               |
| `onMarkerPress`                   |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called when a marker on the map is tapped by the user.                                                                                                |
| `onMarkerSelect`                  |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called when a marker on the map becomes selected.                                                                                                     |
| `onPanDrag`                       |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called when user presses and drags the map.                                                                                                           |
| `onPoiClick`                      |                  | Google Maps only                                                                     | Supported                                  | TODO                                                | Callback that is called when user click on a POI.                                                                                                                      |
| `onPress`                         |                  | Supported                                                                            | Supported                                  | Supported                                           | Callback that is called when user taps on the map.                                                                                                                     |
| `onRegionChange`                  |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called continuously when the region changes.                                                                                                          |
| `onRegionChangeComplete`          |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called once when the region changes.                                                                                                                  |
| `onUserLocationChange`            |                  | Supported                                                                            | Supported                                  | TODO                                                | Callback that is called when the underlying map figures our users current location.                                                                                    |
| `paddingAdjustmentBehavior`       |                  | Google Maps only                                                                     | Not supported                              | Not supported                                       | Indicates how/when to affect padding with safe area insets.                                                                                                            |
| `pitchEnabled`                    | `true`           | Google Maps only                                                                     | Supported                                  | TODO                                                | If `false` the user won't be able to adjust the camera’s pitch angle.                                                                                                  |
| `provider`                        |                  | Supported                                                                            | Supported                                  | Supported                                           | The map framework to use.                                                                                                                                              |
| `region`                          |                  | Supported                                                                            | Supported                                  | Supported                                           | The region to be displayed by the map.                                                                                                                                 |
| `renderingType`                   | `RASTER`         | Not supported                                                                        | Not supported                              | Supported                                           | Google maps rendering type.                                                                                                                                            |
| `rotateEnabled`                   | `true`           | Google Maps only                                                                     | Supported                                  | TODO                                                | If `false` the user won't be able to adjust the camera’s pitch angle.                                                                                                  |
| `scrollDuringRotateOrZoomEnabled` | `true`           | Google Maps only                                                                     | Supported                                  | TODO                                                | If `false` the map will stay centered while rotating or zooming.                                                                                                       |
| `scrollEnabled`                   | `true`           | Supported                                                                            | Supported                                  | TODO                                                | If `false` the user won't be able to change the map region being displayed.                                                                                            |
| `showsBuildings`                  | `true`           | Not supported                                                                        | Supported                                  | TODO                                                | A Boolean indicating whether the map displays extruded building information.                                                                                           |
| `showsCompass`                    | `true`           | Supported                                                                            | Supported                                  | Not supported                                       | If `false` compass won't be displayed on the map.                                                                                                                      |
| `showsIndoorLevelPicker`          | `false`          | Google Maps only                                                                     | Supported                                  | TODO                                                | A Boolean indicating whether indoor level picker should be enabled.                                                                                                    |
| `showsIndoors`                    | `true`           | Google Maps only                                                                     | Supported                                  | TODO                                                | A Boolean indicating whether indoor maps should be enabled.                                                                                                            |
| `showsMyLocationButton`           | `true`           | Google Maps only                                                                     | Supported                                  | TODO                                                | If `false` hide the button to move map to the current user's location.                                                                                                 |
| `showsPointsOfInterest`           | `true`           | Maybe Apple Maps?                                                                    | Not supported                              | TODO                                                | If `false` points of interest won't be displayed on the map.                                                                                                           |
| `showsScale`                      | `true`           | Apple Maps only                                                                      | Not supported                              | Not supported                                       | A Boolean indicating whether the map shows scale information.                                                                                                          |
| `showsTraffic`                    | `false`          | Supported                                                                            | Not supported?                             | Supported                                           | A Boolean value indicating whether the map displays traffic information.                                                                                               |
| `showsUserLocation`               | `false`          | Supported                                                                            | Supported                                  | TODO                                                | If `true` the users location will be displayed on the map. This will cause iOS to ask for location permissions.                                                        |
| `tintColor`                       | `System Blue`    | Apple Maps only                                                                      | Not supported                              | Not supported                                       | Sets the tint color of the map. (Changes the color of the position indicator)                                                                                          |
| `toolbarEnabled`                  | `true`           | Not supported                                                                        | Supported                                  | TODO?                                               | If `false` will hide 'Navigate' and 'Open in Maps' buttons on marker press.                                                                                            |
| `userInterfaceStyle`              | `System setting` | Apple Maps only (iOS >= 13.0)                                                        | Not supported                              | Not supported                                       | Sets the map to the style selected.                                                                                                                                    |
| `userLocationAnnotationTitle`     | `My Location`    | Apple Maps only                                                                      | Not supported                              | Not supported                                       | The title of the annotation for current user location.                                                                                                                 |
| `userLocationCalloutEnabled`      | `false`          | Apple Maps only                                                                      | Not supported                              | Not supported                                       | If `true` clicking user location will show the default callout for userLocation annotation.                                                                            |
| `userLocationFastestInterval`     | `5000`           | Not supported                                                                        | Supported                                  | TODO?                                               | Fastest interval the application will actively acquire locations.                                                                                                      |
| `userLocationPriority`            | `high`           | Not supported                                                                        | Supported                                  | TODO?                                               | Set power priority of user location tracking.                                                                                                                          |
| `userLocationUpdateInterval`      | `5000`           | Not supported                                                                        | Supported                                  | TODO?                                               | Interval of user location updates in milliseconds.                                                                                                                     |
| `zoomControlEnabled`              | `true`           | Not supported                                                                        | Supported                                  | Supported                                           | If `false` the zoom control at the bottom right of the map won't be visible.                                                                                           |
| `zoomEnabled`                     | `true`           | Supported                                                                            | Supported                                  | TODO                                                | If `false` the user won't be able to pinch/zoom the map.                                                                                                               |
| `zoomTapEnabled`                  | `true`           | Google Maps only                                                                     | Not supported                              | TODO?                                               | If `false` the user won't be able to double tap to zoom the map.                                                                                                       |
| `cameraZoomRange`                 |                  | 13.0+                                                                                | Not supported                              | Not supported                                       | Map camera distance limits. `minCenterCoordinateDistance` for minimum distance, `maxCenterCoordinateDistance` for maximum.                                             |

## Marker

### Props

Integration Pending

## Callout

### Props

Integration Pending

# TODO

- Additional MapViewProps integration
- Marker props integration
- Callout props integration
- Add other components from react-native-web
  - Polygon
  - Polyline
  - Circle
  - Overlay
  - Heatmap
  - Geojson

# _All documentation below this line was autogenerated and serves only as a placeholder_

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/web-maps.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/web-maps/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-web-maps
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.

### Configure for Android

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
