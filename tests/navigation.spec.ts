import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: /Moveis\.pro/ },
  { path: '/servicos', title: /Serviços/ },
  { path: '/sobre', title: /Sobre/ },
  { path: '/cases', title: /Cases/ },
  { path: '/blog', title: /Blog/ },
  { path: '/contato', title: /Contato/ },
];

for (const { path, title } of pages) {
  test(`${path} loads with correct title`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
  });
}

test('nav CTA links to /contato', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/contato"]');
  await expect(page).toHaveURL('/contato');
});
