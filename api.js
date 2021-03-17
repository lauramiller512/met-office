var got = require('got');
// Get a list of all of the place names
var API_KEY = require('./config.js');

var options = {
    responseType: 'json'
};

exports.getAllPlaceData = async function () {

    const response = await got(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${API_KEY}`, options);

    var responseBody = response.body;

    var locationArray = responseBody.Locations.Location;

    // console.log("location array isssss:", locationArray[0]);

    return locationArray;

}

exports.getNextForecast = async function (locationId) {

    let url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${locationId}?res=3hourly&key=${API_KEY}`;

    const response = await got(url, options);

    let locationInfo = response.body.SiteRep.DV.Location;
    // console.log(locationInfo);

    let nextForecast = locationInfo.Period[0].Rep[0];
    
    return nextForecast;
}
