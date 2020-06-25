const PcGarage = require('../extractors/pcgarage');
const Emag = require('../extractors/emag');

module.exports = (app) => {
  app.get('/search/:search', async (request, response) => {
    const { params } = request;
    const { search } = params;

    const responseEmag = await Emag.request(search);
    const responsePcGarage = await PcGarage.request(search);

    response.send({ emag: responseEmag, pcgarage: responsePcGarage });
  });
};
