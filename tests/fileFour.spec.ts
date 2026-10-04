import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
})

test('Test Scenrio added in Phase2 for CR010 ', async ({ page }) => {
    await page.waitForTimeout(10000)

    const item = page.getByRole('link', { name: 'Samsung galaxy s6' })
    await expect(item).toBeVisible()
    // await item.click()
})


test('Created test in Master for UAT Fix ', async ({ page }) => {
    await page.waitForTimeout(10000)

    const item = page.getByRole('link', { name: 'Samsung galaxy s6' })
    await expect(item).toBeVisible()
    // await item.click()
})

