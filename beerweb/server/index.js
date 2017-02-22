var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3001, function () {
  console.log("Listening on port %s...", server.address().port);
  
  app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }});

});
