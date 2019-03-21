let express = require('express');
let router = express.Router();
let request = require('request');
var songKey = "X0xt5L1vmhROE9Az";
var id;
var upComingData;
var objects  = require('./object');
var UpComingEvent = objects.UpComingEvent;
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

function handleData(rawData) {
    let jsData = JSON.parse(rawData);
    let venue = (((((jsData || {}).resultsPage || {}).results || {}).venue || {})[0] || {}).id;
    return venue; 
}
function handleEventData(rawData) {
    let jsData = JSON.parse(rawData);
    let temp = new Array();
    let events = validate((((jsData || {}).resultsPage || {}).results || {}).event);
    if (events != "") {
        events.forEach(element => {
            let displayName = validate(element.displayName);
            let uri = validate(element.uri);
            let artist = validate(((element.performance || {})[0] || {}).displayName);
            let time = validate((element.start || {}).date) +" "+ validate((element.start || {}).time);
            let type = validate(element.type);
            temp.push(new UpComingEvent(displayName, uri, artist, time, type));
        });
    }
    return temp; 
}


router.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.get('/:venue', async (req, res) => {
    let venue = req.params.venue;
    let url = "https://api.songkick.com/api/3.0/search/venues.json?query="+venue+"&apikey="+songKey; 
    id = await myRequest(url);
    id = handleData(id);
    upComingData = new Array();
    let url2 = "https://api.songkick.com/api/3.0/venues/"+id+"/calendar.json?apikey="+songKey;
    let data = await myRequest(url2);
    upComingData = handleEventData(data);
    res.json(upComingData);
  })

  module.exports = router;