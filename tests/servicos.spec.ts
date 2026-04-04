import { test, expect } from '@playwright/test';

test('services listing page loads', async ({ page }) => {
  await page.goto('/servicos');
  await expect(page.locator('h1')).toContainText('Tecnologia completa');
});

test('services listing has 8 cards', async ({ page }) => {
  await page.goto('/servicos');
  const cards = page.locator('a[href^="/servicos/"]');
  await expect(cards).toHaveCount(8);
});

test('individual service page loads', async ({ page }) => {
  await page.goto('/servicos/crm-automatizado');
  await expect(page.locator('h1')).toContainText('CRM Automatizado');
});

test('individual service has back link', async ({ page }) => {
  await page.goto('/servicos/visualizacao-3d');
  await expect(page.locator('a[href="/servicos"]')).toBeVisible();
});
