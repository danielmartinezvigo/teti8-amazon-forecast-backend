/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  JSON.stringify(req.body),
  tokens['response-time'](req, res),
  'ms',
].join(' ')));

// routes
fs.readdirSync(`${__dirname}/routes/`).forEach((file) => {
  const routeName = file.split('.')[0];
  const route = `./routes/${file}`;
  app.use(`/${routeName}`, require(route));
});

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log('Listening on port:', PORT);
});
