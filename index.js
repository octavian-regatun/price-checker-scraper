require('dotenv').config();
require('./src/utils/connect');

const CONFIGS = require('./src/utils/validateConfig');

const Scraper = require('./src/scraper');
const CustomLog = require('./src/utils/warning');
const { ACTIONS } = require('./src/config');
const delay = require('delay');

(async () => {
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
})();
