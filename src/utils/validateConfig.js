const CustomLog = require('./warning');
CustomLog.info('Config validation process started.');

const fs = require('fs');
const API = require('price-checker-api');
const chalk = require('chalk');

const warns = [];
const errors = [];

const CONFIGS = getConfig();

const { AVAILABLE_ACTIONS, AVAILABLE_PROVIDERS } = require('../config');

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
    errors.push(
      CustomLog.error(
        `The provider of ${getOrdinal(index + 1)} config is invalid!`,
        false
      )
    );
  }

  if (!isActionValid(action)) {
    errors.push(
      CustomLog.error(
        `The action of ${getOrdinal(index + 1)} config is invalid!`,
        false
      )
    );
  }

  if (action === 'addByCategory') {
    if (!isCategoryValid(category)) {
      errors.push(
        CustomLog.error(
          `The category of ${getOrdinal(index + 1)} config is invalid!`,
          false
        )
      );
    }
  }
}

log();

function getConfig() {
  try {
    const CONFIGDATA = fs.readFileSync('configTest.json');
    return JSON.parse(CONFIGDATA);
  } catch {
    errors.push(
      CustomLog.error(
        'Config file was not found! Please add one with the name "config.json" in the root folder following the template in the documentation.',
        false
      )
    );

    log();
  }
}

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

  for (const action of AVAILABLE_ACTIONS) {
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

  for (const provider of AVAILABLE_PROVIDERS) {
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

function logWarns() {
  for (const warn of warns) {
    console.log(chalk.yellow(warn));
  }
}

function logErrors() {
  for (const error of errors) {
    console.log(chalk.red(error));
  }
}

function logVerdict() {
  if (warns.length === 0 && errors.length === 0) {
    CustomLog.succes('Config validation process ended. The config is VALID!');
  } else {
    CustomLog.unsuccessful(
      `Config validation process ended. The config is INVALID, ${warns.length} warnings & ${errors.length} errors!`
    );
  }
}

function log() {
  logVerdict();
  logWarns();
  logErrors();

  if (warns.length > 0 || errors.length > 0) {
    process.exit(1);
  }
}

module.exports = CONFIGS;
