const AWS = require('aws-sdk');

AWS.config.loadFromPath(`${__dirname}/../config.json`);

const ForecastQuery = new AWS.ForecastQueryService();

module.exports = ForecastQuery;
