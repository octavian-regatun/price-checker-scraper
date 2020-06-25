const fs = require('fs');

const cheerio = require('cheerio');
const fetch = require('node-fetch');

class Emag {
  static URL = 'https://www.emag.ro/search';

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

      const stock = $(
        '.product-stock-status.text-availability-out_of_stock'
      ).text();

      if (stock.trim() !== 'stoc epuizat') {
        let price = $('product-new-price').text();
        price = Number.parseFloat(price);

        const name = $('.product-title js-product-url').attr('title');

        // eslint-disable-next-line unicorn/prevent-abbreviations
        const imgSrc = $('img').eq(0).attr('src');

        products.push({ name, price, imgSrc });
      }
      products.push(stock);
    }
    return products;
  };

  static async request(search) {
    let $;
    try {
      $ = await fetch(`${this.URL}/${search}`, { method: 'GET' })
        .then((response) => response.text())
        .then((body) => cheerio.load(body));
    } catch (error) {
      console.log(error);
    }

    const $products = $('.card-item.js-product-data').get();

    const response = { products: this.#getProductData($products) };

    return response;
  }
}
module.exports = Emag;
