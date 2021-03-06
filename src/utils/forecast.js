const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6e0df38ded78968548ea32007fbdb4cf/${longitude},${latitude}?units=si&lang=en`;

    request({url : url, json:true}, (error, response) => {
        if (error) {
            callback('Could not connect to forecast.');
            } else if(response.body.error) {
                callback('Could not fetch forecast.');
            } else {
                callback(undefined, response.body.daily.data[0].summary + ' It is currently: ' + response.body.currently.temperature + ' degrees celsius. \nThe daily temperate low is ' + response.body.daily.data[0].temperatureLow + ' degrees celsius. The daily temperatue high is ' + response.body.daily.data[0].temperatureHigh + ' degrees celsius.');
            }
    });
}



module.exports = forecast;