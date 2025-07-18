import request from "request"

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: body.features[0].center[1],
//                 longitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

const geocode = (address, callback) => {
    const apiKey = '7ff965bdb7b144079b41779d108d6ae9'; // <-- Remplace par ta clé perso
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(address) + '&key=' + apiKey + '&limit=1';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if (!body || body.results.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const result = body.results[0];
            callback(undefined, {
                latitude: result.geometry.lat,
                longitude: result.geometry.lng,
                location: result.formatted
            });
        }
    });
};

export {
    geocode
}