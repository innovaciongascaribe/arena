const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const Bull = require('bull');

module.exports = function (config) {
  const hbs = exphbs.create({
    defaultLayout: `${__dirname}/views/layout`,
    handlebars,
    partialsDir: `${__dirname}/views/partials/`,
    extname: 'hbs',
  });

  const app = express();

  const defaultConfig = require('./config/index.json');
  const Queues = require('./queue');
  const Flows = require('./flow');

  const arenaConfig = {Bull, ...defaultConfig, ...config};
  const queues = new Queues(arenaConfig);
  const flows = new Flows(arenaConfig);
  require('./views/helpers/handlebars')(handlebars, {queues});
  app.locals.Queues = queues;
  app.locals.Flows = flows;
  app.locals.appBasePath = '';
  app.locals.vendorPath = '/vendor';
  app.locals.customCssPath = arenaConfig.customCssPath;
  app.locals.customJsPath = arenaConfig.customJsPath;

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'hbs');
  app.set('json spaces', 2);

  app.engine('hbs', hbs.engine);

  app.use(bodyParser.json());

  return {
    app,
    Queues: app.locals.Queues,
  };
};
