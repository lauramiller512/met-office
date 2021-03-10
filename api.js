var got = require('got');
// Get a list of all of the place names
var API_KEY = require('./config.js');

exports.getAllPlaceData = function() {

    got(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=${API_KEY}`, options)
        .then(response => {
            var responseBody = response.body;
            // console.log(responseBody);
            var locationArray = responseBody.Locations.Location;
            // Loop through and console.log responseBody.Locations.Location[i].name

            // Ask user for input on what location they want to check
            while (true) {

                // Wait for user's response.
                var choice = readlineSync.question('Enter a location: ');
                // Check if inputted choice is valid
                let choiceIsValid = false;
                let locationId;

                // If we find the location name in the array, set choiceIsValid to true and save ID

                for (let i = 0; i < locationArray.length; i++) {
                    if (locationArray[i].name == choice) {
                        choiceIsValid = true;
                        locationId = locationArray[i].id;
                        break;
                    }
                }


                if (choiceIsValid) {
                    handleChoice(choice, locationId);
                    break;
                }
                console.log("Incorrect place name, please re-enter.");
            }


            // Check it exists against our locationArray

            // If no, ask them to re-enter

            // If yes, save the corresponding ID and then make a GET request to that endpoint to print weather info


        });

}

