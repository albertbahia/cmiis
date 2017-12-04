var thinky = require('../../config/thinky'),
   r = thinky.r,
   type = thinky.type;

var Ticker = thinky.createModel('Ticker', {
   name: String,
   symbol: String,
   rank: String,
   price_usd: String,
   price_btc: String,
   twenty_four_hour_volumn_usd: String,
   market_cap_usd: String,
   available_supply: String,
   total_supply: String,
   max_supply: String,
   percent_chang_1h: String,
   percent_change_24h: String,
   percent_change_7d: String
});

Ticker.define("getTickers", function() {
   return fetch('https://api.coinmarketcap.com/v1/ticker/')
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
            number,
            data;

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
         // Calculate Percentage (of your available disposable income) to Buy of the Top 10 Coins
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
         // ---------------------------------------------------------------

         //   console.log("headers: " + headers);
         //   console.log("tickers: " + tickers);

            data = {
               headers: headers,
               tickers: tickers
            }
            
         return data;
      });
});

module.exports = Ticker;