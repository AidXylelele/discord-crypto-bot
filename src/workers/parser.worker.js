const { parentPort, workerData } = require("worker_threads");
const puppeteer = require("puppeteer");
// Something went wrong with network! Puppeteer can`t do any request to the net... Docker network...
const parser = async (link) => {
  console.log("Hello");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(link);

  const cryptoData = await page.evaluate(() => {
    const result = [];

    const rows = document.querySelectorAll(
      "tbody.table-body tr:not(.table-creative-tr)"
    );

    rows.forEach((row) => {
      let currency = {};
      currency.logo = row.querySelector("td > img.crypto_ico").src;
      currency.name = row.querySelector("td > div.names > a").innerText;
      currency.shortName = row.querySelector("td > div.names > div").innerText;
      currency.price = row
        .querySelector("td:nth-child(2)")
        .innerText.split(" ")[0];
      currency.change = row.querySelector("td:nth-child(5)").innerText;
      result.push(currency);
    });

    return result;
  });

  await browser.close();

  return cryptoData;
};

(async () => {
  const cryptoData = [
    {
      shortName: "Hello", 
      price: "Hello",
      change: "Hello",
    },
  ];
  parentPort.postMessage(cryptoData);
})().catch(console.log);
