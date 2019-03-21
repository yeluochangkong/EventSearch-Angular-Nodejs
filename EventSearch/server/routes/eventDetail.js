let express = require('express');
let router = express.Router();
let request = require('request');
var key = "8DTcNJAYdaDVfkqSq8m5QVBCnnIUK077";

var objects  = require('./object');
var EventDetail = objects.EventDetail;
var utils = require('./util');
var validate = utils.validate;
var data;
var stripedData;
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

function concatenate (str) {
    if (str == undefined || str == "" || str == null) return "";
    else return str+"|";
}
function handleData(rawData, eventId) {
    let jsData = JSON.parse(rawData);
    let temp;
    if (jsData != null) {
        let attractions =  validate((jsData._embedded || {}).attractions);
        let artist = "";
        if (attractions != "") {
            attractions.forEach(element => {
                artist += concatenate(element.name);
            });
            if (artist != "")
            artist = artist.substring(0, artist.length - 1);
        }
        let venue = (((jsData._embedded || {}).venues || {})[0] || {}).name;
        let time = validate(((jsData.dates || {}).start || {}).localDate) + " "+validate(((jsData.dates || {}).start || {}).localTime);
        let category = concatenate((((jsData.classifications || {})[0] || {}).genre || {}).name) + concatenate((((jsData.classifications || {})[0] || {}).segment || {}).name);
        if (category != "") category = category.substring(0, category.length - 1);
        let min = validate(((jsData.priceRanges || {})[0] || {}).min);
        let max = validate(((jsData.priceRanges || {})[0] || {}).max); 
        let ticketStatus = validate(((jsData.dates || {}).status || {}).code);
        let buyTicketAt = validate(jsData.url);
        let seatMap = validate((jsData.seatmap || {}).staticUrl);
        temp = new EventDetail(artist, venue, time, category, min, max, ticketStatus, buyTicketAt, seatMap, eventId);
    }
    return temp;
}

router.get('/:eventId', async (req, res) => {
   let eventId = req.params.eventId; 
   let url = "https://app.ticketmaster.com/discovery/v2/events/"+eventId+"?apikey="+key;
    data = await myRequest(url);
    stripedData = handleData(data, eventId);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(stripedData);
  })

  module.exports = router;



