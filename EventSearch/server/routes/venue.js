let express = require('express');
let router = express.Router();
let request = require('request');
var key = "8DTcNJAYdaDVfkqSq8m5QVBCnnIUK077";
var objects  = require('./object');
var Venue = objects.Venue;
var data;
var stripedData;
var utils = require('./util');
var validate = utils.validate;

function myRequest(url) {
    return new Promise ((resolve, reject) => {
        request.get(url, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    })
}

function handleData(rawData, venueName) {
    let jsData = JSON.parse(rawData);
    let temp;
    let venues = validate((((jsData || {})._embedded || {}).venues || {})[0]);
    if (venues != "") {
        let address = validate((venues.address || {}).line1);
        let cityName = validate((venues.city || {}).name);
        let code = validate((venues.state || {}).name);
        let city;
        if (cityName == "") city = code;
        if (code == "") city = cityName;
        else city = cityName + ","+ code;
        let phoneNumber = validate((venues.boxOfficeInfo || {}).phoneNumberDetail);
        let openHours = validate((venues.boxOfficeInfo || {}).openHoursDetail);
        let generalRule = validate((venues.generalInfo || {}).generalRule);
        let childRule = validate((venues.generalInfo || {}).childRule);
        let lat = validate((venues.location || {}).latitude);
        let lng = validate((venues.location || {}).longitude);
        temp = new Venue(address, city, phoneNumber, openHours, generalRule, childRule, lat, lng, venueName);
    }
    return temp;
}

router.get('/:venueName', async (req, res) => {
   let venueName = req.params.venueName; 
   let url = "https://app.ticketmaster.com/discovery/v2/venues?apikey="+key+"&keyword="+venueName;
    data = await myRequest(url);
    stripedData = handleData(data,venueName);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(stripedData);
  })
  
  module.exports = router;



