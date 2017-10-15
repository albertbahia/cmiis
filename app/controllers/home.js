var express = require('express'),
  router = express.Router(),
  models = require('../models'),
  Article = models.Article;
  Ticker = models.Ticker,
  fetch = require('node-fetch');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.run().then(function (articles) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

// ---------------------------------------------------------------
// Route for GETting the Ticker data from the Coinmarketcap API.
// Phase 1: Manually make API Call with this route to get the ticker data.
// Phase 2: Modify this route so that it automatically makes the request on intervals 
// ---------------------------------------------------------------
router.get('/get-tickers', function(req, res, next) {
      

			// ------------------------
      // Render in index template
      // ------------------------
      res.render('index', {
        tableHeaders: headers,
        tickers: tickers
      });
      // ------------------------

    });
});
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Route for POSTing (saving) the Ticker data to the database
router.post('/create-tickers', function(req, res, next) {
  Ticker.run().then(function(tickers) {
    console.log('POST route for Tickers');
    console.log('REQUEST: ' + req);
  })
});
// ---------------------------------------------------------------
