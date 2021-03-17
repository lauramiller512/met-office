var readlineSync = require('readline-sync');
var API_KEY = require('./config.js');

var apiFuncs = require('./api.js');
const getLocationData = apiFuncs.getLocationData;


exports.requestLocationFromUser = function () {

        // Wait for user's response.
        var choice = readlineSync.question('Enter a location: ');
        // Check if inputted choice is valid

        return choice;
};
