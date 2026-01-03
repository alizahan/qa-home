import { test, expect } from "@playwright/test";
import LoginPage from "../pages/page";

test.describe("Login Tests", () => {
  let context; //context is a browser session

  test.beforeEach(async ({ browser }) => {
    // Create a new context with storage state disabled
    context = await browser.newContext({
      storageState: undefined, // It tells Playwright to NOT use any stored authentication state
    });
  });

  test.afterEach(async () => {
    // Clean up after each test
    await context.close();
  });

  test(
    "Login with valid credentials",
    {
      tag: ["@Smoke", "@valid_login"],
    },
    async ({ browser }) => {
      const page = await context.newPage(); //new page is a new browser tab

      const loginPage = new LoginPage(page); //initialize the login page object
      await loginPage.gotoLoginPage();
      await loginPage.login("standard_user", "secret_sauce");

      //Assertions
      await expect(page).toHaveURL(/.*inventory.html/); //Assertion for URL
      await expect(page).toHaveTitle("Swag Labs"); //Assertion for tab content (page title)
      await expect(
        page.locator('[data-test="inventory-container"]')
      ).toBeVisible(); //Assertion for inventory container visibility
      await expect(page.locator('[data-test="title"]')).toHaveText("Products"); //Assertion for product title text
    }
  );

  test(
    "Login with invalid Username",
    {
      tag: ["@Smoke", "@invalid_username"],
    },
    async ({ browser }) => {
      const page = await context.newPage();

      const loginPage = new LoginPage(page);
      await loginPage.gotoLoginPage();
      await loginPage.login("invalid_user", "secret_sauce");
      //Assertions
      await expect(page).toHaveURL(/.*saucedemo.com/); //Assertion for URL
      await expect(page).toHaveTitle("Swag Labs"); //Assertion for tab content (page title)
      await expect(page.locator('[data-test="error"]')).toBeVisible(); //Assertion for error message visibility
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      ); //Assertion for specific error message text
    }
  );

  test(
    "Login with invalid Password",
    {
      tag: ["@Smoke", "@wrong_password"],
    },
    async ({ browser }) => {
      const page = await context.newPage();

      const loginPage = new LoginPage(page);
      await loginPage.gotoLoginPage();
      await loginPage.login("standard_user", "wrongpassword");
      //Assertions
      await expect(page).toHaveURL(/.*saucedemo.com/); //Assertion for URL
      await expect(page).toHaveTitle("Swag Labs"); //Assertion for tab content (page title)
      await expect(page.locator('[data-test="error"]')).toBeVisible(); //Assertion for error message visibility
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      ); //Assertion for specific error message text
    }
  );
});
