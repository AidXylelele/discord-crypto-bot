const { parentPort, workerData } = require("worker_threads");
const { currenciesParser } = require("../parsers/currencies.parser");

const startCurrenciesParsing = async (workerData, parentPort) => {
  const currencies = await currenciesParser(workerData);
  parentPort.postMessage(currencies);
};

startCurrenciesParsing(workerData, parentPort);
