const express = require('express');
const app = express();
const port = 3000;

var apiFuncs = require('./api.js');
const getAllPlaceData = apiFuncs.getAllPlaceData;
const getNextForecast = apiFuncs.getNextForecast;
const getFiveDayForecast = apiFuncs.getFiveDayForecast;

var helperFuncs = require('./helpers.js');
const checkLocationValidity = helperFuncs.checkLocationValidity;

app.use(express.static('frontend'));

app.get(`/getAllLocations`, async (req, res) => {
    let locationArray = await getAllPlaceData();
    
    let locationNameArray = [];

    locationArray.forEach(location => {
        locationNameArray.push(location.name);
    });

    locationNameArray.sort();

    res.send(locationNameArray);

});

// location = location name as string
app.get(`/forecast/location=:location`, async (req, res) => {

    let location = req.params.location;

    // Get ID of the location
    let locationArray = await getAllPlaceData();
    
    // Look up and return next forecast and five day forecast
    try {
        let validity = checkLocationValidity(location, locationArray)
        // serve up the weather data for validity.id
        if (!validity.isValid) {
            throw error;
        }
        // get current forecast
        let currentForecast = await getNextForecast(validity.id);
        
        // get the five day forecast
        let fiveDayForecast = await getFiveDayForecast(validity.id);

        console.log('five day is:', fiveDayForecast);

        let forecasts = {
            current: currentForecast,
            fiveDay: fiveDayForecast
        }
        // current forecast looks like:
        // {
        //     D: 'WSW',
        //     F: '6',
        //     G: '18',
        //     H: '89',
        //     Pp: '4',
        //     S: '13',
        //     T: '9',
        //     V: 'VG',
        //     W: '3',
        //     U: '2',
        //     '$': '540'
        //   }

        res.send(forecasts);

    } catch (error) {
        // send a 404, location doesn't exist
        console.error(error);
        console.log("We threw an error!");
        res.send("Error");
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
