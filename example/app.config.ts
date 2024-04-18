import { config } from "dotenv";
config();

export default {
  expo: {
    name: "expo-web-maps-example",
    slug: "expo-web-maps-example",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "expo.modules.webmaps.example",
      config: { googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "expo.modules.webmaps.example",
      config: {
        googleMaps: { apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
      config: {
        googleMapsApiKey: process.env.WEB_GOOGLE_MAPS_API_KEY,
        googleMapId: process.env.WEB_GOOGLE_MAPS_ID,
      },
    },
  },
};
