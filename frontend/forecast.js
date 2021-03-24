let textInput = document.getElementById('locationInput');

let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener("click", (e) => {
    submitLocation();
    e.preventDefault();
});

let locationNameArray;

async function populateLocationDropdown() {

    // fetch request to our api (getallplacedata) to get the list of locations
    let response = await fetch(`http://localhost:3000/getAllLocations`);
    console.log(response);
    locationNameArray = await response.json();

    // use that list to populate datalist location-option

    var options = '';

    // loop where we add <option> ${arrayitem.name} </option>
    for (var i = 0; i < locationNameArray.length; i++) {
        options += '<option value="' + locationNameArray[i] + '" />';
    }

    document.getElementById('location-options').innerHTML = options;



}

populateLocationDropdown();


async function submitLocation() {

    let location = document.getElementById('locationInput').value;
    console.log(location);

    // Replace the text on the screen with the response data
    let resultsDiv = document.getElementById('results');
    let fiveDayDiv = document.getElementById('five-day-forecast');

    
    // Clear five day forecast and current weather
    fiveDayDiv.innerHTML = "";
    resultsDiv.innerHTML = "<h2>Getting your weather data...</h2>";

    

    // Check if location is in the array of all names
    if (!locationNameArray.includes(location)){
        document.getElementById('locationInput').setCustomValidity("Please enter a valid location");
        resultsDiv.innerHTML = `<h2 id="invalid-location-msg" class="col-12">Invalid location - please select from drop-down list</h2>`;

        document.getElementById('locationInput').addEventListener("keydown", () => {
            document.getElementById('locationInput').setCustomValidity("");
        });
        
        return;
        // return out of the function
    }


    // Do a get request to our endpoint 
    let response = await fetch(`http://localhost:3000/forecast/location=${location}`);
    console.log(response);
    let forecasts = await response.json();

    console.log("Forecastsssssss areeeee", forecasts);

    let weatherStr = parseWeatherType(forecasts.current["W"]);
    let temp = forecasts.current["T"];
    let feelsLike = forecasts.current["F"];

    resultsDiv.innerHTML = `<div class="card" style="width: 40rem">
                                <div class="card-body">
                                    <h2 class="card-title">Current weather in<br>${location}</h2>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">${weatherStr}</li>
                                    <li class="list-group-item">Temperature: <b>${temp}°C</b> and feels like <b>${feelsLike}°C</b></li>
                                    <li class="list-group-item">Wind speed: <b>${forecasts.current["S"]}mph</b></li>
                                    <li class="list-group-item">Chance of rain: <b>${forecasts.current["Pp"]}%</b></li>
                            </div>
                            `
    textInput.value = "";




    let fiveDayHeader = document.createElement("h2");
    fiveDayHeader.textContent = "Five-day forecast:";
    fiveDayDiv.append(fiveDayHeader);
    // Fill in 5-day forecast cards
    for (var i = 0; i < forecasts.fiveDay.length; i++) {
        // 
        let newCard = document.createElement("div");
        newCard.classList.add("col-md-2");

        let temp = forecasts.fiveDay[i].Rep[0]["Dm"];
        let weatherType = parseWeatherType(forecasts.fiveDay[i].Rep[0]["W"]);
        let rainChance = forecasts.fiveDay[i].Rep[0]["PPd"];
        console.log(temp)
        let weatherImgUrl = getWeatherImgUrl(forecasts.fiveDay[i].Rep[0]["W"]);

        let date = parseDateString(forecasts.fiveDay[i].value);
        newCard.innerHTML = `
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${date}</h5>
                                        <img class="card-img-top" src="${weatherImgUrl}" alt="Weather icon">
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">${weatherType}</li>
                                        <li class="list-group-item">Temp: ${temp}°C</li>
                                        <li class="list-group-item">Rain: ${rainChance}%</li>
                                    </ul>
                                </div>
                            `

        fiveDayDiv.append(newCard)
    }

    fiveDayDiv.children[1].classList.add("offset-md-1");

    
    // fiveDayDiv.innerHTML = `Date ${}`


    

}

function parseDateString(inputDate){
    // 2021-03-24Z

    let dateArr = inputDate.split("-");

    let day = dateArr[2].substring(0, dateArr[2].length - 1);

    let newDateStr = day + "/" + dateArr[1];
    return newDateStr;

}

function getWeatherImgUrl(number) {
    let types = {
        0: "Clear night",
        1: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/sun-512.png",
        2: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloud-512.png",
        3: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloud-512.png",
        4: "Not used",
        5: "Mist",
        6: "Fog",
        7: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloud-512.png",
        8: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloud-512.png",
        9: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-cloud-512.png",
        10: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-cloud-512.png",
        11: "Drizzle",
        12: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-cloud-512.png",
        13: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-cloud-512.png",
        14: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-cloud-512.png",
        15: "https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/rain-cloud-512.png",
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
