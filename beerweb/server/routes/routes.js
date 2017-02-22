var getKegs = require('./kegs/keg-methods').getKegs;
var insertKegs = require('./kegs/keg-methods').insertKegs;
var updateKeg = require('./kegs/keg-methods').updateKeg;
var deleteKeg = require('./kegs/keg-methods').deleteKeg;
var createNewKeg = require('./kegs/keg-methods').createNewKeg;
var getBeerById = require('./beers/beer-methods').getBeerById;
var getAllBeers = require('./beers/beer-methods').getAllBeers;
var insertBeers = require('./beers/beer-methods').insertBeers;
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

  registerGetMethods(app);
  registerPostMethods(app);
  registerPutMethods(app);
  registerDeleteMethods(app);
};

function registerPostMethods(app) {
  app.post("/breweries", function (request, response) {
    insertBreweries(request.body)
      .then(function (result) {
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  app.post("/kegs", function (request, response) {
    insertKegs(request.body)
      .then(function (result) {
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  app.post("/beers", function (request, response) {
    insertBeers(request.body)
      .then(function (result) {
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  app.post("/keg", function (request, response) {
    createNewKeg(request.body)
      .then(function (result) {
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

function registerPutMethods(app) {
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

  app.put("/kegs/:kegId", function (request, response) {
    updateKeg(request.params.kegId, request.body.max_volume, request.body.beer_id, request.body.is_active)
      .then(function (result) {
        console.log(result);
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

function registerDeleteMethods(app) {
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

  app.delete("/kegs/:kegId", function (request, response) {
    deleteKeg(request.params.kegId)
      .then(function (result) {
        console.log(result);
        response.send(JSON.stringify(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

function registerGetMethods(app) {
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
}

module.exports = appRouter;