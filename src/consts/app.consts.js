const WORKER_FILE = "./src/workers/currencies.worker.js";

const CRYPTOS = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

const DB_ERROR = "Database Error";
const CONFLICT_KEY = "name";
const CURRENCIES_TABLE_NAME = "currencies";

module.exports = { WORKER_FILE, CRYPTOS, DB_ERROR, CONFLICT_KEY, CURRENCIES_TABLE_NAME };
