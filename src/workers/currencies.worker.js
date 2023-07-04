const { parentPort, workerData } = require("worker_threads");
const { currenciesApi } = require("../api/currencies.api");

const startFetching = async (workerData, parentPort) => {
  const currencies = await currenciesApi.get(workerData);
  parentPort.postMessage(currencies);
};

startFetching(workerData, parentPort);
