import { test, expect } from '@playwright/test'

test.describe.only('Various Mouse Actions Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test('DoubleClickTest', async ({ page }) => {
        await page.getByRole('button', { name: 'Copy Text' }).dblclick()
        // await page.locator('#field2').inputValue().then(value => {
        //     console.log(value)
        //     expect(value).toBe('Hello World!')
        // })
        await expect(page.locator('#field2')).toHaveValue('Hello World!')
        await page.locator('#field2').click({ button: 'right' })
        await page.waitForTimeout(2000)
    })

    test('01-Move to Element and Click Test', async ({ page }) => {
        await page.getByRole('button', { name: 'Point Me' }).hover()
        await page.getByRole('link', { name: 'Laptops' }).click()
    })

    test('02-Scroll to Element Test', async ({ page }) => {
        // await page.getByRole('cell').filter({ hasText: /^$/ }).first().scrollIntoViewIfNeeded()
        await page.mouse.wheel(0, 1200)
        await page.waitForTimeout(2000)
    })


})