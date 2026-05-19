import { test, expect } from '@playwright/test'

test('Assertions test.....', { tag: "@SmokeTest" }, async ({ page }) => {
    const value = 10
    expect(value).toBeGreaterThan(5)

    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveURL(/blogspot/)
    await expect(page).toHaveTitle(/Testing/)
    await expect(page).not.toHaveTitle(/Playwright/)

    // await expect(page.locator('h6')).toBeVisible()
    // If it fails, will not execute remaining steps
    //To continue with, use soft assert
    await expect.soft(page.locator('h6')).toBeVisible()
    const pageHeading = page.locator('h1')
    await expect(pageHeading).toBeVisible()
    console.log('PageHeader TExt....', await pageHeading.textContent())
    await expect(pageHeading).toContainText('Automation Testing Practice')

    // await expect(page.locator('h6')).toBeVisible()


})