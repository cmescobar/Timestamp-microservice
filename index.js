// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var utils = require('./utils')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/:date", function (req, res) {
  // Get the input date
  const dateRaw = req.params.date;
  let dateUnix;
  let dateUTC;

  if (utils.isDateStringValid(dateRaw)){
    //  Transform into utc format
    date = new Date(dateRaw);

    // In this case, we need to get both of them
    dateUnix = date.getTime();
    dateUTC = date.toUTCString();
  } 
  else if (utils.isDateUnixValid(dateRaw)) {
    dateUnix = parseInt(dateRaw);

    //  Transform into utc format
    date = new Date(dateUnix);

    // In this case, we need to get both of them
    dateUTC = date.toUTCString();
  }
  else {
    res.json({'error': 'Invalid Date'});
    return;
  }

  // Output object
  let output = {unix: dateUnix, utc: dateUTC}

  res.json(output);
});


app.get("/api", function (req, res) {
  // Get the input date
  const date = new Date();
  
  let dateUnix = date.getTime();
  let dateUTC = date.toUTCString();

  // Output object
  let output = {unix: dateUnix, utc: dateUTC}

  res.json(output);
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
