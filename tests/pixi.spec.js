// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  viewport: { width: 1920, height: 1080 },
  

});

test('pixi test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.waitForTimeout(2000);

  await expect(page).toHaveTitle("Pixi Testing");

  const canvas = page.locator("data-testid=canvas");

  await expect(canvas).toBeVisible();

  page.keyboard.press("Tab");

  const bunny = page.getByTitle("I am bunny");

  await expect(bunny).toBeVisible();

  await bunny.click();

  await expect(page).toHaveScreenshot("pixi.png");
});

