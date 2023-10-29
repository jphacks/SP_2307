export const geopointToArray = (geopoint: Pick<GeolocationPosition["coords"], "latitude" | "longitude">):[number, number] => {
    return [ geopoint.latitude, geopoint.longitude]
}