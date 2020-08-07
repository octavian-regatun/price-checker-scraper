const API = require('price-checker-api');
const Product = require('./models/product');
const CustomLog = require('./utils/CustomLog');

module.exports = {
  async isProductInDB(product) {
    return await Product.exists({ name: product.name });
  },

  async addFirstPage(search, provider) {
    const response = await API[provider].requestFirstPage(search);

    for (const responseProduct of response.products) {
      const product = new Product();

      product.name = responseProduct.name;
      product.price = responseProduct.price;
      product.imgSrc = responseProduct.imgSrc;
      product.url = responseProduct.url;

      if (await this.isProductInDB(product)) {
        CustomLog.info("Product already in database, didn't save it again!");
      } else {
        product.save((error) => {
          if (error) {
            console.log(error);
          }

          CustomLog.succes('Product saved successfully.');
        });
      }
    }
  },

  async addAllPages(search, provider) {
    const response = await API[provider].requestAllPages(search);

    for (const page of response.pages) {
      for (const responseProduct of page.products) {
        const product = new Product();

        product.name = responseProduct.name;
        product.price = responseProduct.price;
        product.imgSrc = responseProduct.imgSrc;
        product.url = responseProduct.url;

        if (await this.isProductInDB(product)) {
          CustomLog.info("Product already in database, didn't save it again.");
        } else {
          product.save((error) => {
            if (error) {
              console.log(error);
            }

            CustomLog.succes('Product saved successfully!');
          });
        }
      }
    }
  },

  async addByCategory(category, provider) {
    const response = await API[provider].requestByCategory(category);

    for (const page of response.pages) {
      for (const responseProduct of page.products) {
        const product = new Product();

        product.name = responseProduct.name;
        product.price = responseProduct.price;
        product.imgSrc = responseProduct.imgSrc;
        product.url = responseProduct.url;

        if (await this.isProductInDB(product)) {
          CustomLog.info("Product already in database, didn't save it again.");
        } else {
          product.save((error) => {
            if (error) {
              console.log(error);
            }

            CustomLog.succes('Product saved successfully!');
          });
        }
      }
    }
  }
};
