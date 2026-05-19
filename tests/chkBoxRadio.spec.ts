import { test, expect } from '@playwright/test'
// test.use(
//     {
//         screenshot: 'on',
//         trace: 'off'
//     }
// )
test.describe.only('Checkbox and Radio Button Tests', () => {
    // test.use({
    //     viewport: { height: 800, width: 600 }
    // })
    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test('Checkbox Test', {
        annotation: {
            type: 'issue',
            description: 'Producing flaky results, want to retry',
        },
    }, async ({ page }) => {
        await page.getByRole('checkbox', { name: 'Sunday' }).check()
        const mondayCheckbox = page.getByRole('checkbox', { name: 'Monday' })
        await mondayCheckbox.check()
        await page.getByRole('checkbox', { name: 'Tuesday' }).check()
        await expect(mondayCheckbox).toBeChecked()
        await mondayCheckbox.uncheck()
        await expect(mondayCheckbox).not.toBeChecked()
        //To make it fail
        await expect(mondayCheckbox).toBeChecked()
    })

    test('Radio Button Test', async ({ page }) => {
        // test.slow()
        const gender = page.getByLabel('Male', { exact: true })
        await expect(gender).not.toBeChecked()
        await gender.check()
        await expect(gender).toBeChecked()

    })


})


