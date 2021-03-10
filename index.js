var got = require('got');

var options = {
    responseType: 'json'
  };
  
  got('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=4656b83f-c74c-4162-b121-9afc46f6e587', options)
    .then(response => {
      var responseBody = response.body;
      // console.log(responseBody);
      var locationArray = responseBody.Locations.Location;
      // Loop through and console.log responseBody.Locations.Location[i].name
      locationArray.forEach(location => {
        console.log(location.name);
      });
    }
  );
