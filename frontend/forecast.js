let textInput = document.getElementById('locationInput');

let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener("click", () => {
    submitLocation();
});

let locationNameArray;

async function populateLocationDropdown() {

    // fetch request to our api (getallplacedata) to get the list of locations
    let response = await fetch(`http://localhost:3000/getAllLocations`);
    console.log(response);
    locationNameArray = await response.json();

    // use that list to populate datalist location-option

    var options = '';

    for (var i = 0; i < locationNameArray.length; i++) {
        options += '<option value="' + locationNameArray[i] + '" />';
    }

    document.getElementById('location-options').innerHTML = options;


    // loop where we add <option> ${arrayitem.name} </option>

}

populateLocationDropdown();


async function submitLocation() {

    let location = document.getElementById('locationInput').value;
    console.log(location);

    // Replace the text on the screen with the response data
    let resultsDiv = document.getElementById('results');

    // Check if location is in the array of all names
    if (!locationNameArray.includes(location)){
        resultsDiv.innerHTML = `<h2>Invalid location - please select from drop-down list</h2>`;
        return;
        // return out of the function
    }

    // Do a get request to our endpoint 
    let response = await fetch(`http://localhost:3000/forecast/location=${location}`);
    console.log(response);
    let responseJson = await response.json();
    console.log(responseJson);


    let weatherStr = parseWeatherType(responseJson["W"]);
    let temp = responseJson["T"];
    let feelsLike = responseJson["F"];

    resultsDiv.innerHTML = `<h1>${location}</h1>
                            <p>Weather: <b>${weatherStr}</b></p>
                            <p>The temperature is <b>${temp}°C</b> and feels like <b>${feelsLike}°C</b></p>
                            <p>Wind speed is <b>${responseJson["S"]} mph</b></p>
                            <p>Chance of rain is <b>${responseJson["Pp"]}%</b></p>
                            `
    textInput.value = "";
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
