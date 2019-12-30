const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a9b70d388bae2ac42daa902ce94185ba/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error){
            callback("Unable to find location.", undefined)
        } else {
            const temperature = (body.currently.temperature)
            const precipProbability = (body.currently.precipProbability)
            callback(undefined, body.daily.data[0].summary + " It is currently " + temperature + " degrees out. There is " + precipProbability + "% chance of rainfall." )
        }
    })
}

module.exports = forecast