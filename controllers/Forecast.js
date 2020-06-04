const AWS = require('aws-sdk');

AWS.config.loadFromPath(`${__dirname}/../config.json`);

const Forecast = new AWS.ForecastService();

module.exports = Forecast;
