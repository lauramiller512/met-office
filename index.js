var got = require('got');
var readlineSync = require('readline-sync');

var options = {
  responseType: 'json'
};

var API_KEY = require('./config.js');


var apiFuncs = require('./api.js');
const getAllPlaceData = apiFuncs.getAllPlaceData;
const getNextForecast = apiFuncs.getNextForecast;

var uiFuncs = require('./ui.js');
const requestLocationFromUser = uiFuncs.requestLocationFromUser;


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


// repItem should look like:
// {
//   "D": "SSW",
//   "F": "5",
//   "G": "27",
//   "H": "76",
//   "Pp": "91",
//   "S": "9",
//   "T": "7",
//   "V": "MO",
//   "W": "15",
//   "U": "1",
//   "$": "540"
// }
function printWeatherData(repItem, choice) {

  console.log("The weather today in " + choice + " is:");
  
  let weatherStr = parseWeatherType(repItem["W"]);

  console.log("🌁 " + weatherStr);
  console.log("🌡  The temperature is " + repItem["T"] + "°C and feels like " + repItem["F"] + "°C")
  console.log("🌬️  Wind speed is " + repItem["S"] + "mph");
  console.log("🌧️  Chance of rain is " + repItem["Pp"] + "%");

}


function parseWeatherType(number) {
  

  let types = {
    0: "Clear night",
    1: "Sunny day",
    2: "Partly cloudy (night)",
    3: "Partly cloudy (day)",
    4: "Not used",
    5: "Mist",
    6: "Fog",
    7: "Cloudy",
    8: "Overcast",
    9: "Light rain shower (night)",
    10: "Light rain shower (day)",
    11: "Drizzle",
    12: "Light rain",
    13: "Heavy rain shower (night)",
    14: "Heavy rain shower (day)",
    15: "Heavy rain",
    16: "Sleet shower (night)",
    17: "Sleet shower (day)",
    18: "Sleet",
    19: "Hail shower (night)",
    20: "Hail shower (day)",
    21: "Hail",
    22: "Light snow shower (night)",
    23: "Light snow shower (day)",
    24: "Light snow",
    25: "Heavy snow shower (night)",
    26: "Heavy snow shower (day)",
    27: "Heavy snow",
    28: "Thunder shower (night)",
    29: "Thunder shower (day)",
    30: "Thunder"
  }

  return types[number];

}


function checkLocationValidity(choice, locationArray) {
  // If we find the location name in the array, set choiceIsValid to true and save ID


  for (let i = 0; i < locationArray.length; i++) {
    if (locationArray[i].name == choice) {
      locationId = locationArray[i].id;
      return {
        isValid: true,
        id: locationId
      };
    }

  }

  return {
    isValid: false,
    id: undefined
  }


}

main();



