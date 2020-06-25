# price-checker-backend

[![Code Style](https://travis-ci.com/octavian-regatun/price-checker-backend.svg?branch=master)](https://travis-ci.com/github/octavian-regatun/price-checker-backend)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

This is the backend of the site that will compare the prices of the product searched on all the specified <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/1200px-Flag_of_Romania.svg.png" width="16"> Romanian <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/1200px-Flag_of_Romania.svg.png" width="16"> online shopping sites, finding the cheapest one, together with the API (the two will be separated in the near future).


## APIs for the following online stores
- [x] eMAG
- [x] PcGarage
- [ ] Altex
- [ ] Media Galaxy
- [ ] Flanco
- [ ] Domo

## Main dependencies used
- **[Express](https://www.npmjs.com/package/express)** (backend server)
- **[Cheerio](https://www.npmjs.com/package/cheerio)** (web scraping)
