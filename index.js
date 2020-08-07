require('dotenv').config();
require('./src/utils/connect');

const express = require('express');

const app = express();

const getDefault = (req, res) => {
  const CONFIGS = req.body;
  const CustomLog = require('./src/utils/CustomLog');

  (async () => {
    const Scraper = require('./src/scraper');
    const { ACTIONS } = require('./src/config');
    const delay = require('delay');

    require('./src/utils/validateConfig')(CONFIGS, res);

    for (const [index, config] of CONFIGS.entries()) {
      CustomLog.info(`Scraper is doing config ${index + 1}/${CONFIGS.length}`);

      const provider = config.provider;
      const action = config.action;
      const search = config.search;
      const category = config.category;

      if (action === ACTIONS.addByCategory) {
        await Scraper[action](category, provider);
      } else {
        await Scraper[action](search, provider);
      }

      await delay(2000);
    }
  })().then(() => {
    CustomLog.successful('Scraper ran the configs!');
    res.send(CustomLog.LOGS);
    CustomLog.clearLogs();
  });
};

app.use(getDefault);

exports.main = app;
