var getKegs = require('./kegs/keg-methods').getKegs;
var getBeerById = require('./beers/beer-methods').getBeerById;
var getAllBeers = require('./beers/beer-methods').getAllBeers;
var getBeerStyleById = require('./beerStyles/beer-style-methods').getBeerStyleById;
var getBeerStyles = require('./beerStyles/beer-style-methods').getBeerStyles;
var getBreweries = require('./breweries/brewery-methods').getBreweries;
var insertBreweries = require('./breweries/brewery-methods').insertBreweries;
var deleteBrewery = require('./breweries/brewery-methods').deleteBrewery;
var updateBrewery = require('./breweries/brewery-methods').updateBrewery;

var appRouter = function (app) {
  app.all('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });

  app.get("/kegs", function (request, response) {
    getKegs().then(function (result) {
      response.send(JSON.stringify(result));
    });
  });

  app.get("/beers", function (request, response) {
    getAllBeers().then(function (result) {
      response.send(JSON.stringify(result));
    });
  });

  app.get("/beers/:beerId", function (request, response) {
    getBeerById(request.params.beerId).then(function (result) {
      response.send(JSON.stringify(result));
    });
  });

  app.get("/beerStyles", function (request, response) {
    getBeerStyles().then(function (result) {
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

  app.post("/breweries", function (request, response) {
    insertBreweries(request.body)
      .then(function (result) {
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  app.put("/breweries/:breweryId", function (request, response) {
    updateBrewery(request.params.breweryId, request.body.name)
      .then(function (result) {
        console.log(result);
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });


  app.delete("/breweries/:breweryId", function (request, response) {
    deleteBrewery(request.params.breweryId)
      .then(function (result) {
        console.log(result);
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });

};

module.exports = appRouter;