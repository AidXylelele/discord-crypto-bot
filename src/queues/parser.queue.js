const { Worker } = require("node:worker_threads");
const { currenciesService } = require("../services/currencies.service");
const Queue = require("better-queue");

const parserQueue = new Queue(({ LINK, PATH, process }, _cb) => {
  const worker = new Worker(PATH, { workerData: LINK });
  worker.on("message", async (result) => {
    await currenciesService.set(result);
  });

  worker.on("error", (err) => {
    process.exit(1);
  });
});

module.exports = { parserQueue };
