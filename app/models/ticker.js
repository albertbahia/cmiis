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
   percent_chang_1h: String,
   percent_change_24h: String,
   percent_change_7d: String
});

module.exports = Ticker;