exports.requestLocationFromUser = function () {

    // Wait for user's response.
    var choice = readlineSync.question('Enter a location: ');
    // Check if inputted choice is valid

    return choice;
};

exports.checkLocationValidity = function (choice, locationArray) {
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

exports.printWeatherData = function (repItem, choice) {

    console.log("The weather today in " + choice + " is:");

    let weatherStr = parseWeatherType(repItem["W"]);

    console.log("🌁 " + weatherStr);
    console.log("🌡  The temperature is " + repItem["T"] + "°C and feels like " + repItem["F"] + "°C")
    console.log("🌬️  Wind speed is " + repItem["S"] + "mph");
    console.log("🌧️  Chance of rain is " + repItem["Pp"] + "%");
}

exports.dataAsHtml = function (repItem, location) {

    let newDiv = document.createElement("div");

    let weatherStr = parseWeatherType(repItem["W"]);
    let temp = repItem["T"];
    let feelsLike = repItem["F"];


    newDiv.innerHTML = `<h1>${location}</h1>
    <p>${weatherStr}</p>
    <p>The temperature is ${temp}°C and feels like ${feelsLike}°C"</p>
    `
    
    console.log("The weather today in " + choice + " is:");
    console.log("🌬️  Wind speed is " + repItem["S"] + "mph");
    console.log("🌧️  Chance of rain is " + repItem["Pp"] + "%");


    return newDiv;
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
