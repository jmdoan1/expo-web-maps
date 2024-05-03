export function getDeltaFromZoom(zoom: number) {
  const earthCircumference = 40075; // in kilometers
  const angle = earthCircumference / Math.pow(2, zoom + 0.25); // +1 because map's full width shows at zoom 0

  return {
    latitudeDelta: angle / 110.574,
    longitudeDelta: angle / (111.32 * Math.cos(0)),
  };
}

export function getZoomFromDelta(latitudeDelta: number) {
  const earthCircumference = 40075; // Earth's circumference at the equator in kilometers
  const angle = latitudeDelta * 110.574; // Convert latitude delta back to angle

  const zoom = Math.log2(earthCircumference / angle) - 0.25; // Solve for zoom
  return zoom;
}
