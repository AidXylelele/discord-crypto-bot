const { parentPort, workerData } = require("worker_threads");
const puppeteer = require("puppeteer");

const parser = async (link) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
});

  const page = await browser.newPage();

  await page.goto(link);

  const cryptoData = await page.$$eval(
    "tbody.table-body tr:not(.table-creative-tr)",
    (rows) =>
      Array.from(rows).map((row) => ({
        logo: row.querySelector("td > img.crypto_ico").src,
        name: row.querySelector("td > div.names > a").innerText,
        shortName: row.querySelector("td > div.names > div").innerText,
        price: row.querySelector("td:nth-child(2)").innerText.split(" ")[0],
        change: row.querySelector("td:nth-child(5)").innerText,
      }))
  );

  await browser.close();

  return cryptoData;
};

(async () => {
  const cryptoData = await parser(workerData);
  parentPort.postMessage(cryptoData);
})().catch(console.log);
