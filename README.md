# QA Test Automation Suite

A comprehensive test automation framework covering UI, API, and performance testing for the CRM application.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Viewing Reports](#viewing-reports)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **k6** (for performance tests) - [Installation Guide](#installing-k6)
- **Git**

### Installing k6

**macOS:**

```bash
brew install k6
```

**Linux (Debian/Ubuntu):**

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows:**
Download and install from [k6.io](https://k6.io/docs/getting-started/installation/)

Verify installation:

```bash
k6 version
```

## Project Structure

```
qa-home/
├── ui-tests/              # Playwright E2E tests
│   ├── tests/            # Test specifications
│   ├── pages/            # Page Object Model classes
│   ├── playwright.config.js
│   └── package.json
├── api-tests:/           # Newman/Postman API tests
│   ├── collection/       # Postman collection files
│   └── package.json
├── performance-tests:/   # k6 performance tests
│   └── create-order.test.js
└── .github/              # CI/CD workflows
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd qa-home
```

### 2. Setup UI Tests

```bash
cd ui-tests
npm install
npx playwright install chromium
```

**Note:** The global setup will automatically authenticate and create a storage state file for authenticated tests.

### 3. Setup API Tests

```bash
cd api-tests:
npm install
```

### 4. Setup Performance Tests

No additional setup required. Ensure k6 is installed (see [Prerequisites](#prerequisites)).

## Running Tests

### UI Tests (Playwright)

```bash
cd ui-tests
npm test
```

**Additional options:**

```bash
npx playwright test --ui              # Interactive UI mode
npx playwright test --debug           # Debug mode
npx playwright test --project=chromium # Specific browser
npm run test:report                   # Run with Allure report
```

### API Tests (Newman)

```bash
cd api-tests:
npx newman run "collection/Simple Grocery Store API - Automation.postman_collection.json" \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export report.html \
  --reporter-htmlextra-title "API Test Report"
```

### Performance Tests (k6)

```bash
cd performance-tests:
k6 run create-order.test.js
```

## Viewing Reports

### UI Test Reports

**Playwright HTML Report:**

```bash
cd ui-tests
npx playwright show-report
```

**Allure Report:**

```bash
cd ui-tests
npm run report:generate
npm run report:open
```

### API Test Reports

Open `api-tests:/report.html` in your browser after running tests.

### Performance Test Reports

Open `performance-tests:/summary.html` in your browser after running tests.

## Troubleshooting

### UI Tests

**Authentication issues:**

```bash
cd ui-tests
rm storage-state-*.json
npm test
```

**Browser installation issues:**

```bash
cd ui-tests
npx playwright install --force chromium
```

### API Tests

**Collection file not found:**

- Verify the collection file exists in `api-tests:/collection/`
- Check the file path in the command

### Performance Tests

**k6 command not found:**

```bash
k6 version
```

If not installed, follow installation instructions in [Prerequisites](#prerequisites).

**Authentication errors:**

- Verify the API token in `create-order.test.js` is valid

## CI/CD

The project includes GitHub Actions workflows for automated testing. Tests run automatically on push to the main branch. See `.github/workflows/ci-cd.yml` for configuration details.