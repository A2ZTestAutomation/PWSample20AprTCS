import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('L');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Learn Playwright');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Start with basics');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Do samples');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByText('Learn Playwright').click();
    await page.getByText('Learn Playwright').click();
    await page.getByText('Learn Playwright').click();
    await expect(page.locator('body')).toContainText('Learn Playwright');
    await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'Learn Playwright' }).getByLabel('Toggle Todo')).not.toBeChecked();
    await page.getByRole('listitem').filter({ hasText: 'Start with basics' }).getByLabel('Toggle Todo').check();
    await page.getByRole('listitem').filter({ hasText: 'Do samples' }).getByLabel('Toggle Todo').check();
    await page.getByRole('listitem').filter({ hasText: 'Learn Playwright' }).getByLabel('Toggle Todo').check();
    await expect(page.getByRole('listitem').filter({ hasText: 'Learn Playwright' }).getByLabel('Toggle Todo')).toBeChecked();
    await page.getByRole('listitem').filter({ hasText: 'Start with basics' }).getByLabel('Toggle Todo').uncheck();
    await page.getByRole('listitem').filter({ hasText: 'Do samples' }).getByLabel('Toggle Todo').uncheck();
    await page.getByRole('listitem').filter({ hasText: 'Learn Playwright' }).getByLabel('Toggle Todo').uncheck();
    await page.getByText('Learn Playwright').click();
});