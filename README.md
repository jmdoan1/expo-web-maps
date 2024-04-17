# expo-web-maps

MapView for Expo web

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
```
- create a `.env.local` file in the example folder and copy over the placeholders from `.envexample`
- Add your own google maps js api key: https://developers.google.com/maps/documentation/javascript/get-api-key
- Add your own map id: https://developers.google.com/maps/documentation/javascript/advanced-markers/start#create_a_map_id
- From the example folder, run the project on web
```bash
cd example #if necessary
npx expo start --web
```
- Play around in the `example/App.tsx` file
  - All props are currently utilized in the example except for `style`

# TODO
- fix callouts not displaying when map clicked
- Integrate react-native-maps and pass through to regular component for mobile, removing the need for users to manage web/mobile functionality on their own
- Consume MapViewProps from react-native-web and provide functionality for each
- Add other components from react-native-web
  - Marker
  - Callout
  - Polygon
  - Polyline
  - Circle
  - Overlay
  - Heatmap
  - Geojson

# *All documentation below this line was autogenerated and serves only as a placeholder*
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

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
