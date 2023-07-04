const puppeteer = require("puppeteer");
const { CustomError } = require("../utils/customError.util");

const config = {
  args: ["--no-sandbox"],
  headless: true,
};

const currenciesParser = async (link) => {
  try {
    const browser = await puppeteer.launch(config);

    const page = await browser.newPage();
    await page.goto(link);

    const cryptoData = await page.evaluate(() => {
      const result = [];

      const rows = document.querySelectorAll(
        "tbody.table-body tr:not(.table-creative-tr)"
      );

      for (const row of rows) {
        let currency = {};
        currency.shortName = row.querySelector(
          "td > div.names > div"
        ).innerText;
        currency.price = row
          .querySelector("td:nth-child(2)")
          .innerText.split(" ")[0];
        currency.change = row.querySelector("td:nth-child(5)").innerText;
        result.push(currency);
      }

      return result;
    });

    await browser.close();

    return cryptoData;
  } catch (error) {
    throw new CustomError(error.message, "Currencies Parser Error");
  }
};

module.exports = { currenciesParser };
