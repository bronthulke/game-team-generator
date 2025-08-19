import { test, expect } from '@playwright/test';

test('homepage has title and loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page loads
  await expect(page).toHaveTitle(/Game Team Randomizer/i);
  
  // Check for some expected content
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Game Team Randomizer');
});

test('app renders without crashing', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the app to be ready
  await page.waitForLoadState('networkidle');
  
  // Check that we don't have any console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Give it a moment to render
  await page.waitForTimeout(1000);
  
  // Check no critical errors occurred
  expect(errors.filter(error => !error.includes('favicon'))).toHaveLength(0);
});

test('can add and manage players', async ({ page }) => {
  await page.goto('/');
  
  // Check initial state
  await expect(page.locator('text=No players yet.')).toBeVisible();
  
  // Add a player
  await page.fill('input[placeholder="Add player name"]', 'Alice');
  await page.click('button:has-text("Add")');
  
  // Check player was added
  await expect(page.locator('text=Alice')).toBeVisible();
  await expect(page.locator('text=No players yet.')).not.toBeVisible();
  
  // Add another player
  await page.fill('input[placeholder="Add player name"]', 'Bob');
  await page.press('input[placeholder="Add player name"]', 'Enter');
  
  // Check second player was added
  await expect(page.locator('text=Bob')).toBeVisible();
  
  // Test select all functionality
  await page.click('button:has-text("Select All")');
  await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
  await expect(page.locator('input[type="checkbox"]').nth(1)).toBeChecked();
});

test('can generate teams', async ({ page }) => {
  await page.goto('/');
  
  // Add multiple players
  const players = ['Alice', 'Bob', 'Charlie', 'Diana'];
  for (const player of players) {
    await page.fill('input[placeholder="Add player name"]', player);
    await page.press('input[placeholder="Add player name"]', 'Enter');
  }
  
  // Select all players
  await page.click('button:has-text("Select All")');
  
  // Set team size
  await page.fill('#team-size', '2');
  
  // Generate teams
  await page.click('button:has-text("Generate Teams")');
  
  // Check teams were generated
  await expect(page.locator('text=Team 1')).toBeVisible();
  await expect(page.locator('text=Team 2')).toBeVisible();
  
  // Check that teams contain players
  const teamCards = page.locator('.team-card');
  await expect(teamCards).toHaveCount(2);
});
