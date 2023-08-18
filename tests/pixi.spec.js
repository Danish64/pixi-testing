// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  viewport: { width: 1920, height: 1080 },
});

test('pixi test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle("Pixi Testing");

  page.mouse.click(250, 250);

  await expect(page).toHaveScreenshot("pixi.png");
});

