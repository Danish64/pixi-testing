import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('canvas').click({
    position: {
      x: 106,
      y: 389
    }
  });
});