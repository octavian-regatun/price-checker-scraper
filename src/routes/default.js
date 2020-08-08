module.exports = (app) => {
  app.post('/', (req, res) => {
    const CONFIGS = req.body;
    const CustomLog = require('../utils/CustomLog');

    (async () => {
      const Scraper = require('../scraper');
      const { ACTIONS, IS_CONFIG_VALID } = require('../config');
      const delay = require('delay');

      require('../utils/validateConfig')(CONFIGS, res);

      if (IS_CONFIG_VALID) {
        for (const [index, config] of CONFIGS.entries()) {
          CustomLog.info(
            `Scraper is doing config ${index + 1}/${CONFIGS.length}`
          );

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
    })().then(() => {
      CustomLog.successful('Scraper ran the configs!');
      res.send(CustomLog.LOGS);
      CustomLog.clearLogs();
    });
  });
};
