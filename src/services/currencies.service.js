const config = require("../../knexfile");
let knex = require("knex");
const { CustomError } = require("../utils/customError.util");

knex = knex(config.development);

class CurrenciesService {
  constructor(knex) {
    this.knex = knex;
    this.dbName = "currencies";
  }

  async get() {
    try {
      const data = await this.knex(this.dbName).select();
      return data;
    } catch (error) {
      throw new CustomError(error.message, "Database Error");
    }
  }

  async set(array) {
    try {
      const promises = array.map((item) => this.knex(this.dbName).insert(item));
      return await Promise.all(promises);
    } catch (error) {
      throw new CustomError(error.message, "Database Error");
    }
  }
}

const currenciesService = new CurrenciesService(knex);

module.exports = { currenciesService };
