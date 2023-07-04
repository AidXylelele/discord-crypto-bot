const binance = require("node-binance-api");
const { CustomError } = require("../utils/customError.util");

const config = {
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
};

class CurrenciesApi {
  constructor(api, config) {
    this.api = api.options(config);
  }

  async get(cryptos) {
    try {
      const result = [];
      const ticker = await this.api.prices();
      for (const name of cryptos) {
        const price = ticker[name];
        result.push({ name, price });
      }
      return result;
    } catch (error) {
      throw new CustomError(error.message, "Currencies Api Error");
    }
  }
}

const currenciesApi = new CurrenciesApi(binance, config);

module.exports = { currenciesApi };
