const CustomLog = require('../utils/CustomLog');
const store = require('store');
const Scraper = require('../scraper');
const { ACTIONS } = require('../config');
const delay = require('delay');

module.exports = (app) => {
  app.post('/', async (req, res) => {
    CustomLog.clearLogs();

    const CONFIGS = req.body;

    require('../utils/validateConfig')(CONFIGS, res);

    await runScraper(CONFIGS).then(() => {
      scraperRanSuccessfully(res);
    });
  });
};

async function runScraper(CONFIGS) {
  if (isConfigValid()) {
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
  }
}

function scraperRanSuccessfully(res) {
  if (isConfigValid()) {
    CustomLog.successful('Scraper ran the configs!');
    res.send(CustomLog.LOGS);
  }
}

function isConfigValid() {
  return store.get('isConfigValid');
}
