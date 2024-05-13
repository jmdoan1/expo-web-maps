import MapView, { Callout, MapMarker } from "expo-web-maps";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", width: "100%" }}
        googleMapId="90f87356969d889c"
        initialCamera={{
          center: {
            // latitude: 34.1341,
            // longitude: -118.3215,
            latitude: 30.3322,
            longitude: -81.6557,
          },
          heading: -90,
          pitch: 90,
          zoom: 16,
        }}
        provider="google"
        // mapType="hybrid"
      >
        <MapMarker
          id="1"
          coordinate={{
            latitude: 30.3322,
            longitude: -81.6557,
          }}
          title="Broseph"
          // description="wassup"
        >
          <Callout>
            <ScrollView
              contentContainerStyle={{ backgroundColor: "blue" }}
              style={{ width: 300, height: 300 }}
            >
              <View
                style={{
                  backgroundColor: "red",
                  width: 250,
                  height: 250,
                  margin: 10,
                }}
              />
              <View
                style={{
                  backgroundColor: "red",
                  width: 250,
                  height: 250,
                  margin: 10,
                }}
              />
              <View
                style={{
                  backgroundColor: "red",
                  width: 250,
                  height: 250,
                  margin: 10,
                }}
              />
            </ScrollView>
          </Callout>
        </MapMarker>
        <MapMarker
          id="2"
          coordinate={{
            latitude: 30.332,
            longitude: -81.655,
          }}
          title="Wassup"
          // description="bro"
        />
      </MapView>
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
