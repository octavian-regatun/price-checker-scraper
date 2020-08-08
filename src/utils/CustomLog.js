const chalk = require('chalk');
const moment = require('moment');

class CustomLog {
  static LOGS = {
    infos: [],
    warns: [],
    errors: [],
    successful: [],
    unsuccessful: []
  };

  static info(message, shouldAddToLogs = true, shouldLog = true) {
    const log = `(INFO - ${moment().format(
      'HH:mm:ss:SSS'
    )}) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.blueBright(log));
    }

    if (shouldAddToLogs) {
      this.LOGS.infos.push(log);
    }

    return log;
  }

  static warn(message, shouldAddToLogs = true, shouldLog = true) {
    const log = `(WARNING - ${moment().format(
      'HH:mm:ss:SSS'
    )}) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.yellow(log));
    }

    if (shouldAddToLogs) {
      this.LOGS.warns.push(log);
    }

    return log;
  }

  static error(message, shouldAddToLogs = true, shouldLog = true) {
    const log = `(ERROR - ${moment().format(
      'HH:mm:ss:SSS'
    )}) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.red(log));
    }

    if (shouldAddToLogs) {
      this.LOGS.errors.push(log);
    }

    return log;
  }

  static successful(message, shouldAddToLogs = true, shouldLog = true) {
    const log = `(SUCCESSFUL - ${moment().format(
      'HH:mm:ss:SSS'
    )}) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.greenBright(log));
    }

    if (shouldAddToLogs) {
      this.LOGS.successful.push(log);
    }

    return log;
  }

  static unsuccessful(message, shouldAddToLogs = true, shouldLog = true) {
    const log = `(UNSUCCESSFUL - ${moment().format(
      'HH:mm:ss:SSS'
    )}) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.rgb(200, 0, 0)(log));
    }

    if (shouldAddToLogs) {
      this.LOGS.unsuccessful.push(log);
    }

    return log;
  }

  static clearLogs() {
    this.LOGS = {
      infos: [],
      warns: [],
      errors: [],
      successful: [],
      unsuccessful: []
    };
  }
}

module.exports = CustomLog;
