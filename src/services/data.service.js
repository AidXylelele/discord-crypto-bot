const config = require("../../knexfile");
let knex = require("knex");

knex = knex(config.development);

class DataService {
  constructor(knex) {
    this.knex = knex;
    this.dbName = "currencies";
  }

  async getData() {
    return await this.knex(this.dbName).select();
  }

  async setData(array) {
    console.log("SetData", array);
    const promises = array.map((item) => this.knex(this.dbName).insert(item));
    return await Promise.all(promises);
  }
}

const dataService = new DataService(knex);

module.exports = { dataService };
