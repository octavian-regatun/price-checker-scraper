const cheerio = require('cheerio');
const axios = require('axios');

class PcGarage {
  static URL = 'https://www.pcgarage.ro/cauta';

  static findCheapestProduct = () => {};

  static #getProductData = ($products) => {
    const products = [];
    for (const $product of $products) {
      const $ = cheerio.load($product);

      const stock = $('.pb-price-container').children().eq(2).text();

      if (stock.trim() !== 'Nu este in stoc') {
        let price = $('.price').text();
        price = price.replace(' RON', '');
        price = price.replace('.', '');
        price = price.replace(',', '.');
        price = Number.parseFloat(price);

        const name = $('.pb-name').eq(0).children().eq(0).attr('title');

        // eslint-disable-next-line unicorn/prevent-abbreviations
        const imgSrc = $('img').eq(0).attr('src');

        products.push({ name, price, imgSrc });
      }
    }
    return products;
  };

  static async request(search) {
    let $;
    try {
      $ = await axios
        .get(`${this.URL}/${search}`)
        .then((response) => cheerio.load(response.data));
    } catch (error) {
      console.log(error);
      return;
    }

    const $products = $('.product-box-container').get();

    const response = { products: this.#getProductData($products) };

    let cheapestPrice = Number.MAX_SAFE_INTEGER;
    let cheapestProduct;

    for (const product of response.products) {
      if (product.price < cheapestPrice) {
        cheapestProduct = {
          name: product.name,
          price: product.price,
          imgSrc: product.imgSrc
        };

        cheapestPrice = product.price;
      }
    }

    response.cheapestProduct = cheapestProduct;

    return response;
  }
}
module.exports = PcGarage;
