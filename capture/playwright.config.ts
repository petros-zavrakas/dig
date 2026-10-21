import { defineConfig } from "@playwright/test";

// Screenshot capture for the design brief — not a test suite. Run from this
// directory against the live Docker stack:
//
//   npx playwright test                    # every role, both viewports
//   npx playwright test --project=desktop  # desktop only
//   npx playwright test -g treasurer       # one role
//   TRAINER_PROFILE_ID=983 npx playwright test --project=states   # interactive states
//
// Output: ../screenshots/<context>/<role>/<NN-screen>--<viewport>.png and one
// manifest per role (../screenshots/<context>/<role>/manifest.json).
export default defineConfig({
  testDir: ".",
  timeout: 10 * 60_000,
  fullyParallel: true,
  workers: 4,
  reporter: "list",
  use: {
    ignoreHTTPSErrors: true,
    locale: "de-DE",
    timezoneId: "Europe/Berlin",
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },
  projects: [
    {
      name: "desktop",
      testMatch: "capture.spec.ts",
      use: { browserName: "chromium", viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      testMatch: "capture.spec.ts",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      // Dialogs, edit modes, validation and created records. Runs once and shoots
      // both widths itself. CREATES data: see states.spec.ts.
      name: "states",
      testMatch: "states.spec.ts",
      use: { browserName: "chromium", viewport: { width: 1440, height: 900 } },
    },
  ],
});
