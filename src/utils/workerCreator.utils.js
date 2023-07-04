const { Worker } = require("node:worker_threads");
const { dataService } = require("../services/data.service");
const Queue = require("better-queue");

const PATH = "./src/workers/parser.worker.js";
const LINK = "https://myfin.by/crypto-rates";

const taskQueue = new Queue((task, cb) => {
  const worker = new Worker(PATH, {
    workerData: task,
  });

  worker.on("message", async (result) => {
    await dataService.setData(result);
  });

  worker.on("error", reject);
});

module.exports = { taskQueue, PATH, LINK };
