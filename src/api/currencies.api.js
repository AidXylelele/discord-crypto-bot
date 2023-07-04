const Binance = require("node-binance-api");
const { CustomError } = require("../utils/customError.util");

const config = {
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
};

const binance = new Binance().options(config);

class CurrenciesApi {
  constructor(api) {
    this.api = api;
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

const currenciesApi = new CurrenciesApi(binance);

module.exports = { currenciesApi };
