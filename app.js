import request from "request";
// const url =
//     "https://api.weatherstack.com/current?access_key=327b057d334d347f589105dc7b282d0a&query=37.8367,-122.4233&units=f";

// request({ url: url, json: true }, (errorMessage, response) => {
//     // const data = JSON.parse(response.body);
//     console.log(
//         response.body.current.weather_descriptions +
//         ". is is currently ",
//         response.body.current.temperature + 'F',
//         "Feels Like",
//         response.body.current.feelslike
//     );
// });

const weatherApiUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/Market%20Street%20&%20Fremont%20Street.json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoiaGFtaWRhYmR1bGxhaCIsImEiOiJjbTM1dmVhd3kwZnFiMmpwcmQ1aWZueGxiIn0.VA3uHq-3vhFzMmJgid2xpQ";

request({ url: weatherApiUrl, json: true }, (weatherApiError, response) => {
    if (weatherApiError) {
        console.error("Error fetching weather data:", weatherApiError);
        return;
    }

    const coordinates = response?.body?.features?.[0]?.geometry?.coordinates;
    const [longitude, latitude] = coordinates;
    console.log({ coordinates: coordinates });
    console.log(`Your Latitude = ${latitude}, Longitude = ${longitude}`);

});
