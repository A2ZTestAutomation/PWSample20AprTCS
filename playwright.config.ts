import { defineConfig, devices } from '@playwright/test';

export const STORAGE_STATE = 'auth/user.json'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  // timeout: 60000,
  // expect: { timeout: 20000 },


  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // retries: 3,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ["allure-playwright"]],

  // grepInvert: /SmokeTest/,
  // grep: /@InSprint | @RegressionTest/,


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://restful-booker.herokuapp.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on',
    headless: false,

    // locale: 'en-US',
    // permissions: ['geolocation'],
    // geolocation: { longitude: -81.515755, latitude: 27.664827, accuracy: 100 }



  },




  /* Configure projects for major browsers */
  projects: [

    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts'
    // },
    // {
    //   name: 'Item Search',
    //   testMatch: '**/*itemSearch.spec.ts',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //     // viewport: { width: 1080, height: 720 },
    //   },
    // },

    // {
    //   name: 'ItemSearch',
    //   testMatch: '**/*itemSearch.spec.ts',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //   },
    // },
    // {
    //   name: 'AddItem',
    //   testMatch: '**/*addItem.spec.ts',
    //   dependencies: ['ItemSearch'],
    //   teardown: 'LogoutApp',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //   },
    // },
    // {
    //   name: 'LogoutApp',
    //   testMatch: '**/*.teardown.ts',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //   },
    // },


    // {
    //   name: 'chromium',
    //   teardown: 'LogoutApp',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //   },

    // },


    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },


    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'MobileChrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
