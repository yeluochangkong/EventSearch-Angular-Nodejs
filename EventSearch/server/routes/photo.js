let express = require('express');
let router = express.Router();
let request = require('request');
var googleKey = "AIzaSyDWMoJgRc5rdVH4Ld3J3_SEKL0WpYYN-P0";
var searchEngineId = "007387419562094239363:k14kj2skemk";
function Photo(link) {
    this.link = link; 
}
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

function handleData(rawData) {
    let jsData = JSON.parse(rawData);
    let temp =  new Array();
    let items =  validate(jsData.items);
    if (items != "") {
        items.forEach(element => {
            let link = element.link;
            temp.push(new Photo(link));
        });
    }
    return temp;
}
router.get('/:expresion', async (req, res) => {
   let expresion = req.params.expresion; 
   let url = " https://www.googleapis.com/customsearch/v1?key="+googleKey+"&imgSize=huge&imgType=news&num=8&searchType=image&cx="+searchEngineId+
   "&q="+expresion;
    data = await myRequest(url);
    stripedData = handleData(data);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(stripedData);
  })

  module.exports = router;








