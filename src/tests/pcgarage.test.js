require('dotenv').config();

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('@bengo923/puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const PcGarage = require('../extractors/pcgarage');

const options = {
  headless: process.env.HEADLESS === 'true',
  slowMo: process.env.SLOWMO || 0,
  args: ['--no-sandbox --disable-setuid-sandbox']
};

const URL = 'https://www.pcgarage.ro/cauta';

describe('Tests PcGarage Extractor', () => {
  beforeEach(() => {
    jest.setTimeout(120000);
  });

  test('it tests if the API extracts the name from the site', async (done) => {
    const search = 'rtx 2060 super';

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.goto(`${URL}/${search}`);

    console.log(`${URL}/${search}`);

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);

    console.log(bodyHTML);

    const name = await page.$eval(
      '#listing-right > div.grid-products.clearfix.product-list-container > div:nth-child(1) > div > div.pb-specs-container > div.pb-name > a',
      (element) => element.getAttribute('title')
    );

    console.log(name);

    const PcGarageResponse = await PcGarage.request(search);

    expect(PcGarageResponse.products[0].name).toBe(name);

    await browser.close();
    done();
  }, 120000);
});
