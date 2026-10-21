import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "screenshots");

const INTRANET = "https://intranet.localhost";
const EXTRANET = "https://extranet.localhost";

// A screen is either a fixed path, or the first link on `from` whose href
// matches `link` — so detail pages need no hardcoded record ids.
type Screen =
  | { slug: string; path: string }
  | { slug: string; from: string; link: RegExp }
  | { slug: string; drawer: true };

type Role = {
  context: "intranet" | "extranet";
  role: string;
  email?: string;
  password?: string;
  screens: Screen[];
};

const ROLES: Role[] = [
  {
    context: "intranet",
    role: "signed-out",
    screens: [
      { slug: "login", path: "/login" },
      { slug: "reset-password", path: "/reset-password" },
      { slug: "set-password", path: "/set-password" },
    ],
  },
  {
    context: "intranet",
    role: "admin",
    email: "admin@example.com",
    password: "admin",
    screens: [
      { slug: "dashboard", path: "/" },
      { slug: "navigation-drawer", drawer: true },
      { slug: "accounts", path: "/admin/accounts" },
      { slug: "account-create", path: "/admin/accounts/new" },
      { slug: "account-detail", from: "/admin/accounts", link: /^\/admin\/accounts\/\d+$/ },
    ],
  },
  {
    context: "intranet",
    role: "training-coordinator",
    email: "coordinator@example.com",
    password: "coordinator",
    screens: [
      { slug: "dashboard", path: "/" },
      { slug: "navigation-drawer", drawer: true },
      { slug: "dogs", path: "/training-coordinator/dogs" },
      { slug: "dog-create", path: "/training-coordinator/dogs/new" },
      { slug: "dog-detail", from: "/training-coordinator/dogs", link: /^\/training-coordinator\/dogs\/\d+$/ },
      { slug: "persons", path: "/training-coordinator/persons" },
      { slug: "person-create", path: "/training-coordinator/persons/new" },
      { slug: "person-detail", from: "/training-coordinator/persons", link: /^\/training-coordinator\/persons\/\d+$/ },
      { slug: "trainer-create", path: "/training-coordinator/trainers/new" },
      { slug: "trainings", path: "/training-coordinator/trainings" },
      { slug: "training-detail", from: "/training-coordinator/trainings", link: /^\/training-coordinator\/trainings\/\d+/ },
      { slug: "tariffs", path: "/training-coordinator/tariffs" },
    ],
  },
  {
    context: "intranet",
    role: "treasurer",
    email: "treasurer@example.com",
    password: "treasurer",
    screens: [
      { slug: "dashboard", path: "/" },
      { slug: "navigation-drawer", drawer: true },
      { slug: "dogs", path: "/treasurer/dogs" },
      { slug: "dog-detail", from: "/treasurer/dogs", link: /^\/treasurer\/dogs\/\d+$/ },
      { slug: "trainings", path: "/treasurer/trainings" },
      { slug: "training-detail", from: "/treasurer/trainings", link: /^\/treasurer\/trainings\/\d+/ },
      { slug: "billable-trainings", path: "/treasurer/billable-trainings" },
      { slug: "club-billing-run-open", from: "/treasurer/billable-trainings", link: /^\/treasurer\/club-billing-runs\/\d+/ },
      { slug: "billed-club-billing-runs", path: "/treasurer/billed-club-billing-runs" },
      { slug: "club-billing-run-billed", from: "/treasurer/billed-club-billing-runs", link: /^\/treasurer\/club-billing-runs\/\d+/ },
      { slug: "trainer-open-trainings", path: "/treasurer/trainer-open-trainings" },
      { slug: "tariffs", path: "/treasurer/tariffs" },
    ],
  },
  {
    context: "intranet",
    role: "board",
    email: "board@example.com",
    password: "board",
    screens: [
      { slug: "dashboard", path: "/" },
      { slug: "navigation-drawer", drawer: true },
      { slug: "dogs", path: "/board/dogs" },
      { slug: "dog-detail", from: "/board/dogs", link: /^\/board\/dogs\/\d+$/ },
      { slug: "trainings", path: "/board/trainings" },
      { slug: "training-detail", from: "/board/trainings", link: /^\/board\/trainings\/\d+/ },
    ],
  },
  {
    context: "intranet",
    role: "coordinator-and-treasurer",
    email: "sabine.coordinator-treasurer@example.com",
    password: "sabine",
    screens: [
      { slug: "dashboard", path: "/" },
      { slug: "navigation-drawer", drawer: true },
    ],
  },
  {
    context: "extranet",
    role: "signed-out",
    screens: [
      { slug: "login", path: "/login" },
      { slug: "reset-password", path: "/reset-password" },
      { slug: "set-password", path: "/set-password" },
    ],
  },
  {
    context: "extranet",
    role: "trainer",
    email: "anna.trainer@example.com",
    password: "anna",
    screens: [
      { slug: "home", path: "/" },
      { slug: "navigation-drawer", drawer: true },
      { slug: "trainings", path: "/trainer/trainings" },
      { slug: "training-capture", path: "/trainer/trainings/new" },
      { slug: "training-detail", from: "/trainer/trainings", link: /^\/trainer\/trainings\/\d+/ },
      { slug: "dogs", path: "/trainer/dogs" },
      { slug: "dog-training-history", from: "/trainer/dogs", link: /^\/trainer\/dogs\/\d+\/trainings$/ },
      { slug: "open-trainings", path: "/trainer/open-trainings" },
      { slug: "billed-trainer-billing-runs", path: "/trainer/billed-trainer-billing-runs" },
      { slug: "trainer-billing-run", from: "/trainer/billed-trainer-billing-runs", link: /^\/trainer\/trainer-billing-runs\/\d+/ },
    ],
  },
  {
    context: "extranet",
    role: "training-partner",
    email: "petra.partner@example.com",
    password: "petra",
    screens: [
      { slug: "home", path: "/" },
      { slug: "navigation-drawer", drawer: true },
      { slug: "trainings", path: "/training-partner/trainings" },
      { slug: "training-capture", path: "/training-partner/trainings/new" },
      { slug: "training-detail", from: "/training-partner/trainings", link: /^\/training-partner\/trainings\/\d+/ },
      { slug: "dogs", path: "/training-partner/dogs" },
      { slug: "dog-training-history", from: "/training-partner/dogs", link: /^\/training-partner\/dogs\/\d+\/trainings$/ },
    ],
  },
  {
    context: "extranet",
    role: "trainer-and-training-partner",
    email: "jonas.trainer-partner@example.com",
    password: "jonas",
    screens: [
      { slug: "home", path: "/" },
      { slug: "navigation-drawer", drawer: true },
    ],
  },
];

// The TanStack Query devtools button is dev-only chrome, not part of the app.
const HIDE_DEV_TOOLS = ".tsqd-parent-container, [aria-label*='tanstack' i] { display: none !important; }";

async function settle(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(400);
}

async function signIn(page: Page, role: Role, baseURL: string): Promise<void> {
  await page.goto(new URL("/login", baseURL).toString());
  await page.getByLabel("E-Mail").fill(role.email!);
  await page.getByLabel("Passwort").fill(role.password!);
  await page.getByRole("button", { name: "Anmelden" }).click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
  await settle(page);
}

async function firstMatchingHref(page: Page, pattern: RegExp): Promise<string | null> {
  const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
  );
  return hrefs.find((href) => pattern.test(href.split("?")[0]) && !href.endsWith("/new")) ?? null;
}

for (const role of ROLES) {
  test(`${role.context} / ${role.role}`, async ({ page }, testInfo) => {
    const baseURL = role.context === "intranet" ? INTRANET : EXTRANET;
    const viewport = testInfo.project.name;
    const directory = join(OUTPUT_ROOT, role.context, role.role);
    mkdirSync(directory, { recursive: true });

    const goto = (path: string) => page.goto(new URL(path, baseURL).toString());

    if (role.email) {
      await signIn(page, role, baseURL);
    }

    const manifest: Array<Record<string, string | null>> = [];

    for (const [index, screen] of role.screens.entries()) {
      const file = `${String(index + 1).padStart(2, "0")}-${screen.slug}--${viewport}.png`;

      if ("drawer" in screen) {
        await page.getByRole("button", { name: "Navigation öffnen" }).click();
        await page.getByRole("dialog", { name: "Navigation" }).waitFor();
        await page.waitForTimeout(400);
        await page.screenshot({ path: join(directory, file), style: HIDE_DEV_TOOLS });
        await page.keyboard.press("Escape");
        await page.getByRole("dialog", { name: "Navigation" }).waitFor({ state: "hidden" });
        manifest.push({ slug: screen.slug, file, url: page.url(), heading: "Navigation (drawer open)" });
        continue;
      }

      let path: string;
      if ("path" in screen) {
        path = screen.path;
      } else {
        await goto(screen.from);
        await settle(page);
        const href = await firstMatchingHref(page, screen.link);
        if (!href) {
          manifest.push({ slug: screen.slug, file: null, url: null, heading: `SKIPPED: no link matching ${screen.link} on ${screen.from}` });
          continue;
        }
        path = href;
      }

      await goto(path);
      await settle(page);
      await page.screenshot({ path: join(directory, file), fullPage: true, style: HIDE_DEV_TOOLS });
      const heading = await page.locator("h1").first().textContent({ timeout: 2_000 }).catch(() => null);
      manifest.push({ slug: screen.slug, file, url: new URL(page.url()).pathname + new URL(page.url()).search, heading });
    }

    writeFileSync(join(directory, `manifest--${viewport}.json`), JSON.stringify(manifest, null, 2) + "\n");
  });
}
