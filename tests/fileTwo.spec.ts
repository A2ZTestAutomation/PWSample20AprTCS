import { test, expect } from '@playwright/test'

test.describe('WebTable Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables')
    })
})