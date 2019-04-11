var express = require('express');
var router = express.Router();
var AirTable = require('airtable')
require('dotenv').config()

var API_KEY = process.env.AIRTABLE_KEY
var Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: API_KEY
});
var base = Airtable.base(process.env.AIRTABLE_BASE);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api', function (req, res, next) {

  var weatherRecords = []
  base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 1200,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    weatherRecords = weatherRecords.concat(records)

    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; }
    res.json({ records: weatherRecords })
  });
})

module.exports = router;
