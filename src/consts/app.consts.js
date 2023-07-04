//Workers
const WORKER_FILE = "./src/workers/currencies.worker.js";

//API`s
const CRYPTOS = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

//Database 
const DB_ERROR = "Database Error";
const CONFLICT_KEY = "name";
const CURRENCIES_TABLE_NAME = "currencies";

//Bot Response
const TITLE = 'Currency prices:';
const COLOR = 0xff0000;


module.exports = { WORKER_FILE, CRYPTOS, DB_ERROR, CONFLICT_KEY, CURRENCIES_TABLE_NAME, TITLE, COLOR };
