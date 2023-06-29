const { Worker } = require("node:worker_threads");

const LINK = 'https://myfin.by/crypto-rates';

async function getCryptoData() {
  const worker = new Worker('../workers/parser.worker.js', {workerData: LINK});
  worker.on('message', (data) => console.log("SERVICE", data))
}

getCryptoData().catch(console.error);
