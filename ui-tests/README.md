# CRM E2E Testing Suite

This repository contains end-to-end (E2E) tests for the CRM application using Playwright, a modern end-to-end testing framework.

## 🚀 Features

- Cross-browser testing (Chromium, Firefox, and WebKit)
- Automated authentication handling
- Parallel test execution
- Multiple test reports (HTML and Allure)
- Screenshot capture on test failures
- Video recording for failed tests
- Trace viewer support for debugging

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd CRM_e2e
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Install Allure reporter:

```bash
npm install -D allure-playwright
```

## 🔧 Configuration

The project uses the following key configurations:

- `playwright.config.js`: Main configuration file
- `global-setup.js`: Handles authentication for all browsers
- `storage-state.json`: Stores authentication state

### Key Settings

- Test timeout: 7 seconds
- Retry failed tests: 1 time
- Parallel test execution: Enabled
- Reporters: HTML and Allure
- Screenshots: Captured on test failures
- Video recording: Enabled for failed tests
- Trace viewer: Enabled for failed tests

## 🏃‍♂️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in specific browser

```bash
npx playwright test --project=chromium    # Run in Chromium
npx playwright test --project=firefox     # Run in Firefox
npx playwright test --project=webkit      # Run in WebKit
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

### Clear test state

```bash
# Remove the storage state file if you need a fresh login
npx playwright clear-storage-state
```

Or manually remove the storage state file:

```bash
rm storage-state.json
```

## 📊 Viewing Reports

### HTML Report

After test execution, view the HTML report:

```bash
npx playwright show-report
```

### Allure Report

Generate and view Allure report:

```bash
# Generate report
npx allure generate ./allure-results --clean

# Open report
npx allure open ./allure-report
```

Or use npm scripts:

```bash
# Run tests and generate report
npm run test:report

# Generate report only
npm run report:generate

# Open report only
npm run report:open
```

## 🔍 Debugging Tests

1. Using Trace Viewer:

```bash
npx playwright show-trace [trace-file]
```

2. Using Playwright Inspector:

```bash
PWDEBUG=1 npx playwright test
```

3. Using Debug Mode:

```bash
npx playwright --debug
```

## 📁 Project Structure

```
CRM_e2e/
├── tests/               # Test files
├── pages/              # Page Object Model files
├── global-setup.js     # Authentication setup
├── playwright.config.js # Playwright configuration
├── storage-state.json  # Authentication state
├── test-results/      # Test execution results
├── playwright-report/  # Playwright HTML reports
├── allure-results/    # Allure test results
├── allure-report/     # Generated Allure reports
├── .github/           # CI/CD configurations
├── package.json       # Project dependencies
├── package-lock.json  # Dependency lock file
└── .gitignore        # Git ignore rules
```

## 📑 Page Object Model

The project follows the Page Object Model (POM) design pattern:

Benefits of using POM:

- Reusable page components
- Better maintainability
- Cleaner test code
- Easier updates when UI changes
- Separation of test logic from page interactions

## 🔐 Authentication

The project uses a global setup to handle authentication:

- Automatically logs in before test execution
- Maintains session state across all browsers
- Uses a single storage state file for all browsers

## 🧪 Writing Tests

Example test structure:

```javascript
import { test, expect } from "@playwright/test";

test("test name", async ({ page }) => {
  // Test steps
  await page.goto("https://example.com");
  await expect(page).toHaveTitle("Example Domain");
});
```

## 📝 Best Practices

1. Use meaningful test descriptions
2. Keep tests independent
3. Use page objects for better maintainability
4. Handle async operations properly
5. Use appropriate assertions
6. Clean up test data after execution

## 🔄 CI/CD Integration

The project is configured for CI/CD environments:

- Fails on CI if test.only is left in code
- Uses 1 worker on CI
- Retries failed tests on CI
- Supports multiple report formats (HTML and Allure) for CI/CD integration

## 🤝 Contributing

1. Create a feature branch
2. Write your tests
3. Ensure all tests pass
4. Submit a pull request

## 📫 Support

For any issues or questions, please contact the QA team.
