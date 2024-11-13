import request from "request";

// Function to get coordinates for a given address using Mapbox API
export function getCoordinates(address, callback) {
    const accessToken = "pk.eyJ1IjoiaGFtaWRhYmR1bGxhaCIsImEiOiJjbTM1dmVhd3kwZnFiMmpwcmQ1aWZueGxiIn0.VA3uHq-3vhFzMmJgid2xpQ";
    const weatherApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}`;
    
    request({ url: weatherApiUrl, json: true }, (weatherApiError, response) => {
        if (weatherApiError) {
            callback("Error fetching weather data", null);
        } else if (response?.body?.features?.length === 0) {
            callback("Unable to find location", null);
        } else {
            const coordinates = response.body.features[0].geometry.coordinates;
            const placeName = response.body.features[0].place_name;
            const [longitude, latitude] = coordinates;
            callback(null, { latitude, longitude, placeName });
        }
    });
}

