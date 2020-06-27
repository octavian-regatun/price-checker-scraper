# price-checker-backend

![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/octavian-regatun/price-checker-backend/blob/master/LICENSE.md)
![Travis (.com) branch](https://img.shields.io/travis/com/octavian-regatun/price-checker-backend/master?style=flat-square)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

This is a web scraper that will search products on all the specified <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/1200px-Flag_of_Romania.svg.png" width="16"> Romanian <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/1200px-Flag_of_Romania.svg.png" width="16"> shopping sites and put them in the MongoDB Atlas cloud database, together with the API (the two will be separated in the near future).

## APIs for the following online stores
- [x] **[PcGarage](https://www.pcgarage.ro/)**
- [ ] **[eMAG](https://www.emag.ro/)**
- [ ] **[Altex](https://altex.ro/)**
- [ ] **[Media Galaxy](https://mediagalaxy.ro/)**
- [ ] **[evoMAG](https://evomag.ro/)**
- [ ] **[CEL](https://cel.ro/)**
- [ ] **[Flanco](https://flanco.ro/)**
- [ ] **[Domo](https://domo.ro/)**

## Main stuff used
- **[Express](https://www.npmjs.com/package/express)** (backend server)
- **[Cheerio](https://www.npmjs.com/package/cheerio)** (web scraping)
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** (db related)
- **[Mongoose](https://www.npmjs.com/package/mongoose)** (db related)

## About TESTS

#### How & where they work?

At the moment, the tests work through a GET request to the site, in order to get the HTML of the site and further to be tested with the help of the cheerio library.

If the tests are run locally, they have no problem and no reCAPTCHA intervenes. 

#### The problem and why they dont work

The problem is that if the tests are uploaded to an external tool for example Travis CI / Semaphore CI and are tried to be run, when the GET request is made to the site to obtain the HTML a reCAPTCHA intervenes

#### The solution?

The only way I can think of to fix them so that they run on external tools like Travis CI / Semaphore CI would be to rewrite them so that they don't use GET requests to sites anymore to get the HTML for the tests.  
As an alternative to getting the HTML through each test via a GET request, strictly the HTML needed for testing can be stored locally or put in the database and taken from there to run the tests.

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2020-06-25

### Changed 
- setup workspace
- tried to fix travis tests, yet they don't work but it'll be fixed later

### Added
- API working for PcGarage
- add tests for PcGarage API

[0.0.1]: https://github.com/octavian-regatun/price-checker-scraper/commit/38fc3763f9d7802aa73a7dfbb58c3d09d8ffa826
