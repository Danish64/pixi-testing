// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  viewport: { width: 1920, height: 1080 },
});

const graphicCords1 = {x: 0, y: 0};
const graphicCords2 = {x: 80, y: 80};
const graphicCords3 = {x: 160, y: 160};

const selectMoveAndTestElement = async (page, testId, testCords) => {

  const graphic = page.getByTitle(testId);

  await expect(graphic).toBeVisible();

  let graphicCords = await graphic.boundingBox();

  expect(graphicCords?.x).toBe(testCords.x);
  expect(graphicCords?.y).toBe(testCords.y);

  page.keyboard.press("Tab");

  // Select the element
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

  graphicCords = await graphic.boundingBox();

  expect(graphicCords?.x).toBe(testCords.x + 30);
  expect(graphicCords?.y).toBe(testCords.y + 30);

  // Unselect the element
  page.keyboard.press("Enter");
}



test('pixi test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.waitForTimeout(2000);

  await expect(page).toHaveTitle("Pixi Testing");

  const canvas = page.locator("data-testid=canvas");

  await expect(canvas).toBeVisible();

  page.keyboard.press("Tab");

  await selectMoveAndTestElement(page, "PIXI__TEST__RECTANGLE_1", graphicCords1);

  await selectMoveAndTestElement(page, "PIXI__TEST__RECTANGLE_2", graphicCords2);

  await selectMoveAndTestElement(page, "PIXI__TEST__RECTANGLE_3", graphicCords3);
  
  // await expect(page).toHaveScreenshot("pixi.png");
});

