const request = require('request')


const forecast = (lon, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/9f8cf73b800194be565ab418fb29e1d3/' +lon +',' + lat
    request({url:url, json: true}, (error, response) => {
        if (error){
            callback('Please check network!', undefined)
        } else if (response.body.error) {
            callback('Could not find locaton!')
        }
        else {
            callback(undefined, response.body.daily.data[0].summary +" It is currently " +response.body.currently.temperature+ " degrees out. There is a " +response.body.currently.precipProbability+ "% chance of rain.")
        }
    })

}

module.exports =forecast

// const url = 'https://api.darksky.net/forecast/9f8cf73b800194be565ab418fb29e1d3/37.8267,-122.4233'


// request({url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('Please check network connectivity!')
//     } else if (response.body.error) {
//         console.log('Could not find the location!')
//     }
//     else { 
//         console.log(response.body.daily.data[0].icon +". It is currently " +response.body.currently.temperature+ " degrees out. There is a " +response.body.currently.precipProbability+ "% chance of rain.")
//     } 
// }) 