import { test, expect } from '@playwright/test'

// test.use({ viewport: { width: 1100, height: 900 } })
test('Visual Test ', async ({ page }) => {

    await page.goto('https://www.example.com/')

    await expect(page).toHaveScreenshot()
})
