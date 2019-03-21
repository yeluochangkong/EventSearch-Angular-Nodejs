const express = require('express');
const app = express();
const port = process.env.Port || 8081;
let auto = require('./routes/auto');
let inputLocationEvent = require('./routes/inputLocationEvent');
let currentLocationEvent = require('./routes/currentLocationEvent');
let eventDetail = require('./routes/eventDetail');
let artist = require('./routes/artist');
let photo = require('./routes/photo');
let venue = require('./routes/venue'); 
let upComing = require('./routes/upComingEvent');
const bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

app.use(cors());
app.use(express.static("./event-search"));
app.get('/',(req, res)=>{
  res.sendFile("./event-search/index.html",{root:_dirname});
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/auto', auto);
app.use('/event/inputLocationEvent', inputLocationEvent);
app.use('/event/currentLocationEvent', currentLocationEvent);
app.use('/eventDetail', eventDetail);
app.use('/artist', artist);
app.use('/photo', photo);
app.use('/venue', venue);
app.use('/up', upComing);

app.get('/', (request, response) => {
  response.send('Hello from Express!')
});

app.listen(8081, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});