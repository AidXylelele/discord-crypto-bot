const { Worker } = require("node:worker_threads");
const config = require("../../knexfile");
const { default: knex } = require("knex");

const LINK = "https://myfin.by/crypto-rates";
const PATH = "./src/workers/parser.worker.js";

class DataService {
  constructor(config, path, link, Worker) {
    this.db = knex(config.development);
    this.path = path;
    this.link = link;
    this.worker = new Worker(path, { workerData: link });
  }

  _getDataFromWorker() {
    return new Promise((resolve, reject) => {
      this.worker.on("message", resolve);
      this.worker.on("error", reject);
    });
  }

  async getData() {
    return await this.db("currencies").select();
  }

  setData() {
    const data = this._getDataFromWorker();
    data.then((currs) => currs.forEach(this.db("currencies").insert));
  }
}

const dataService = new DataService(config, PATH, LINK, Worker);

module.exports = { dataService };
