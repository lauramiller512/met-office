const express = require('express');
const app = express();
const port = 3000;

var apiFuncs = require('./api.js');
const getAllPlaceData = apiFuncs.getAllPlaceData;
const getNextForecast = apiFuncs.getNextForecast;

var helperFuncs = require('./helpers.js');
const checkLocationValidity = helperFuncs.checkLocationValidity;

app.use(express.static('frontend'));

// location = location name as string
app.get(`/forecast/location=:location`, async (req, res) => {

    let location = req.params.location;

    // Get ID of the location
    let locationArray = await getAllPlaceData();
    
    // Look up and return next forecast
    try {
        let validity = checkLocationValidity(location, locationArray)
        // serve up the weather data for validity.id
        if (!validity.isValid) {
            throw error;
        }
        let forecast = await getNextForecast(validity.id);
        console.log(location);
        res.send(forecast);

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
