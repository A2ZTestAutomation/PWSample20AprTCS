import { test, expect } from '@playwright/test'

test.describe('WebTable Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables')
    })

    test('Getting count of rows and columns', async ({ page }) => {
        const tableRows = await page.locator('table#table1 tbody tr').all()
        // const rowsCount = tableRows.all()
        console.log('No. of Rows....', tableRows.length)

        //Included for CR005


        expect(tableRows.length).toEqual(4)
        tableRows.forEach(async (rows) => {
            console.log('No. of columns...', await rows.locator('td').count())
        })
    })

    test('To get data from a row', async ({ page }) => {
        const table1 = page.locator('table#table1 tbody')
        const firstRow = await table1.locator('tr').nth(1).allTextContents()
        firstRow.forEach((txt) => {
            console.log(txt)
        })
    })

    test('To get details of an user', async ({ page }) => {
        const table1 = page.locator('table#table1 tbody')
        // const rowData = table1.filter({ hasText: 'Jason' })
        const rowData = table1.getByRole('row', { name: 'Jason' })
        const txts = await rowData.evaluateAll(cols =>
            cols.map(element => element.textContent));
        console.log('All Column values...', txts)
    })

})