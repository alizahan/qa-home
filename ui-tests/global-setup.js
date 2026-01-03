import { chromium, firefox, webkit } from "@playwright/test";

async function globalSetup() {
  // Handle Chromium
  const chromiumBrowser = await chromium.launch();
  const chromiumContext = await chromiumBrowser.newContext();
  const chromiumPage = await chromiumContext.newPage();
  await chromiumPage.goto("https://www.saucedemo.com/"); // 60 seconds timeout
  await chromiumPage.locator('[data-test="username"]').fill("standard_user");
  await chromiumPage.locator('[data-test="password"]').fill("secret_sauce");
  await chromiumPage.locator('[data-test="login-button"]').click();
  await chromiumPage.waitForURL("**/inventory.html"); // 60 seconds timeout
  await chromiumContext.storageState({ path: "./storage-state-chromium.json" });
  await chromiumBrowser.close();

  // // Handle Firefox
  // const firefoxBrowser = await firefox.launch();
  // const firefoxContext = await firefoxBrowser.newContext();
  // const firefoxPage = await firefoxContext.newPage();
  // await firefoxPage.goto("https://www.saucedemo.com/");
  // await firefoxPage.locator('[data-test="username"]').fill("standard_user");
  // await firefoxPage.locator('[data-test="password"]').fill("secret_sauce");
  // await firefoxPage.locator('[data-test="login-button"]').click();
  // await firefoxPage.waitForURL("**/inventory.html");
  // await firefoxContext.storageState({ path: "./storage-state-firefox.json" });
  // await firefoxBrowser.close();

  // // Handle WebKit
  // const webkitBrowser = await webkit.launch();
  // const webkitContext = await webkitBrowser.newContext();
  // const webkitPage = await webkitContext.newPage();
  // await webkitPage.goto("https://www.saucedemo.com/");
  // await webkitPage
  //   .locator('[data-test="username"]').fill("standard_user");
  // await webkitPage
  //   .locator('[data-test="password"]').fill("secret_sauce");
  // await webkitPage.locator('[data-test="login-button"]').click();
  // await webkitPage.waitForURL("**/inventory.html");
  // await webkitContext.storageState({ path: "./storage-state-webkit.json" });
  // await webkitBrowser.close();
}

export default globalSetup;
