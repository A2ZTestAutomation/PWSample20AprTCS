import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
})

test('Add Item ', async ({ page }) => {
    await page.waitForTimeout(3000)

    const item = page.getByRole('link', { name: 'Samsung galaxy s6' })
    await expect(item).toBeVisible()
    await item.click()
    // await page.waitForTimeout(3000)
    //Updated by Tester2
    await page.waitForTimeout(5000)
})
