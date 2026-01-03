import http from "k6/http"; // This imports the HTTP library for making API requests
import { check, sleep, group } from "k6"; // This imports the check, sleep, and group functions from the k6 library
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"; // This imports the HTML reporting tool

export const options = {
  // This is the configuration for the test
  stages: [
    { duration: "20s", target: 5 }, // This is the ramp-up stage
    { duration: "1m", target: 10 }, // This is the sustain stage
    { duration: "20s", target: 0 }, // This is the cool-down stage
  ],
};

const API_TOKEN =
  "8202b0650dcc561426db3ea0e553241505aef9fa1287311a06fda8f9653f1924";
const BASE_URL = "https://simple-grocery-store-api.click";

export default function () {
  // Common headers for all authorized requests to avoid repeating the same code multiple times
  const authParams = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  group("Order Workflow", function () {
    // 1. Create a Cart
    const cartRes = http.post(`${BASE_URL}/carts`);
    const cartId = cartRes.json().cartId;
    check(cartRes, { "1. Cart Created": (r) => r.status === 201 });

    // 2. Add Item to Cart
    const itemPayload = JSON.stringify({
      productId: 4643,
      quantity: 1,
    });

    // Applying authParams to ensure the item actually gets into the cart
    const itemRes = http.post(
      `${BASE_URL}/carts/${cartId}/items`,
      itemPayload,
      authParams
    );
    check(itemRes, { "2. Item Added": (r) => r.status === 201 });

    // 3. Create the Order
    const orderPayload = JSON.stringify({
      cartId: cartId,
      customerName: "Senior_QA_Performance_Tester",
    });

    const orderRes = http.post(`${BASE_URL}/orders`, orderPayload, authParams);

    // Final Validation & Error Logging
    const isSuccessful = check(orderRes, {
      "3. Order Successful": (r) => r.status === 201, // 201 means the order was created successfully
      "4. Order ID Created": (r) => r.json().orderId !== undefined, // orderId is the ID of the order that was created
    });
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
