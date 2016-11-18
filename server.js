var express = require("express"),
    app = module.exports = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    config = require("./config");


// public files
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Accept', 'application/json;charset=UTF-8');
    res.header('Accept-Charset', 'UTF-8');
    next();
});

// application routes
app.use(require("./routes"));

// database connection
mongoose.connect(config.mongodb.url);
var db = mongoose.connection;
db.on('error', function () {
    console.log("Error connecting to database");
});
db.once('open', function () {
    console.log("Connected to database");
});


app.listen(config.server.port, function () {
    console.log("App is listening on port " + config.server.port);
});
