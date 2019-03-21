let geohash = require('ngeohash');
let express = require('express');
let router = express.Router();
let request = require('request');
var key = "8DTcNJAYdaDVfkqSq8m5QVBCnnIUK077";
var eventData;
var geoPoint;
var objects  = require('./object');
var EventObj = objects.EventObj;

var utils = require('./util');
var validate = utils.validate;
function myRequest(url) {
    return new Promise ((resolve, reject) => {
        request.get((url), (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    })
}


function handleEventData(rawData) {
    let jsData = JSON.parse(rawData);
    let temp  = [];
    let events = validate(((jsData || {})._embedded || {}).events);
    if (events != "") {
        events.forEach(element => {
            let segment = (((element.classifications || {})[0] || {}).segment  || {}).name;
            let genre = (((element.classifications || {})[0] || {}).genre || {}).name;
            segment = validate(segment);
            genre = validate(genre);
            let cate;
            if (segment == "") cate = genre;
            else if (genre == "") cate =segmengt;
            else cate = segment + "-"+genre;
            let date = validate(((element.dates || {}).start || {}).localDate);
            let name = validate(element.name);
            let venue = validate((((element._embedded || {}).venues || {})[0] || {}).name);
            let id = validate(element.id);
            let fav = {date: date, eventName: name, category: cate, venueInfo: venue, id: id};
            fav = JSON.stringify(fav);
            obj = new EventObj(date, name ,cate, venue, id, fav);
            temp.push(obj);
        });
    }
    return temp; 
}


router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 


router.get('/', async (req, res) => {
    let obj = req.query;
    let keyword = obj.keyword;
    let category = obj.category;
    let segmentId;
    if (category == 'music') {
        segmentId = 'KZFzniwnSyZfZ7v7nJ';          
    }
    else if (category == 'sports') {
        segmentId = 'KZFzniwnSyZfZ7v7nE';        
    }
    else if (category == 'arts') {
        segmentId = 'KZFzniwnSyZfZ7v7na';       
    }
    else if (category == 'film') {
        segmentId = 'KZFzniwnSyZfZ7v7nn';     
    }
     else if (category == 'miscellaneous') {
        segmentId = 'KZFzniwnSyZfZ7v7n1';   
    } 
    else {
        segmentId = "";
    }
  
    let radius = obj.radius;
    if (radius == null || radius == "") radius = 10;
    if (radius > 19999) radius = 19999;
    let unit  = obj.unit;
    if (unit = "Miles") unit = "miles";
    else unit = "km";
    let lat = obj.lat;
    let lng = obj.lng;
    geoPoint = geohash.encode(lat, lng);
    let url2 = "https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&apikey="+key+"&keyword="+keyword+"&segmentId="+segmentId+
    "&radius="+radius+"&unit="+unit+"&geoPoint="+geoPoint;
    eventData = await myRequest(url2);
    eventData = handleEventData(eventData);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(eventData);
  })
  module.exports = router;