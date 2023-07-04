const { Worker } = require("node:worker_threads");
const { currenciesService } = require("../services/currencies.service");
const Queue = require("better-queue");

const apiWorkerQueue = new Queue((input, _cb) => {
  const { WORKER_FILE, CRYPTOS } = input;

  const worker = new Worker(WORKER_FILE, { workerData: CRYPTOS });

  worker.on("message", async (result) => {
    await currenciesService.upsert(result);
  });

  worker.on("error", (err) => {
    console.log(err);
    process.exit(1);
  });
});

module.exports = { apiWorkerQueue };
