import { test, expect } from '@playwright/test'

test.describe('Various Alerts Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test('SimpleAlert Test', async ({ page }) => {
        page.on('dialog', async (alertBox) => {
            const alertText = alertBox.message()
            expect(alertText).toBe('I am an alert box!')
            await alertBox.accept()
        })
        await page.getByRole('button', { name: 'Simple Alert' }).click()
    })


})