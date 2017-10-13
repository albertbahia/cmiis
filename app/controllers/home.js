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
  fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then(function(res) {
      return res.json()
    }).then(function(json) {

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    
      var millionthMktCaps = [],
        tickers = [],
        headers = Object.keys(json[0]),
        additionalHeaders = ['Millionth USD', 'Millionth of Coins','% To Buy (Top 10)'];
		  var totalTopTenUSD = 0,
					totalTopTwentyUSD = 0;
			
			var currency,
					number;

      additionalHeaders.forEach(function(el) {
        headers.push(el);
      });

      // ---------------------------------------------------------------
      // Calculation Millionth of Supply from CoinMarketCap API Response
      // ---------------------------------------------------------------
      json.forEach(function(el) {
        
        el.millionthMktCapUSD = "$" + String(numberWithCommas((el.market_cap_usd * Math.pow(10, -6)).toFixed(2)));

        el.millionthCoins = (el.available_supply * Math.pow(10, -6)).toFixed(1);

        tickers.push(el);
      });
      // ---------------------------------------------------------------

			// ---------------------------------------------------------------
			// Calculate Percentage to Buy of the Top 10 Coins
 			// ---------------------------------------------------------------
			for (let i = 0; i < 10; i++) {
				currency = tickers[i].millionthMktCapUSD;
				number = Number(currency.replace(/[^0-9\.-]+/g,""));
								
				tickers[i].topTenBuyUSD = number; // Set up the numerator for division
				totalTopTenUSD += tickers[i].topTenBuyUSD; // Add the top 10 coins millionth market cap in USD

			}

			for (let j = 0; j < 10; j++ ) {
				tickers[j].topTenBuyPerc = ((tickers[j].topTenBuyUSD / totalTopTenUSD) * 100).toFixed(2) + "%";
			}

			console.log(tickers[2]);
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
