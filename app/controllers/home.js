var express = require('express'),
  router = express.Router(),
  models = require('../models'),
  Article = models.Article;
  Ticker = models.Ticker;

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

router.post('/create-tickers', function(req, res, next) {
  Ticker.run().then(function(tickers) {
    console.log('POST route for Tickers');
    console.log('REQUEST: ' + req);
  })
});
