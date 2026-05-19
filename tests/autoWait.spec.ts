import { test, expect } from '@playwright/test'

test.describe('Autowait Test....', () => {
    test.beforeAll(async () => {
        // test.setTimeout(60000);
    })


    test('Auto Wait', async ({ page }) => {
        // test.setTimeout(60000)
        test.setTimeout(20000)
        await page.goto('http://uitestingplayground.com/ajax')
        await page.locator('#ajaxButton').click({ timeout: 10000 })

        const txtElem = page.locator('.bg-success')
        const txtMsg = await txtElem.textContent({ timeout: 20000 })
        // console.log(txtMsg)
        await expect(txtElem).toHaveText('Data loaded with AJAX get request.')

        // expect(await txtElem.textContent()).toContain('Data loaded with AJAX get request.')
        expect(txtMsg).toBe('Data loaded with AJAX get request.')

        // await expect(txtElem).toHaveText('Data loaded with AJAX get request.')
        await page.waitForTimeout(2000)
    })

    test('Waiting for Network response', async ({ page }) => {
        test.setTimeout(25000)
        await page.goto('http://uitestingplayground.com/')

        await page.getByRole('link', { name: 'Load Delay' }).click()
        // await page.waitForResponse('http://uitestingplayground.com/loaddelay')
        page.waitForLoadState('domcontentloaded')
        await page.getByRole('button').click()

        //waiting for particular response
        //  await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
        //Wait for all network calls to complete
        // await page.waitForLoadState("networkidle") // Not recommended

    })

})