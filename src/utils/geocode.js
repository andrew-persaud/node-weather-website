const request = require('request');

const geoCode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZHJldzg3IiwiYSI6ImNqc3I4bTQwMzFmcGE0YnN6YmgzZ295YWkifQ.E6O0FfwFypHadaioCGfV6g&limit=1`;
    request({url : geoUrl, json : true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Location not found.', undefined);
        } else {
            const latitude = response.body.features[0].center[0];
            const longitude = response.body.features[0].center[1];
            const location = response.body.features[0].place_name;
            const obj = {
                latitude,
                longitude,
                location
            };
            callback(undefined, obj);
        }
    })
};


module.exports = geoCode;