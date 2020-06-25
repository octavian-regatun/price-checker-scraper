require('dotenv').config();

const delay = require('delay');

const cheerio = require('cheerio');
const fetch = require('node-fetch');

const PcGarage = require('../extractors/pcgarage');

const { URL } = PcGarage;

describe('PcGarage extractor tests', () => {
  test('it tests if the API extracts the name from the site', async () => {
    const search = 'calculator';

    let $;
    try {
      $ = await fetch(`${URL}/${search}`, { method: 'GET' })
        .then((response) => response.text())
        .then((body) => cheerio.load(body));
    } catch (error) {
      console.log(error);
    }

    const firstProductName = $(
      '#listing-right > div.grid-products.clearfix.product-list-container > div:nth-child(1) > div > div.pb-specs-container > div.pb-name > a'
    ).attr('title');

    await delay(30000);

    const PcGarageResponse = await PcGarage.request(search);

    expect(PcGarageResponse.products[0].name).toBe(firstProductName);
  }, 120000);
});
