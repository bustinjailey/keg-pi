var getKegs = require('./kegs/kegs').getKegs;

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
};

module.exports = appRouter;