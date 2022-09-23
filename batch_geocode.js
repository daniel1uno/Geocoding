import { bulkGeocode } from "@esri/arcgis-rest-geocoding";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import * as fs from 'fs';
import dotenv from "dotenv"

dotenv.config()

//Esri auth
const apiKey = process.env.KEY;
const authentication = ApiKeyManager.fromKey(apiKey);


//Read csv file and build object to pass in geocode function
const data = fs.readFileSync('data/Base_inicial_geocodingv2.csv').toString();

const headers = data.slice(0, data.indexOf("\r\n")).split(',')
const rows = data.slice(data.indexOf("\r\n") + 1).split("\r\n");


const total_addresses = rows.map(function (row) {
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


let i = 9
//Define amount of addresses to process
// bulk Geocode accepts max batch of 1000 elements
const addresses = total_addresses.slice(i * 1000, (i * 1000) + 1000)

//Use the geocode function and save results to json file
bulkGeocode({ addresses, authentication: authentication })
  .then((response) => {
    var json_response = JSON.stringify(response);
    fs.writeFile('results/geocode_results' + String(i) + '.json', json_response, 'utf8', err => {
      if (err) {
        console.error(err);
      } else {
        console.log("file written successfully");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
