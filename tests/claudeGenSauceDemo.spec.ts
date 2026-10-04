import { test, expect } from '@playwright/test';

// Reusable login helper
async function login(page: any) {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

// Reusable helper: add item and proceed to checkout
async function addItemAndGoToCheckout(page: any) {
    await page.locator('.inventory_item').first().locator('button').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
}

test.describe('Swag Labs - Checkout', () => {

    test.beforeEach(async ({ page }) => {
        await login(page);
    });

    test('should proceed to checkout from cart', async ({ page }) => {
        // Add item and go to cart
        await page.locator('.inventory_item').first().locator('button').click();
        await page.locator('.shopping_cart_link').click();

        // Click Checkout
        await page.locator('#checkout').click();

        // Should be on checkout step one
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    });

    test('should show error when checkout form fields are empty', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        // Click Continue without filling form
        await page.locator('#continue').click();

        // Error should appear
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    });

    test('should show error when last name is missing', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        await page.locator('#first-name').fill('John');
        await page.locator('#postal-code').fill('12345');
        await page.locator('#continue').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
    });

    test('should show error when postal code is missing', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        await page.locator('#first-name').fill('John');
        await page.locator('#last-name').fill('Doe');
        await page.locator('#continue').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
    });

    test('should complete full checkout flow successfully', async ({ page }) => {
        // Add item to cart
        await page.locator('.inventory_item').first().locator('button').click();
        const itemName = await page.locator('.inventory_item_name').first().innerText();

        // Go to cart and checkout
        await page.locator('.shopping_cart_link').click();
        await page.locator('#checkout').click();

        // Step 1: Fill in checkout information
        await page.locator('#first-name').fill('John');
        await page.locator('#last-name').fill('Doe');
        await page.locator('#postal-code').fill('12345');
        await page.locator('#continue').click();

        // Step 2: Verify order summary page
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(page.locator('.title')).toHaveText('Checkout: Overview');
        await expect(page.locator('.inventory_item_name')).toHaveText(itemName);

        // Verify price summary sections are visible
        await expect(page.locator('.summary_subtotal_label')).toBeVisible();
        await expect(page.locator('.summary_tax_label')).toBeVisible();
        await expect(page.locator('.summary_total_label')).toBeVisible();

        // Step 3: Finish order
        await page.locator('#finish').click();

        // Assert order confirmation
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
        await expect(page.locator('.pony_express')).toBeVisible();
    });

    test('should verify total price includes tax on checkout overview', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        // Fill checkout form
        await page.locator('#first-name').fill('Jane');
        await page.locator('#last-name').fill('Smith');
        await page.locator('#postal-code').fill('98765');
        await page.locator('#continue').click();

        // Extract subtotal, tax, and total values
        const subtotalText = await page.locator('.summary_subtotal_label').innerText();
        const taxText = await page.locator('.summary_tax_label').innerText();
        const totalText = await page.locator('.summary_total_label').innerText();

        const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
        const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
        const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));

        // Verify total = subtotal + tax
        expect(total).toBeCloseTo(subtotal + tax, 2);
    });

    test('should cancel checkout and return to cart', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        // Click Cancel on step one
        await page.locator('#cancel').click();

        // Should return to cart page
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('should cancel checkout overview and return to inventory', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        // Fill form and go to step 2
        await page.locator('#first-name').fill('John');
        await page.locator('#last-name').fill('Doe');
        await page.locator('#postal-code').fill('12345');
        await page.locator('#continue').click();

        // Cancel from the overview page
        await page.locator('#cancel').click();

        // Should return to inventory
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should go back to products after order completion', async ({ page }) => {
        await addItemAndGoToCheckout(page);

        // Complete checkout
        await page.locator('#first-name').fill('John');
        await page.locator('#last-name').fill('Doe');
        await page.locator('#postal-code').fill('12345');
        await page.locator('#continue').click();
        await page.locator('#finish').click();

        // Verify confirmation page
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

        // Click Back Home
        await page.locator('#back-to-products').click();

        // Should return to inventory
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');

        // Cart should be empty
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

});