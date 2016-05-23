var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    morgan = require('morgan'),
    config = require('./config');

var app = express();
var env = process.env.NODE_ENV || 'development';

var port = config[env].port;
var db = mongoose.connect(config[env].db);

var Book = require('./models/bookModel');
var Music = require('./models/musicModel');

app.use(express.static(path.join(__dirname + '/client/public')));
app.use(express.static(path.join(__dirname + '/client/bower_components')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);
musicRouter = require('./Routes/musicRoutes')(Music);

app.use('/api/books', bookRouter);
app.use('/api/music', musicRouter);


var server = app.listen(port, function () {
    'use strict';
    console.log('Gulp Restart Server on PORT: ' + port);
});

module.exports = server;