var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 4);

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app)
app.listen(8001, function() {
  console.log("listening on port 8001");
})