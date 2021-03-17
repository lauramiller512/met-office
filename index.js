var got = require('got');
var readlineSync = require('readline-sync');

var apiFuncs = require('./api.js');
const getAllPlaceData = apiFuncs.getAllPlaceData;
const getNextForecast = apiFuncs.getNextForecast;

var uiFuncs = require('./ui.js');

var helperFuncs = require('./helpers.js');
const checkLocationValidity = helperFuncs.checkLocationValidity;
const printWeatherData = helperFuncs.printWeatherData;

const requestLocationFromUser = uiFuncs.requestLocationFromUser;
var API_KEY = require('./config.js');


async function main() {

  // Get the list of all locations from API
  let locationArray = await getAllPlaceData();

  let choiceIsValid = false;

  // Ask user for their input
  while (!choiceIsValid) {

    // Choice is a string
    var choice = requestLocationFromUser();

    let choiceInfo = checkLocationValidity(choice, locationArray);

    choiceIsValid = choiceInfo.isValid;
    choiceId = choiceInfo.id;

    if (choiceIsValid) {
      // Look up the valid location's info and display to user
      let nextForecast = await getNextForecast(choice, locationId);

      // Display next forecast
      printWeatherData(nextForecast, choice);

      break;
    }
    console.log("Incorrect place name, please re-enter a valid place name:");
  }
}

main();
