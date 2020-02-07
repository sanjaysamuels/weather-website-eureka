const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3NzYW0iLCJhIjoiY2s2N2pkNWRsMW8zbjNrbzRpaGF1d2c3ZCJ9.5tw4LyGeoc6dUaQE0RhoPw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Please check network services!', undefined)
        } else if (body.features.length === 0) {
            callback('Could not find place. Please try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode


// const Murl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3NzYW0iLCJhIjoiY2s2N2pkNWRsMW8zbjNrbzRpaGF1d2c3ZCJ9.5tw4LyGeoc6dUaQE0RhoPw'

// request({url: Murl, json: true}, (error, response) => {
//     if (error) {
//         console.log('Please check network!')
//     } else if (response.body.features.length === 0){
//         console.log('Could not find your place. Please try another search')
//     }
//     else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }

// })