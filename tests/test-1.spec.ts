import { test, expect } from "@playwright/test";
import { title } from "process";

test("Google search", async ({ page }) => {
  await page.goto("https://www.bing.com/");

  await page.locator('input[id="sb_form_q"]').fill("javascript");
  await page.keyboard.press("Enter");

  await page.waitForSelector("#b_results");

  const searchResults = await page.evaluate(() => {
    let results = [];
    const searchItems = document.querySelectorAll("#b_results>.b_algo");
    searchItems.forEach((result) => {
      const titles = result.querySelector("h2").innerText;
      // console.log(titles);
      results.push(titles);
    });
    // results.push(titles);
    return results;
  });
  console.log(searchResults);
});
