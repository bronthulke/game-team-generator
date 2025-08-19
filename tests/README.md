# Testing

This project uses **Playwright** for end-to-end testing.

## Available Test Commands

- `npm test` - Run all tests
- `npm run test:ui` - Run tests in interactive UI mode
- `npm run test:debug` - Run tests in debug mode
- `npm run test:report` - Open the HTML test report
- `npm run test:headed` - Run tests in headed mode (visible browser)

## Test Structure

- `app.e2e.test.js` - End-to-end tests for the Game Team Randomizer app

## Test Coverage

✅ **Basic App Functionality:**
- Page loading and title verification
- Error-free rendering

✅ **Player Management:**
- Adding players via button and Enter key
- Player selection/deselection
- Select All/Deselect All functionality

✅ **Team Generation:**
- Basic team generation with multiple players
- Custom team size configuration
- Team display verification

## Running Tests

Make sure your dev server is running:
```bash
npm run dev
```

Then run tests:
```bash
npm test
```

The tests are configured to automatically start the dev server if needed (see `playwright.config.js`).
