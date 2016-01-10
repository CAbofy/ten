/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path');
var bodyParser = require('body-parser');
var app = express();
var connect = require('connect');
var validator = require("email-validator");
var port = process.env.PORT || 3000;
validator.validate("test@email.com");
// all environments

app.use(connect.logger('dev'));
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(connect.urlencoded());
app.use(connect.json());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var static_pages = require('./control/Controller');

var sp = new static_pages();
sp.initPages(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
