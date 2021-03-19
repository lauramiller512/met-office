var got = require('got');
var API_KEY = require('./config.js');

var options = {
    responseType: 'json'
};

exports.getAllPlaceData = async function () {

    const response = await got(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${API_KEY}`, options);
    var locationArray = response.body.Locations.Location;
    return locationArray;

}

exports.getNextForecast = async function (locationId) {

    let url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${locationId}?res=3hourly&key=${API_KEY}`;
    const response = await got(url, options);
    let nextForecast = response.body.SiteRep.DV.Location.Period[0].Rep[0];
    return nextForecast;
}
