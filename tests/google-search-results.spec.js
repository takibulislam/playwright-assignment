const { test, expect } = require("@playwright/test");

test("Google search", async ({ page }) => {
  await page.goto("https://www.bing.com/");

  // Search on the search engine
  await page.locator('input[id="sb_form_q"]').fill("javascript");
  await page.keyboard.press("Enter");

  await page.waitForSelector("#b_results");

  // priting search results using js code inside playwright scripts.
  const searchResults = await page.evaluate(() => {
    let results = [];

    const searchItems = document.querySelectorAll("#b_results>.b_algo");
    searchItems.forEach((result) => {
      const titles = result.querySelector("h2").innerText;
      results.push(titles);
    });
    return results;
  });
  console.log(searchResults);
});
