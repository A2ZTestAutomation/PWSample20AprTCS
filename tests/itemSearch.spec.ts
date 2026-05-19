import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
})

test('Search Item ', async ({ page }) => {
    await page.waitForTimeout(10000)

    const item = page.getByRole('link', { name: 'Samsung galaxy s6' })
    await expect(item).toBeVisible()
    // await item.click()
})

