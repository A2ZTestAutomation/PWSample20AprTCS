import { test, expect } from '@playwright/test'
test.use({
    viewport: { height: 800, width: 600 }
})
test.only('Sample Locator Test', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    const pwLink = page.getByRole('link', { name: 'PlaywrightPractice' })
    await pwLink.click()
    await expect(page).toHaveTitle(/PlaywrightPractice/)
    const inpBox = page.getByRole('textbox', { name: 'Username:' })
    await inpBox.fill('TestUser')
    await inpBox.focus()
    await page.keyboard.press('End')
    await inpBox.fill('TestAutomationUser')
    await inpBox.clear()
    await inpBox.pressSequentially('Test User', { delay: 500 })
    console.log(await inpBox.inputValue())
    // expect(await inpBox.inputValue()).toBe('TestUser')

    // // await page.getByRole('button', { name: 'START' }).click()
    // await page.getByText('START').click()
    // const newBtn = page.getByRole('button', { name: 'STOP' })
    // expect(await newBtn.textContent()).toBe('STOP')

    // await page.getByLabel('Email Address:').fill('user1@gmail.com')

    // await page.getByPlaceholder('Enter your full name').fill('Test User')

    // const toolTipTxt = await page.getByTitle('Tooltip text').textContent()
    // console.log('Tooltip Text: ', toolTipTxt)

})

test('Locators using Filters', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
    await page.waitForTimeout(10000)
    const itemsLink = page.locator('div.card-block')
    const itemsCount = await itemsLink.count()
    expect(itemsCount).toBe(9)

    await expect(itemsLink).toHaveCount(9)
    // console.log('Getting the text of all the items: ', await itemsLink.allTextContents())
    console.log('Getting the text of all the items: ', await itemsLink.allInnerTexts())
    //Method 1 : to get all text and select an item
    for (let i = 0; i < itemsCount; i++) {
        const itemText = await itemsLink.nth(i).textContent()
        // debugger
        console.log('Item Text: ', itemsLink.nth(i) + 'Eelement...' + itemText)
        if (itemText?.trim() === 'Samsung galaxy s8') {
            await itemsLink.nth(i).click()
            break
        }
    }
    await page.waitForTimeout(2000)
    //Method 2: To get all text and select an item
    const texts = await itemsLink.evaluateAll(list =>
        list.map(item => item.textContent)
    )
    console.log('All Texts: ', texts)
    await page.locator('div').filter({ hasText: 'Products Pic Title Price x' }).nth(1).click();
    await itemsLink.nth(0).click()
    await page.waitForTimeout(2000)

    //Method 3 : Using filter to select an item
    await itemsLink.filter({ hasText: 'Samsung galaxy s6' }).click()
    await page.waitForTimeout(2000)

    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible()
})
