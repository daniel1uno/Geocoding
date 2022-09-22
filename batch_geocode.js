import { bulkGeocode } from "@esri/arcgis-rest-geocoding";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import * as fs from 'fs';
import dotenv  from "dotenv"

dotenv.config()

//Esri auth
const apiKey = process.env.KEY;
const authentication = ApiKeyManager.fromKey(apiKey);


//Read csv file and build object to pass in geocode function
const data = fs.readFileSync('data/Base_inicial_geocodingv2.csv').toString();

const headers = data.slice(0, data.indexOf("\r\n")).split(',')
const rows = data.slice(data.indexOf("\n") + 1).split("\r\n");

const geocode_this = [
  { OBJECTID: 1, address: "Buckingham Palace" },
  { OBJECTID: 2, address: "Bernardi's Restaurant London" },
  { OBJECTID: 3, address: "58 Brewer Street, London, England" },
]

 /*const total_addresses = rows.map(function (row) {
  const values = row.split(',');
  const element = headers.reduce(function (object, header, index) {
    object[header] = values[index];
    return object;
  }, {});
  return element;
});

total_addresses.forEach(function (entry) {
  entry.OBJECTID = parseInt(entry.OBJECTID, 10);
});





//Define amount of addresses to process 
const addresses = total_addresses.slice(0,1000)*/

//Use the geocode function and save results to json file
console.log(geocode_this)
bulkGeocode({ geocode_this, authentication: authentication }).then(
  response => {
    console.log(response)
  }
)

/*bulkGeocode({ addresses_2, authentication: authentication })
  .then((response) => {
    var json_response = JSON.stringify(response);
    print(json_response)
    fs.writeFile('results/geocode_results.json', json_response, 'utf8', err => {
      if (err) {
        console.error(err);
      } else {
        console.log("file written successfully");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });*/


