import { test, expect } from '@playwright/test';

test('home page renders hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Tecnologia');
  await expect(page.locator('h1')).toContainText('móveis');
});

test('home has nav with all links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="/servicos"]')).toBeVisible();
  await expect(page.locator('nav a[href="/sobre"]')).toBeVisible();
  await expect(page.locator('nav a[href="/cases"]')).toBeVisible();
  await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
  await expect(page.locator('nav a[href="/contato"]')).toBeVisible();
});

test('home has 8 service rows', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('a[href^="/servicos/"]');
  await expect(rows).toHaveCount(8);
});

test('home has numbers bar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('+200')).toBeVisible();
  await expect(page.getByText('3.8×')).toBeVisible();
});

test('home CTA links to contato', async ({ page }) => {
  await page.goto('/');
  const cta = page.locator('a[href="/contato"]').last();
  await expect(cta).toBeVisible();
});
