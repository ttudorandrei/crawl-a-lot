const puppeteer = require("puppeteer-core");

const getDataFromEbayUK = async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: `C:/Program Files/Google/Chrome/Application/chrome.exe`,
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto("https://www.ebay.co.uk/");

    await page.type(`#gh-ac`, `BMW 3 Series`);
    const searchCategory = await page.$(`[name="_sacat"]`);
    await searchCategory.select("9800");

    // click for the results
    await page.$eval("#gh-btn", (e) => e.click());
  } catch (error) {
    console.error(error);
  }
};

getDataFromEbayUK();
