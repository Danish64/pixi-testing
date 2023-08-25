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

  const graphic = page.getByTitle("PIXI__TEST__RECTANGLE");

  await expect(graphic).toBeVisible();

  const graphicCords = await graphic.boundingBox();

  expect(graphicCords?.x).toBe(0);
  expect(graphicCords?.y).toBe(0);

  page.keyboard.press("Tab");

  page.keyboard.press("Enter");

  page.keyboard.press("ArrowRight");
  page.keyboard.press("ArrowRight");
  page.keyboard.press("ArrowRight");
  page.keyboard.press("ArrowRight");

  page.keyboard.press("ArrowDown");
  page.keyboard.press("ArrowDown");
  page.keyboard.press("ArrowDown");
  page.keyboard.press("ArrowDown");

  page.keyboard.press("ArrowLeft");
  page.keyboard.press("ArrowUp");  

  const graphicCords1 = await graphic.boundingBox();

  expect(graphicCords1?.x).toBe(30);
  expect(graphicCords1?.y).toBe(30);

  await expect(page).toHaveScreenshot("pixi.png");
});

