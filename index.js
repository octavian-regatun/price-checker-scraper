require('dotenv').config();

require('./src/utils/connect');

let Scraper = require('./src/Scraper');

const provider = process.env.PROVIDER.toLowerCase();

const search = process.env.SEARCH;

if (provider === undefined) {
  console.log('Please specify a PROVIDER in .env file');
}

const action = process.env.ACTION;

switch (action) {
  case 'addFirstPage':
    Scraper.addFirstPage(search);

    break;
  case 'addAllPages':
    Scraper.addAllPages(search);
    break;
  default:
    console.log('Please specify a ACTION in .env file');
}
