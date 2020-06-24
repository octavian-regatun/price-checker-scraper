require('dotenv').config();

const puppeteer = require('puppeteer');

const PcGarage = require('../extractors/pcgarage');

const options = {
  headless: process.env.HEADLESS === 'true',
  slowMo: process.env.SLOWMO || 0,
  args: [
    '--no-sandbox --disable-setuid-sandbox - google-chrome-stable — headless — disable-gpu — remote-debugging-port=9222 http://localhost &'
  ]
};

const URL = 'https://www.pcgarage.ro/cauta';

describe('Tests PcGarage Extractor', () => {
  test('it tests if the API extracts the name from the site', async () => {
    const search = 'rtx 2060 super';

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 900 });
    await page.goto(`${URL}/${search}`);

    await page.waitForSelector(
      '#listing-right > div.grid-products.clearfix.product-list-container > div:nth-child(1) > div > div.pb-specs-container > div.pb-name > a'
    );

    const name = await page.$eval(
      '#listing-right > div.grid-products.clearfix.product-list-container > div:nth-child(1) > div > div.pb-specs-container > div.pb-name > a',
      (element) => element.getAttribute('title')
    );

    const PcGarageResponse = await PcGarage.request(search);

    expect(PcGarageResponse.products[0].name).toBe(name);

    await browser.close();
  }, 30000);
});
