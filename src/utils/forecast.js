const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=327b057d334d347f589105dc7b282d0a&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, response) => {
        console.log({ response: response })
        if (error) {
            callback('Unable to connect to weather service!', null);
        } else if (response.body.error) {
            callback('Unable to find location. Please check the coordinates!', null);
        } else if (!response.body.daily || !response.body.daily.data || response.body.daily.data.length === 0) {
            callback('Weather data is not available for the provided location.', null);
        } else {
            const summary = response.body.daily.data[0].summary;
            const temperature = response.body.currently.temperature;
            const precipProbability = response.body.currently.precipProbability;
            const forecastData = `${JSON.parse(summary)} It is currently ${JSON.parse(temperature)}° out. There is a ${JSON.parse(precipProbability)}% chance of rain.`;
            callback(null, forecastData);
        }
    });
}

module.exports = forecast;