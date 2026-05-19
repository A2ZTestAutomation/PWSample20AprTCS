import { expect } from '@playwright/test'
import { test } from './paramData'
import { users } from '../testData/users.json'

test.only('Valid Login Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').fill(process.env.USERNAME);
    await page.locator('[data-test="username"]').fill(users[2].username)
    // await page.locator('[data-test="password"]').fill(process.env.PASSWORD);
    await page.locator('[data-test="password"]').fill(users[2].password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
})


const usernames = ['standard_user', 'visual_user']
for (const username of usernames) {
    test(`Valid Login with ${username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill(username);
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })
}


test('Parameterize Project - Valid Login', async ({ page, username }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
})

users.forEach((user, index) => {
    test(`Login into App with User${index + 1} and name is ${user.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill(user.username);
        await page.locator('[data-test="password"]').fill(user.password);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })
})


