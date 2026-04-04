import { test, expect } from '@playwright/test';

test('contact page loads', async ({ page }) => {
  await page.goto('/contato');
  await expect(page.locator('h1')).toContainText('Vamos transformar');
});

test('contact form has all required fields', async ({ page }) => {
  await page.goto('/contato');
  await expect(page.locator('input[name="nome"]')).toBeVisible();
  await expect(page.locator('input[name="loja"]')).toBeVisible();
  await expect(page.locator('input[name="cidade"]')).toBeVisible();
  await expect(page.locator('input[name="whatsapp"]')).toBeVisible();
  await expect(page.locator('select[name="desafio"]')).toBeVisible();
});

test('contact form submit button is present', async ({ page }) => {
  await page.goto('/contato');
  await expect(page.locator('button[type="submit"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toContainText('Agendar');
});
