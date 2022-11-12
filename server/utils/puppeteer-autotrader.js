const puppeteer = require("puppeteer-core");

const getDataFromAutotraderUK = async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: `C:/Program Files/Google/Chrome/Application/chrome.exe`,
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.autotrader.co.uk/");

    // console.log("page", await page.content());

    await page.type(`#postcode`, `B258LR`);
    const make = await page.$(`[name="make"]`);
    await make.select("Volvo"); //should come from user input

    setTimeout(async () => {
      const model = await page.$(`[name="model"]`); //should come from user input
      await model.select("244");
    }, 500);

    const maxPrice = await page.$(`[name="maxPrice"]`); //should come from user input
    await maxPrice.select("3000");

    const v = await (await make.getProperty("value")).jsonValue();
    console.log(v);
  } catch (error) {
    console.error(error);
  }
};

getDataFromAutotraderUK();

// TODO: move executablePath to env
