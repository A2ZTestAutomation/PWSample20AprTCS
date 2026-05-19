import { chromium, test, expect } from '@playwright/test';

test('Launch Context Test', async () => {
    const browser = await chromium.launch({
        headless: false
    })
    const contextOne = await browser.newContext()
    const pageOne = await contextOne.newPage()
    await pageOne.setViewportSize({ width: 1080, height: 720 })
    await pageOne.waitForTimeout(2000)
    await pageOne.goto('https://jqueryui.com/autocomplete/')
    contextOne.close()

    const contextTwo = await browser.newContext()
    const pageTwo = await contextTwo.newPage()
    await pageTwo.setViewportSize({ width: 980, height: 600 })
    await pageTwo.goto('https://automationbookstore.dev/')
    await pageTwo.waitForTimeout(2000)

    const pageThree = await contextTwo.newPage()
    await pageThree.setViewportSize({ width: 800, height: 500 })
    await pageThree.goto('https://demo.playwright.dev/todomvc/#/')
    await pageThree.waitForTimeout(2000)


})