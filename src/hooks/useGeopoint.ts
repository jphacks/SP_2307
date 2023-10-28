export const useGeopoint = () => {
    const internal = async () => {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
        return position;
    }

    return {
        getLocation: internal
    }
}