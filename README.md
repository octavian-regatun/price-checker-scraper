# price-checker-backend

![Maintenance](https://img.shields.io/maintenance/yes/2020)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/octavian-regatun/price-checker-backend/blob/master/LICENSE.md)
![Travis (.com) branch](https://img.shields.io/travis/com/octavian-regatun/price-checker-backend/master)
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
