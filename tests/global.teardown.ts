import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
})

test('Logout from DemoBlaze ', async ({ page }) => {
    await page.waitForTimeout(3000)

    const logoutLink = page.getByRole('link', { name: 'Log out' })
    await expect(logoutLink).toBeVisible()
    await logoutLink.click()
    await page.waitForTimeout(5000)
})

