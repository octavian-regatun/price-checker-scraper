module.exports = (CONFIGS, res) => {
  const store = require('store');

  store.set('isConfigValid', true);

  const CustomLog = require('./CustomLog');

  CustomLog.info('Config validation process started.');

  const API = require('price-checker-api');
  const chalk = require('chalk');

  const { ACTIONS, PROVIDERS } = require('../config');

  let provider;
  let action;
  let search;
  let category;

  for (const [index, CONFIG] of CONFIGS.entries()) {
    provider = CONFIG.provider;
    action = CONFIG.action;
    search = CONFIG.search;
    category = CONFIG.category;

    if (!isProviderValid(provider)) {
      CustomLog.error(
        `The provider of ${getOrdinal(index + 1)} config is invalid!`
      );
    }

    if (!isActionValid(action)) {
      CustomLog.error(
        `The action of ${getOrdinal(index + 1)} config is invalid!`
      );
    }

    if (action === ACTIONS.addByCategory) {
      if (!isCategoryValid(category)) {
        CustomLog.error(
          `The category of ${getOrdinal(index + 1)} config is invalid!`
        );
      }

      if (search !== undefined) {
        CustomLog.error(
          `At ${getOrdinal(
            index + 1
          )} config there shouln't be a ${chalk.bold.underline(
            'search'
          )} defined!`
        );
      }
    } else {
      if (category !== undefined) {
        CustomLog.error(
          `At ${getOrdinal(
            index + 1
          )} config there shouln't be a ${chalk.bold.underline(
            'category'
          )} defined!`
        );
      }

      if (search === undefined) {
        CustomLog.error(
          `At ${getOrdinal(index + 1)} config there ${chalk.bold.underline(
            'search'
          )} should be defined!`
        );
      }
    }
  }

  log();

  function getOrdinal(number) {
    switch (number) {
      case 1:
        return `${number}st`;

      case 2:
        return `${number}nd`;

      case 3:
        return `${number}rd`;

      default:
        return `${number}th`;
    }
  }

  function isActionValid(configAction) {
    if (configAction === undefined || typeof configAction === 'number') {
      return false;
    }

    for (const action of ACTIONS.array) {
      if (configAction === action) {
        return true;
      }
    }

    return false;
  }

  function isProviderValid(configProvider) {
    if (configProvider === undefined || typeof configProvider === 'number') {
      return false;
    }

    for (const provider of PROVIDERS.array) {
      if (configProvider === provider) {
        return true;
      }
    }

    return false;
  }

  function isCategoryValid(configCategory) {
    if (configCategory === undefined || typeof configCategory === 'number') {
      return false;
    }

    for (const bigCategory in API.PcGarage.CATEGORIES) {
      for (const category in API.PcGarage.CATEGORIES[bigCategory]) {
        if (configCategory === API.PcGarage.CATEGORIES[bigCategory][category]) {
          return true;
        }
      }
    }

    return false;
  }

  function logVerdict() {
    if (
      CustomLog.LOGS.warns.length === 0 &&
      CustomLog.LOGS.errors.length === 0
    ) {
      CustomLog.successful(
        'Config validation process ended. The config is VALID!'
      );
    } else {
      CustomLog.unsuccessful(
        `Config validation process ended. The config is INVALID, ${CustomLog.LOGS.warns.length} warnings & ${CustomLog.LOGS.errors.length} errors!`
      );
    }
  }

  function log() {
    logVerdict();

    if (CustomLog.LOGS.errors.length > 0 || CustomLog.LOGS.warns.length > 0) {
      res.send(CustomLog.LOGS);
      store.set('isConfigValid', false);
    }
  }
};
