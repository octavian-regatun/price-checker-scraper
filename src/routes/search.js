const PcGarage = require('../extractors/pcgarage');

module.exports = (app) => {
  app.get('/search/:search', async (request, response) => {
    const { params } = request;
    const { search } = params;

    // console.log(await PcGarage.pcgarageExtractor(product));
    response.send(await PcGarage.request(search));
  });
};
