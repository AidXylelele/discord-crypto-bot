const config = require("../../knexfile");
const knex = require("knex");
const { CustomError } = require("../utils/customError.util");
const {
  CURRENCIES_TABLE_NAME,
  DB_ERROR,
  CONFLICT_KEY,
} = require("../consts/app.consts");

class CurrenciesService {
  constructor(connection, config) {
    this.db = connection(config.development);
  }

  async getAll() {
    try {
      return await this.db(CURRENCIES_TABLE_NAME).select();
    } catch (error) {
      throw new CustomError(error.message, DB_ERROR);
    }
  }

  async upsert(currencyArray) {
    try {
      const promises = currencyArray.map((currency) =>
        this.db(CURRENCIES_TABLE_NAME)
          .insert({ ...currency })
          .onConflict(CONFLICT_KEY)
          .merge()
      );
      return await Promise.all(promises);
    } catch (error) {
      throw new CustomError(error.message, DB_ERROR);
    }
  }
}

const currenciesService = new CurrenciesService(knex, config);

module.exports = { currenciesService };
