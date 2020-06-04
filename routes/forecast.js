const router = require('express').Router();

const Forecast = require('../controllers/Forecast');
const ForecastQuery = require('../controllers/ForecastQuery');

router.get('/service/datasets', (req, res) => {
  Forecast.listDatasets({}, (err, data) => {
    if (err) {
      return res.status(500).send(err && err.message ? { error: err.message } : err);
    }
    if (data) {
      return res.status(200).send(data);
    }
    return res.sendStatus(500);
  });
});

router.get('/service/datasetgroups', (req, res) => {
  Forecast.listDatasetGroups({}, (err, data) => {
    if (err) {
      return res.status(500).send(err && err.message ? { error: err.message } : err);
    }
    if (data) {
      return res.status(200).send(data);
    }
    return res.sendStatus(500);
  });
});

router.get('/service/forecasts', (req, res) => {
  Forecast.listForecasts({}, (err, data) => {
    if (err) {
      return res.status(500).send(err && err.message ? { error: err.message } : err);
    }
    if (data) {
      return res.status(200).send(data);
    }
    return res.sendStatus(500);
  });
});

router.get('/service/predictors', (req, res) => {
  Forecast.listPredictors({}, (err, data) => {
    if (err) {
      return res.status(500).send(err && err.message ? { error: err.message } : err);
    }
    if (data) {
      return res.status(200).send(data);
    }
    return res.sendStatus(500);
  });
});

router.post('/query', (req, res) => {
  const params = {
    Filters: {},
    ForecastArn: req.body.ForecastArn,
    StartDate: req.body.StartDate,
    EndDate: req.body.EndDate,
  };
  params.Filters[req.body.AttributeName] = req.body.AttributeValue;
  ForecastQuery.queryForecast(params, (err, data) => {
    if (err) {
      return res.status(500).send(err && err.message ? { error: err.message } : err);
    }
    if (data) {
      return res.status(200).send(data);
    }
    return res.sendStatus(400);
  });
});

module.exports = router;
