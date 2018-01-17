var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/date/:dateValues', function(req, res, next) {
    var dateValue = req.params.dateValues;
    var date_YMD = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    if (isNaN(dateValue)) {
        var naturalDate = new Date(dateValue);
        naturalDate = naturalDate.toLocaleDateString("en-us", date_YMD);
        var unixDate = new Date(dateValue).getTime() / 1000;
    } else {
        var unixDate = dateValue;
        var naturalDate = new Date(dateValue * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", date_YMD);
    }
    res.json({ unix: unixDate, natural: naturalDate });
});

app.listen(3000, function() {
    console.log("App is Working");
})
