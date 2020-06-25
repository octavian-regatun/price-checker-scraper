const fs = require('fs');

const cheerio = require('cheerio');
const fetch = require('node-fetch');

class PcGarage {
  static URL = 'https://www.pcgarage.ro/cauta';

  static findCheapestProduct = (products) => {
    let cheapestPrice = Number.MAX_SAFE_INTEGER;
    let cheapestProduct;

    for (const product of products) {
      if (product.price < cheapestPrice) {
        cheapestProduct = {
          name: product.name,
          price: product.price,
          imgSrc: product.imgSrc
        };

        cheapestPrice = product.price;
      }
    }
    return cheapestProduct;
  };

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
      $ = await fetch(`${this.URL}/${search}`, { method: 'GET' })
        .then((response) => response.text())
        .then((body) => {
          console.log(body);
          return cheerio.load(body);
        });
    } catch (error) {
      console.log(error);
    }

    const $products = $('.product-box-container').get();

    const response = { products: this.#getProductData($products) };

    response.cheapestProduct = this.findCheapestProduct(response.products);

    return response;
  }
}
module.exports = PcGarage;
