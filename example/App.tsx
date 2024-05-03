import MapView from "expo-web-maps";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        googleMapId="90f87356969d889c"
        initialCamera={{
          center: {
            // latitude: 34.1341,
            // longitude: -118.3215,
            latitude: 30.3322,
            longitude: -81.6557,
          },
          heading: 90,
          pitch: 90,
          zoom: 16,
        }}
        mapType="hybrid"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
