import { test, expect } from '@playwright/test'
import { users } from '../testData/users.json'

test('Demoblaze Valid Login Test', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
    await page.getByRole('link', { name: 'Log in' }).click();
    page.waitForLoadState()
    // page.waitForTimeout(5000)
    await page.fill('input#loginusername', 'Anandhi')
    await page.fill('input#loginpassword', 'Anandhi')
    const loginBtn = await page.locator('button.btn.btn-primary', { hasText: 'Log in' })
    await loginBtn.click()
    await expect(page.getByRole('link', { name: 'Welcome' })).toBeVisible();

    // await page.getByText('Samsung galaxy s7', { exact: true }).click()

    // await page.getByText(`${users[3].username}`, { exact: true }).click()
})