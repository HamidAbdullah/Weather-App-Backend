import request from 'request';
const url = 'https://api.weatherstack.com/current?access_key=327b057d334d347f589105dc7b282d0a&query=New%20York';
request({url: url}, (errorMessage, response) => {
    const data = JSON.parse(response.body);
    console.log({response: data.current});
})