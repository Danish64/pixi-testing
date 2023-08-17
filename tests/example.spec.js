// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  viewport: { width: 1920, height: 1080 },
});

test('pixi test', async ({ page }) => {
  await page.goto('http://localhost:3000/');


  await page.waitForTimeout(1000);

  await expect(page).toHaveTitle("Pixi Testing");

  const canvas = page.getByTestId('canvas');

  canvas.waitFor();

  page.mouse.move(50, 50);

  page.mouse.click(50, 50);

  page.mouse.down();

  page.mouse.move(100, 100);

  page.mouse.up();

  await expect(page).toHaveScreenshot("pixi.png");
});

