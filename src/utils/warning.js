const chalk = require('chalk');

class CustomLog {
  static info(message, shouldLog = true) {
    const log = `(INFO) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.blueBright(log));
    }

    return log;
  }

  static warn(message, shouldLog = true) {
    const log = `(WARNING) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.yellow(log));
    }

    return log;
  }

  static error(message, shouldLog = true) {
    const log = `(ERROR) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.red(log));
    }

    return log;
  }

  static succes(message, shouldLog = true) {
    const log = `(SUCCES) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.greenBright(log));
    }

    return log;
  }

  static unsuccessful(message, shouldLog = true) {
    const log = `(UNSUCCESSFUL) price-checker-scraper: ${message}`;
    if (shouldLog) {
      console.log(chalk.rgb(200, 0, 0)(log));
    }

    return log;
  }
}

module.exports = CustomLog;
