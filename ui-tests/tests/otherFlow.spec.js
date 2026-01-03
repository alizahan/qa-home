import { test, expect } from "@playwright/test";
import LoginPage from "../pages/page";

test.describe("From Identifying the lowest and highest priced products to the Logout", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // Navigate to the inventory page
    await loginPage.gotoInventoryPage();
  });

  test(
    "Identifying the lowest and highest priced products",
    {
      tag: ["@Smoke", "@identify_lowest_highest_priced_products"],
    },
    async ({ page }) => {
      // //Identifying the lowest and highest priced products using Math.min and Math.max
      // // Get all product price elements and convert them to numbers //Get all price elements and extract their text into a number array
      // const prices = await page
      //   .locator(".inventory_item_price")
      //   .evaluateAll((elements) =>
      //     elements.map((el) => parseFloat(el.innerText.replace("$", "")))
      //   );
      // // Identify the lowest and highest values using Math.min and Math.max
      // const lowestPrice = Math.min(...prices); //Find the lowest price
      // const highestPrice = Math.max(...prices); //Find the highest price

      // console.log("Lowest price product: ", lowestPrice);
      // console.log("Highest price product:", highestPrice);

      //Identifying the lowest and highest priced products using Sorting
      // Sort Low to High
      await page.selectOption(".product_sort_container", "lohi");
      const firstItemPrice = await page
        .locator(".inventory_item_price")
        .first()
        .textContent();

      const lastItemPrice = await page
        .locator(".inventory_item_price")
        .last()
        .innerText();

      console.log("First item price:", firstItemPrice);
      console.log("Last item price:", lastItemPrice);
      // console.log(
      //   `Lowest price: ${firstItemPrice}, Highest price: ${lastItemPrice}`
      // );
    }
  );

  test(
    "Adding both lowest and highest priced products to the cart",
    {
      tag: ["@Smoke", "@add_lowest_highest_priced_products_to_cart"],
    },
    async ({ page }) => {
      // Sort the products by price in ascending order
      await page.selectOption(".product_sort_container", "lohi");
      // Click the first and the last "Add to cart" button
      await page.locator("button:has-text('Add to cart')").first().click(); //Clicking the first "Add to cart" button
      await page.locator("button:has-text('Add to cart')").last().click(); //Clicking the last "Add to cart" button
    }
  );
  test(
    "Proceed to checkout and complete the order process",
    {
      tag: ["@Smoke", "@complete_the_order_process"],
    },
    async ({ page }) => {
      // Sort the products by price in ascending order
      await page.selectOption(".product_sort_container", "lohi");
      // Click the first and the last "Add to cart" button
      await page.locator("button:has-text('Add to cart')").first().click(); //Clicking the first "Add to cart" button
      await page.locator("button:has-text('Add to cart')").last().click(); //Clicking the last "Add to cart" button
      await page.goto("https://www.saucedemo.com/inventory.html");
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="checkout"]').click();
      await page.locator('[data-test="firstName"]').fill("Ali");
      await page.locator('[data-test="lastName"]').fill("Zahan");
      await page.locator('[data-test="postalCode"]').fill("12345");
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();
      await expect(page.locator('[data-test="complete-header"]')).toHaveText(
        "Thank you for your order!"
      );
      await expect(page.locator('[data-test="title"]')).toHaveText(
        "Checkout: Complete!"
      );
    }
  );
  test(
    "Finally, Logging out from the application",
    {
      tag: ["@Smoke", "@logging_out_from_the_application"],
    },
    async ({ page }) => {
      await page.selectOption(".product_sort_container", "lohi");
      // Click the first and the last "Add to cart" button
      await page.locator("button:has-text('Add to cart')").first().click(); //Clicking the first "Add to cart" button
      await page.locator("button:has-text('Add to cart')").last().click(); //Clicking the last "Add to cart" button
      await page.goto("https://www.saucedemo.com/inventory.html");
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="checkout"]').click();
      await page.locator('[data-test="firstName"]').fill("Ali");
      await page.locator('[data-test="lastName"]').fill("Zahan");
      await page.locator('[data-test="postalCode"]').fill("12345");
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();
      await page.getByRole("button", { name: "Open Menu" }).click();
      await page.locator('[data-test="logout-sidebar-link"]').click();
      await expect(page).toHaveURL(/.*saucedemo.com/);
    }
  );
});
