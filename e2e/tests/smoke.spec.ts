import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    expect(page).toBeDefined();
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(500);
  });

  test('page has content', async ({ page }) => {
    await page.goto('/');
    const body = await page.locator('body');
    await expect(body).toBeVisible();
  });
});
