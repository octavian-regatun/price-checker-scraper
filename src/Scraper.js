const API = require('price-checker-api');
const Product = require('./models/product');

const provider = process.env.PROVIDER.toLowerCase();

module.exports = {
  async getResponse(action, search) {
    switch (action) {
      case 'addFirstPage':
        switch (provider) {
          case 'pcgarage':
            return await API.PcGarage.requestFirstPage(search);

          default:
            console.log('Please specify a PROVIDER in .env file');
            break;
        }

        break;
      case 'addAllPages':
        switch (provider) {
          case 'pcgarage':
            return await API.PcGarage.requestAllPages(search);

          default:
            console.log('Please specify a PROVIDER in .env file');
            break;
        }

        break;

      default:
        console.log('Please specify a ACTION');
        break;
    }
  },

  async isProductInDB(product) {
    return await Product.exists({ name: product.name });
  },

  async addFirstPage(search) {
    const response = await this.getResponse('addFirstPage', search);

    for (const responseProduct of response.products) {
      const product = new Product();

      product.name = responseProduct.name;
      product.price = responseProduct.price;
      product.imgSrc = responseProduct.imgSrc;
      product.url = responseProduct.url;

      if (await this.isProductInDB(product)) {
        console.log("Product already in database, didn't save it again");
      } else {
        product.save((error) => {
          if (error) {
            console.log(error);
          }

          console.log('Product saved successfully');
        });
      }
    }
  },

  async addAllPages(search) {
    const response = await this.getResponse('addAllPages', search);

    for (const page of response.pages) {
      for (const responseProduct of page.products) {
        const product = new Product();

        product.name = responseProduct.name;
        product.price = responseProduct.price;
        product.imgSrc = responseProduct.imgSrc;
        product.url = responseProduct.url;

        if (await this.isProductInDB(product)) {
          console.log("Product already in database, didn't save it again");
        } else {
          product.save((error) => {
            if (error) {
              console.log(error);
            }

            console.log('Product saved successfully');
          });
        }
      }
    }
  }
};
