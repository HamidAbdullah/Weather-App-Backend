import request from "request";

export function weatherStackApi(location, callback) {
    const weatherApiUrl = `https://api.weatherstack.com/current?access_key=327b057d334d347f589105dc7b282d0a&query=${location.latitude},${location.longitude}&units=f`;

    request({ url: weatherApiUrl, json: true }, (apiErrorMessage, response) => {
        if (apiErrorMessage) {
            callback("Unable to connect to WeatherStack API.", null);
            return;
        }

        const { body } = response;
        if (body.error) {
            callback("Unable to find location. Please try another search.", null);
            return;
        }

        const { temperature, feelslike, weather_descriptions } = body.current;
        const data = {
            description: weather_descriptions[0],
            temperature,
            feelslike
        };

        callback(null, data);
    });
}