let express = require('express');
let router = express.Router();
let request = require('request');

function Name(name) {
    this.name = name; 
}
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


function handleData(rawData) {
    let jsData = JSON.parse(rawData);
    let temp  = [];
    if (jsData != null && jsData._embedded != null && jsData._embedded.attractions != null) {
        jsData._embedded.attractions.forEach(element => {
            if (element.name != null)
            temp.push(new Name(element.name));
        });
    }
    return temp;
    
}

router.get('/:keyword', async (req, res) => {
    let url = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey=8DTcNJAYdaDVfkqSq8m5QVBCnnIUK077&keyword=' + req.params.keyword;
    data = await myRequest(url);
    stripedData = handleData(data);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(stripedData);
  })

  module.exports = router;



