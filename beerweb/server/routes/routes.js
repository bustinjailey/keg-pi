var getKegs = require('./kegs/keg-methods').getKegs;
var getBeerById = require('./beers/beer-methods').getBeerById;
var getBeerStyleById = require('./beerStyles/beer-style-methods').getBeerStyleById;
var getBreweries = require('./breweries/brewery-methods').getBreweries;

var appRouter = function (app) {
  app.all('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  
  app.get("/kegs", function (request, response) {
    getKegs().then(function (result) {
      response.send(JSON.stringify(result));
    });
  });

  app.get("/beers/:beerId", function (request, response) {
    getBeerById(request.params.beerId).then(function (result) {
      response.send(JSON.stringify(result));
    });
  });

  app.get("/beerStyles/:beerStyleId", function (request, response) {
    getBeerStyleById(request.params.beerStyleId).then(function (result) {
      response.send(JSON.stringify(result));
    });
  });

  app.get("/breweries", function (request, response) {
    getBreweries().then(function (result) {
      response.send(JSON.stringify(result));
    });
  });
};

module.exports = appRouter;