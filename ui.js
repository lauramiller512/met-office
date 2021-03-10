var readlineSync = require('readline-sync');
var API_KEY = require('./config.js');

var apiFuncs = require('./api.js');
const getLocationData = apiFuncs.getLocationData;


exports.requestLocationFromUser = function () {

        // Wait for user's response.
        var choice = readlineSync.question('Enter a location: ');
        // Check if inputted choice is valid

        return choice;
    

}

// // Takes a valid place name/id and gets the weather for it
// function handleChoice(choice, locationId) {

//     let url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${locationId}?res=3hourly&key=${API_KEY}`;

//     console.log("your choice name is " + choice);
//     console.log("your id was " + locationId);
//     console.log(url);

//     got(url, options)
//         .then(response => {
//             let key = response.body.SiteRep.Wx.Param;
//             // console.log(key);

//             let locationInfo = response.body.SiteRep.DV.Location;
//             // console.log(locationInfo);

//             let nextForecast = locationInfo.Period[0].Rep;
//             console.log(nextForecast);

//         });

// }
