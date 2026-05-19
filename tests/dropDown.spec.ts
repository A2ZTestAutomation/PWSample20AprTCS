import { test, expect } from '@playwright/test'

test.describe.configure({ mode: "parallel" })
test.describe.only('Dropdown Tests', { tag: "@InSprint @RegressionTest" }, () => {
    test.use({
        viewport: { height: 800, width: 600 },

    })
    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })
    test('Single Select Dropdown Test', async ({ page }) => {
        const singSel = page.locator('#country')
        singSel.scrollIntoViewIfNeeded()
        await singSel.selectOption({ index: 9 })
        await page.waitForTimeout(2000)
        expect(await singSel.inputValue()).toBe('india')

        //Using callback and checking the options
        await page.selectOption('#country', { label: 'Germany' }).then((dropdownValue) => {
            expect(dropdownValue).toEqual(['germany'])
        })
    })

    test('Multi Select Dropdown Test', async ({ page }) => {
        const mulSel = page.locator('#animals')
        mulSel.scrollIntoViewIfNeeded()
        await mulSel.selectOption(
            [{ label: 'Cheetah' },
            { index: 4 },
            { value: 'lion' }
            ]).then((dropdownValues) => {

                expect(dropdownValues).toEqual(['cheetah', 'elephant', 'lion'])
                for (const selValue of dropdownValues) {
                    console.log(selValue)
                }
            })

        console.log(await mulSel.allTextContents())
        await expect(mulSel).toHaveValues(['cheetah', 'elephant', 'lion'])
        await page.waitForTimeout(2000)

    })

})