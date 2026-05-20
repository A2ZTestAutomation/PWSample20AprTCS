import { test, expect } from '@playwright/test'

test.describe('Screenshot Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test('SampleScreenshot   Test', async ({ page }) => {
        await page.screenshot({ path: './screenshots/fullpage.png', fullPage: true })
        await page.screenshot({ path: './screenshots/viewpage.png' })
        await page.locator('#colors').screenshot({ path: './screenshots/element.png' })

        const shadowDom = await page.locator('span#shadow_content').textContent()
        console.log('Shadow DOM text is.....' + shadowDom)
        //Included for CR005
        expect(shadowDom).toEqual('Mobiles')
    })


    test.use({
        locale: 'en-US',
        permissions: ['geolocation'],
        geolocation: { longitude: -81.515755, latitude: 27.664827, accuracy: 100 },
    })
    test('Geolocation Test', async ({ page }) => {
        await page.goto('https://my-location.org/')
        await page.waitForTimeout(5000)
        await expect(page.locator('#address')).toContainText('FL 33825, United States')
    })

})