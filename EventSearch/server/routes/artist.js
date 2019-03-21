let express = require('express');
let router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: '2b8c53fc459f476fa23097b19a85132d',
  clientSecret: '90d0718d15bf4e5cb5d960e0aca672bc',
  redirectUri: 'http://www.example.com/callback'
});
var objects  = require('./object');
var Artist = objects.Artist;
var data;
var stripedData;
var utils = require('./util');
var validate = utils.validate;
function setToken() {
    return new Promise((resole, reject)=>{spotifyApi.clientCredentialsGrant().then(
        function(data) {
        resole(data.body);
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          reject(err);
        }
      )}); 
}
function myRequest(name) {
    return new Promise ((resolve, reject) => {
        spotifyApi.searchArtists(name)
  .then(function(data) {
    resolve(data.body);
  }, function(err) {
    reject(err);
  });
    })
}
function handleData(rawData, searchName) {
    let jsData = rawData;
    let temp = null;
    let items = validate(((jsData || {}).artists || {}).items);
    let name = ""; 
    let followers = "";
    let popularity = 0;
    let checkAt = "";
    if (items != "") {
        items.forEach(element => {
           if (validate(element.name).toLowerCase() == searchName) {
            name = validate(element.name);
            followers = validate((element.followers || {}).total);
            popularity = validate(element.popularity);
            checkAt = validate((element.external_urls || {}).spotify);
            temp = new Artist(name, followers, popularity, checkAt);
           }
        });
    }
    return temp;
    
}

router.get('/:name', async (req, res) => {
    let name = req.params.name;
    await setToken();
    data = await myRequest(name);
    name = name.toLowerCase();
    stripedData =  handleData(data, name);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(stripedData);
  })
  module.exports = router;



