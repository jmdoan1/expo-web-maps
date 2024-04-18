import MapView from "expo-web-maps";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        center={{ latitude: 34.1341, longitude: -118.3215 }}
        zoom={15}
        markers={[
          {
            latitude: 34.1341,
            longitude: -118.3215,
            title: "Hollywood Sign",
            description: "As seen on TV",
          },
        ]}
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
