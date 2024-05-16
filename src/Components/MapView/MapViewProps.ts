import { NativeSyntheticEvent, ViewProps } from "react-native";
import AnimatedRegion from "react-native-maps/lib/AnimatedRegion";
import {
  CalloutPressEvent,
  ClickEvent,
  MarkerDeselectEvent,
  MarkerDragEvent,
  MarkerDragStartEndEvent,
  MarkerPressEvent,
  MarkerSelectEvent,
  Point,
  Provider,
  Region,
} from "react-native-maps/lib/sharedTypes";

import {
  Camera,
  CameraZoomRange,
  Details,
  EdgePadding,
  IndoorBuildingEvent,
  IndoorLevelActivatedEvent,
  KmlMapEvent,
  LongPressEvent,
  MapPressEvent,
  MapStyleElement,
  MapType,
  MapTypeWeb,
  PanDragEvent,
  PoiClickEvent,
  UserLocationChangeEvent,
} from "./MapView.types";

export type MapViewProps = ViewProps & {
  /**
   * If `true` map will be cached and displayed as an image instead of being interactable, for performance usage.
   *
   * @default false
   * @platform iOS: Apple maps only
   * @platform Android: Supported
   * @platform Web: Not supported
   */
  cacheEnabled?: boolean;
  /**
   * The camera view the map should display.
   *
   * Use the camera system, instead of the region system, if you need control over
   * the pitch or heading. Using this will ignore the `region` property.
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  camera?: Camera;
  /**
   * If set, changes the position of the compass.
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  compassOffset?: Point;
  /**
   * Adds custom styling to the map component.
   * See [README](https://github.com/react-native-maps/react-native-maps#customizing-the-map-style) for more information.
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: Supported
   */
  customMapStyle?: MapStyleElement[];
  /**
   * If `true` the map will focus on the user's location.
   * This only works if `showsUserLocation` is true and the user has shared their location.
   *
   * @default false
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  followsUserLocation?: boolean;
  /**
   * The initial camera view the map should use.  Use this prop instead of `camera`
   * only if you don't want to control the camera of the map besides the initial view.
   *
   * Use the camera system, instead of the region system, if you need control over
   * the pitch or heading.
   *
   * Changing this prop after the component has mounted will not result in a camera change.
   *
   * This is similar to the `initialValue` prop of a text input.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  initialCamera?: Camera;
  /**
   * The initial region to be displayed by the map.  Use this prop instead of `region`
   * only if you don't want to control the viewport of the map besides the initial region.
   *
   * Changing this prop after the component has mounted will not result in a region change.
   *
   * This is similar to the `initialValue` prop of a text input.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  initialRegion?: Region;
  /**
   * The URL for KML file.
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: Supported
   */
  kmlSrc?: string;
  /**
   * If set, changes the position of the "Legal" label link in Apple maps.
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  legalLabelInsets?: EdgePadding;
  /**
   * Enables lite mode on Android
   *
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: Not supported
   */
  liteMode?: boolean;
  /**
   * https://developers.google.com/maps/documentation/get-map-id
   * google cloud mapId to enable cloud styling and more
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: Supported (Required if using Markers)
   */
  googleMapId?: string;
  /**
   * https://developers.google.com/maps/documentation/android-sdk/renderer
   * google maps renderer
   * @default `LATEST`
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: Not supported. Use `renderingType`
   */
  googleRenderer?: "LATEST" | "LEGACY";
  /**
   * Sets loading background color.
   *
   * @default `#FFFFFF`
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: Supported
   */
  loadingBackgroundColor?: string;
  /**
   * If `true` a loading indicator will show while the map is loading.
   *
   * @default false
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: Not supported
   */
  loadingEnabled?: boolean;
  /**
   * Sets loading indicator color.
   *
   * @default `#606060`
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: Not supported
   */
  loadingIndicatorColor?: string;
  /**
   * Adds custom padding to each side of the map. Useful when map elements/markers are obscured.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Not supported -- TODO
   */
  mapPadding?: EdgePadding;
  /**
   * The map type to be displayed
   *
   * @default `standard`
   * @platform iOS: hybrid | mutedStandard | satellite | standard | terrain | hybridFlyover | satelliteFlyover
   * @platform Android: hybrid | none | satellite | standard | terrain
   * @platform Web: Not supported. Use `mapTypeWeb`
   */
  mapType?: MapType;
  /**
   * The map type to be displayed
   *
   * @default `standard`
   * @platform iOS: Not supported
   * @platform Android: Not supported
   * @platform Web: hybrid | roadmap | satellite | terrain
   */
  mapTypeWeb?: MapTypeWeb;
  /**
   * TODO: Add documentation
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  maxDelta?: number;
  /**
   * Maximum zoom value for the map, must be between 0 and 20
   *
   * @default 20
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   * @deprecated on Apple Maps, use `cameraZoomRange` instead
   */
  maxZoomLevel?: number;
  /**
   * TODO: Add documentation
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  minDelta?: number;
  /**
   * Minimum zoom value for the map, must be between 0 and 20
   *
   * @default 0
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   * @deprecated on Apple Maps, use `cameraZoomRange` instead
   */
  minZoomLevel?: number;
  /**
   * If `false` the map won't move to the marker when pressed.
   *
   * @default true
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  moveOnMarkerPress?: boolean;
  /**
   * Callback that is called when a callout is tapped by the user.
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onCalloutPress?: (event: CalloutPressEvent) => void;
  /**
   * Callback that is called when user double taps on the map.
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: Supported
   */
  onDoublePress?: (event: ClickEvent) => void;
  /**
   * Callback that is called when an indoor building is focused/unfocused
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onIndoorBuildingFocused?: (event: IndoorBuildingEvent) => void;
  /**
   * Callback that is called when a level on indoor building is activated
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onIndoorLevelActivated?: (event: IndoorLevelActivatedEvent) => void;
  /**
   * Callback that is called once the kml is fully loaded.
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: Partially supported (returns empty event)
   */
  onKmlReady?: (event: KmlMapEvent) => void;
  /**
   * Callback that is called when user makes a "long press" somewhere on the map.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onLongPress?: (event: LongPressEvent) => void;
  /**
   * Callback that is called when the map has finished rendering all tiles.
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: Partially supported (returns empty event)
   */
  onMapLoaded?: (event: NativeSyntheticEvent<object>) => void;
  /**
   * Callback that is called once the map is ready.
   *
   * Event is optional, as the first onMapReady callback is intercepted
   * on Android, and the event is not passed on.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Not supported
   */
  onMapReady?: (event?: NativeSyntheticEvent<object>) => void;
  /**
   * Callback that is called when a marker on the map becomes deselected.
   * This will be called when the callout for that marker is about to be hidden.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onMarkerDeselect?: (event: MarkerDeselectEvent) => void;
  /**
   * Callback called continuously as a marker is dragged
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onMarkerDrag?: (event: MarkerDragEvent) => void;
  /**
   * Callback that is called when a drag on a marker finishes.
   * This is usually the point you will want to setState on the marker's coordinate again
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onMarkerDragEnd?: (event: MarkerDragStartEndEvent) => void;
  /**
   * Callback that is called when the user initiates a drag on a marker (if it is draggable)
   *
   * @platform iOS: Apple Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onMarkerDragStart?: (event: MarkerDragStartEndEvent) => void;
  /**
   * Callback that is called when a marker on the map is tapped by the user.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onMarkerPress?: (event: MarkerPressEvent) => void;
  /**
   * Callback that is called when a marker on the map becomes selected.
   * This will be called when the callout for that marker is about to be shown.
   *
   * @platform iOS: Supported.
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onMarkerSelect?: (event: MarkerSelectEvent) => void;
  /**
   * Callback that is called when user presses and drags the map.
   * **NOTE**: for iOS `scrollEnabled` should be set to false to trigger the event
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onPanDrag?: (event: PanDragEvent) => void;
  /**
   * Callback that is called when user click on a POI.
   *
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onPoiClick?: (event: PoiClickEvent) => void;
  /**
   * Callback that is called when user taps on the map.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  onPress?: (event: MapPressEvent) => void;
  /**
   * Callback that is called continuously when the region changes, such as when a user is dragging the map.
   * `isGesture` property indicates if the move was from the user (true) or an animation (false).
   * **Note**: `isGesture` is supported by Google Maps only.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onRegionChange?: (region: Region, details: Details) => void;
  /**
   * Callback that is called once when the region changes, such as when the user is done moving the map.
   * `isGesture` property indicates if the move was from the user (true) or an animation (false).
   * **Note**: `isGesture` is supported by Google Maps only.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onRegionChangeComplete?: (region: Region, details: Details) => void;
  /**
   * Callback that is called when the underlying map figures our users current location
   * (coordinate also includes isFromMockProvider value for Android API 18 and above).
   * Make sure **showsUserLocation** is set to *true*.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  onUserLocationChange?: (event: UserLocationChangeEvent) => void;
  /**
   * Indicates how/when to affect padding with safe area insets
   *
   * @platform iOS: Google Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  paddingAdjustmentBehavior?: "always" | "automatic" | "never";
  /**
   * If `false` the user won't be able to adjust the camera’s pitch angle.
   *
   * @default true
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  pitchEnabled?: boolean;
  /**
   * The map framework to use.
   * Either `"google"` for GoogleMaps, otherwise `undefined` to use the native map framework (`MapKit` in iOS and `GoogleMaps` in android).
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  provider?: Provider;
  /**
   * The region to be displayed by the map.
   * The region is defined by the center coordinates and the span of coordinates to display.
   *
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  region?: Region | AnimatedRegion;
  /**
   * https://developers.google.com/maps/documentation/javascript/reference/map#RenderingType
   * google maps rendering type
   * @default `RASTER`
   * @platform iOS: Not supported
   * @platform Android: Not supported. Use `googleRenderer`
   * @platform Web: Supported
   */
  renderingType?: "RASTER" | "VECTOR";
  /**
   * If `false` the user won't be able to adjust the camera’s pitch angle.
   *
   * @default true
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  rotateEnabled?: boolean;
  /**
   * If `false` the map will stay centered while rotating or zooming.
   *
   * @default true
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  scrollDuringRotateOrZoomEnabled?: boolean;
  /**
   * If `false` the user won't be able to change the map region being displayed.
   *
   * @default true
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  scrollEnabled?: boolean;
  /**
   * A Boolean indicating whether the map displays extruded building information.
   *
   * @default true
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  showsBuildings?: boolean;
  /**
   * If `false` compass won't be displayed on the map.
   *
   * @default true
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: Not supported
   */
  showsCompass?: boolean;
  /**
   * A Boolean indicating whether indoor level picker should be enabled.
   *
   * @default false
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  showsIndoorLevelPicker?: boolean;
  /**
   * A Boolean indicating whether indoor maps should be enabled.
   *
   * @default true
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  showsIndoors?: boolean;
  /**
   * If `false` hide the button to move map to the current user's location.
   *
   * @default true
   * @platform iOS: Google Maps only
   * @platform Android: Supported
   * @platform Web: TODO
   */
  showsMyLocationButton?: boolean;
  /**
   * If `false` points of interest won't be displayed on the map.
   * TODO: DEPRECATED? Doesn't seem to do anything
   *
   * @default true
   * @platform iOS: Maybe Apple Maps?
   * @platform Android: Not supported
   * @platform Web: TODO
   */
  showsPointsOfInterest?: boolean;
  /**
   * A Boolean indicating whether the map shows scale information.
   *
   * @default true
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  showsScale?: boolean;
  /**
   * A Boolean value indicating whether the map displays traffic information.
   * TODO: Look into android support
   *
   * @default false
   * @platform iOS: Supported
   * @platform Android: Not supported?
   * @platform Web: Supported
   */
  showsTraffic?: boolean;
  /**
   * If `true` the users location will be displayed on the map.
   *
   * This will cause iOS to ask for location permissions.
   * For iOS see: [DOCS](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md#set-the-usage-description-property)
   * @default false
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  showsUserLocation?: boolean;
  /**
   * Sets the tint color of the map. (Changes the color of the position indicator)
   *
   * @default System Blue
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  tintColor?: string;
  /**
   * If `false` will hide 'Navigate' and 'Open in Maps' buttons on marker press
   *
   * @default true
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: TODO?
   */
  toolbarEnabled?: boolean;
  /**
   * Sets the map to the style selected.
   *
   * @default System setting
   * @platform iOS: Apple Maps only (iOS >= 13.0)
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  userInterfaceStyle?: "light" | "dark";
  /**
   * The title of the annotation for current user location.
   *
   * This only works if `showsUserLocation` is true.
   *
   * @default `My Location`
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  userLocationAnnotationTitle?: string;
  /**
   * If `true` clicking user location will show the default callout for userLocation annotation.
   *
   * @default false
   * @platform iOS: Apple Maps only
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  userLocationCalloutEnabled?: boolean;
  /**
   * Fastest interval the application will actively acquire locations.
   *
   * See [Google APIs documentation](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest.html)
   *
   * @default 5000
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: TODO?
   */
  userLocationFastestInterval?: number;
  /**
   * Set power priority of user location tracking.
   *
   * See [Google APIs documentation](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest.html)
   *
   * @default `high`
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: TODO?
   */
  userLocationPriority?: "balanced" | "high" | "low" | "passive";
  /**
   * Interval of user location updates in milliseconds.
   *
   * See [Google APIs documentation](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest.html)
   *
   * @default 5000
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: TODO?
   */
  userLocationUpdateInterval?: number;
  /**
   * If `false` the zoom control at the bottom right of the map won't be visible.
   *
   * @default true
   * @platform iOS: Not supported
   * @platform Android: Supported
   * @platform Web: Supported
   */
  zoomControlEnabled?: boolean;
  /**
   * If `false` the user won't be able to pinch/zoom the map.
   *
   * TODO: Why is the Android reactprop defaultvalue set to false?
   *
   * @default true
   * @platform iOS: Supported
   * @platform Android: Supported
   * @platform Web: TODO
   */
  zoomEnabled?: boolean;
  /**
   * If `false` the user won't be able to double tap to zoom the map.
   * **Note:** But it will greatly decrease delay of tap gesture recognition.
   *
   * @default true
   * @platform iOS: Google Maps only
   * @platform Android: Not supported
   * @platform Web: TODO?
   */
  zoomTapEnabled?: boolean;
  /**
   * Map camera distance limits. `minCenterCoordinateDistance` for minimum distance, `maxCenterCoordinateDistance` for maximum.
   * `animated` for animated zoom changes.
   * Takes precedence if conflicting with `minZoomLevel`, `maxZoomLevel`.
   *
   * @platform iOS: 13.0+
   * @platform Android: Not supported
   * @platform Web: Not supported
   */
  cameraZoomRange?: CameraZoomRange;
};
