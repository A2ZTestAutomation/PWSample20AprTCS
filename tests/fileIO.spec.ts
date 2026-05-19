import { test, expect } from '@playwright/test'

const filePath1 = './screenshots/viewpage.png'
const filePath2 = './screenshots/fullpage.png'

test('File Upload Test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload')
    // Method 1
    // await page.setInputFiles('input#file-upload', filePath1)
    // await page.getByRole('button', { name: 'Upload' }).click()
    // await page.waitForTimeout(3000)
    // await expect(page.getByText('viewpage.png')).toBeVisible()

    // Method 2
    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.locator('input#file-upload').click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(filePath2)
    await page.getByRole('button', { name: 'Upload' }).click()
    await expect(page.getByText('fullpage.png')).toBeVisible()

})

test('File Download Test', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/download')
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'test_upload.txt' }).click()
    ])
    await download.saveAs('./downloadedFiles/test_upload.txt')
    console.log('File downloaded path.....' + await download.path())
})