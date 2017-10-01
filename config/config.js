var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cmiis-crypto-app'
    },
    port: process.env.PORT || 3000,
    db: {db: 'cmiis-crypto-app_development'}
  },

  test: {
    root: rootPath,
    app: {
      name: 'cmiis-crypto-app'
    },
    port: process.env.PORT || 3000,
    db: {db: 'cmiis-crypto-app_test'}
  },

  production: {
    root: rootPath,
    app: {
      name: 'cmiis-crypto-app'
    },
    port: process.env.PORT || 3000,
    db: {db: 'cmiis-crypto-app_production'}
  }
};

module.exports = config[env];
