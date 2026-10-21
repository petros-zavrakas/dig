import { test, type Locator, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Interactive states the plain page walk in `capture.spec.ts` cannot reach: dialogs,
// edit modes, validation errors, and the pages that need a record created first.
// Runs once (desktop project) and shoots every state at both widths.
//
// NOTE: some steps CREATE data in the dev database — a club billing run, a trainer
// billing run and one captured training. Nothing is deleted or overwritten.
// Run it once: a second run adds trainings to the runs the first one created.

const OUTPUT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "screenshots");
const INTRANET = "https://intranet.localhost";
const EXTRANET = "https://extranet.localhost";
const HIDE_DEV_TOOLS = ".tsqd-parent-container, [aria-label*='tanstack' i] { display: none !important; }";
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

type Log = Array<{ slug: string; file: string | null; url: string | null; note: string }>;

class Shooter {
  readonly log: Log = [];
  private index = 0;

  constructor(
    private readonly page: Page,
    private readonly directory: string,
  ) {
    mkdirSync(directory, { recursive: true });
  }

  async shoot(slug: string, note: string, options: { fullPage?: boolean } = {}): Promise<void> {
    const prefix = `${String(++this.index).padStart(2, "0")}-${slug}`;
    for (const [name, size] of [["desktop", DESKTOP], ["mobile", MOBILE]] as const) {
      await this.page.setViewportSize(size);
      await this.page.waitForTimeout(400);
      await this.page.screenshot({
        path: join(this.directory, `${prefix}--${name}.png`),
        fullPage: options.fullPage ?? false,
        style: HIDE_DEV_TOOLS,
      });
    }
    await this.page.setViewportSize(DESKTOP);
    this.log.push({ slug, file: `${prefix}--{desktop,mobile}.png`, url: new URL(this.page.url()).pathname, note });
  }

  // One state; a failure is recorded and the walk goes on.
  async step(slug: string, action: () => Promise<void>): Promise<void> {
    try {
      await action();
    } catch (error) {
      this.log.push({ slug, file: null, url: null, note: `SKIPPED: ${String(error).split("\n").slice(0, 4).join(" ")}` });
      await this.page.keyboard.press("Escape").catch(() => {});
    }
  }

  write(): void {
    writeFileSync(join(this.directory, "manifest.json"), JSON.stringify(this.log, null, 2) + "\n");
  }
}

async function settle(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(400);
}

async function open(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await settle(page);
}

async function signIn(page: Page, baseURL: string, email: string, password: string): Promise<void> {
  await page.goto(`${baseURL}/login`);
  await page.getByLabel("E-Mail").fill(email);
  await page.getByLabel("Passwort").fill(password);
  await page.getByRole("button", { name: "Anmelden" }).click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
  await settle(page);
}

async function firstHref(page: Page, pattern: RegExp): Promise<string> {
  const hrefs = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href") ?? ""));
  const href = hrefs.find((h) => pattern.test(h.split("?")[0]) && !h.endsWith("/new"));
  if (!href) throw new Error(`no link matching ${pattern}`);
  return href;
}

async function firstEnabled(locator: Locator): Promise<Locator> {
  const count = await locator.count();
  for (let i = 0; i < count; i++) {
    if (await locator.nth(i).isEnabled()) return locator.nth(i);
  }
  throw new Error("no enabled element");
}

async function dialogThenCancel(page: Page, shooter: Shooter, slug: string, note: string): Promise<void> {
  await page.getByRole("dialog").or(page.getByRole("alertdialog")).first().waitFor();
  await shooter.shoot(slug, note);
  await page.keyboard.press("Escape");
}

test.describe.configure({ mode: "serial" });

test("intranet / treasurer", async ({ page }) => {
  const shooter = new Shooter(page, join(OUTPUT_ROOT, "intranet", "treasurer", "states"));
  await signIn(page, INTRANET, "treasurer@example.com", "treasurer");

  await shooter.step("user-menu-open", async () => {
    await page.getByRole("button", { name: "Renate Treasurer" }).click();
    await page.getByRole("menu").waitFor();
    await shooter.shoot("user-menu-open", "User menu dropdown open");
    await page.keyboard.press("Escape");
  });

  await shooter.step("billable-trainings-row-ticked", async () => {
    await open(page, `${INTRANET}/treasurer/billable-trainings`);
    const box = await firstEnabled(page.getByRole("checkbox", { name: /^Training vom/ }));
    await box.click();
    await shooter.shoot("billable-trainings-row-ticked", "One row ticked: other teams' checkboxes disabled, the team's run button enabled");
  });

  await shooter.step("club-billing-run-in-preparation", async () => {
    await (await firstEnabled(page.getByRole("button", { name: /^(Abrechnungs-Lauf anlegen|Zum Lauf hinzufügen) \(\d+\)$/ }))).click();
    await page.waitForURL(/\/treasurer\/club-billing-runs\/\d+/);
    await settle(page);
    await shooter.shoot("club-billing-run-in-preparation", "Run page, in preparation (created by this script)", { fullPage: true });
  });

  await shooter.step("club-billing-run-discard-dialog", async () => {
    await page.getByRole("button", { name: "Lauf verwerfen" }).click();
    await dialogThenCancel(page, shooter, "club-billing-run-discard-dialog", "„Lauf verwerfen“ confirmation (cancelled)");
  });

  await shooter.step("billable-trainings-with-run-strip", async () => {
    await open(page, `${INTRANET}/treasurer/billable-trainings`);
    await shooter.shoot("billable-trainings-with-run-strip", "„In Vorbereitung:“ strip of chips above the list");
  });

  await shooter.step("billable-trainings-columns-menu", async () => {
    await page.getByRole("button", { name: "Spalten" }).click();
    await page.getByRole("menu").waitFor();
    await shooter.shoot("billable-trainings-columns-menu", "„Spalten“ column menu open");
    await page.keyboard.press("Escape");
  });

  await shooter.step("billable-trainings-partner-filter-open", async () => {
    await page.getByRole("button", { name: /Trainingspartner:in/ }).first().click();
    await page.waitForTimeout(300);
    await shooter.shoot("billable-trainings-partner-filter-open", "„Trainingspartner:in“ typeahead filter open");
    await page.keyboard.press("Escape");
  });

  await shooter.step("trainings-edit-mode", async () => {
    await open(page, `${INTRANET}/treasurer/trainings`);
    await page.getByRole("button", { name: "Bearbeiten", exact: true }).first().click();
    await settle(page);
    await shooter.shoot("trainings-edit-mode", "Census list in billing edit mode („Bearbeiten“)");
  });

  shooter.write();
});

test("intranet / training-coordinator", async ({ page }) => {
  const shooter = new Shooter(page, join(OUTPUT_ROOT, "intranet", "training-coordinator", "states"));
  await signIn(page, INTRANET, "coordinator@example.com", "coordinator");

  await shooter.step("training-delete-dialog", async () => {
    await open(page, `${INTRANET}/training-coordinator/trainings`);
    await open(page, INTRANET + (await firstHref(page, /^\/training-coordinator\/trainings\/\d+$/)));
    await page.getByRole("button", { name: "Training löschen" }).click();
    await dialogThenCancel(page, shooter, "training-delete-dialog", "„Training löschen“ confirmation (cancelled)");
  });

  await shooter.step("dog-keeper-dialog", async () => {
    await open(page, `${INTRANET}/training-coordinator/dogs`);
    await open(page, INTRANET + (await firstHref(page, /^\/training-coordinator\/dogs\/\d+$/)));
    await page.getByRole("button", { name: /^(Wechseln|Zuordnen)$/ }).first().click();
    await dialogThenCancel(page, shooter, "dog-keeper-dialog", "Keeper dialog („Trainingspartner:in wechseln“ or „… zuordnen“), step 1 (cancelled)");
  });

  await shooter.step("dog-keeper-end-dialog", async () => {
    await page.getByRole("button", { name: "Beenden", exact: true }).click();
    await dialogThenCancel(page, shooter, "dog-keeper-end-dialog", "„Beenden“ keeper dialog (cancelled)");
  });

  await shooter.step("person-link-account-dialog", async () => {
    await open(page, `${INTRANET}/training-coordinator/persons`);
    const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
    for (const href of hrefs.filter((h) => /^\/training-coordinator\/persons\/\d+$/.test(h)).slice(0, 15)) {
      await open(page, INTRANET + href);
      const button = page.getByRole("button", { name: "Benutzerkonto zuordnen" });
      if (await button.count()) {
        await button.click();
        await dialogThenCancel(page, shooter, "person-link-account-dialog", "„Benutzerkonto zuordnen“ dialog (cancelled)");
        return;
      }
    }
    throw new Error("no person without an account among the first 15");
  });

  await shooter.step("trainer-detail", async () => {
    // The page is reached only after creating a trainer, so open the seeded Trainer:in's
    // profile directly. Its id is the trainer_profiles row id, passed in by the caller.
    const trainerId = process.env.TRAINER_PROFILE_ID;
    if (!trainerId) throw new Error("TRAINER_PROFILE_ID not set");
    await open(page, `${INTRANET}/training-coordinator/trainers/${trainerId}`);
    await shooter.shoot("trainer-detail", "„Trainer:in“ detail page (seeded Trainer:in)", { fullPage: true });
  });

  for (const [slug, path] of [
    ["dog-create-validation", "/training-coordinator/dogs/new"],
    ["person-create-validation", "/training-coordinator/persons/new"],
    ["trainer-create-validation", "/training-coordinator/trainers/new"],
  ] as const) {
    await shooter.step(slug, async () => {
      await open(page, INTRANET + path);
      await page.locator("form button[type=submit]").first().click();
      await settle(page);
      await shooter.shoot(slug, "Form submitted empty: validation messages", { fullPage: true });
    });
  }

  shooter.write();
});

test("intranet / admin", async ({ page }) => {
  const shooter = new Shooter(page, join(OUTPUT_ROOT, "intranet", "admin", "states"));
  await signIn(page, INTRANET, "admin@example.com", "admin");

  await shooter.step("account-edit-mode", async () => {
    await open(page, `${INTRANET}/admin/accounts`);
    await open(page, INTRANET + (await firstHref(page, /^\/admin\/accounts\/\d+$/)));
    await page.getByRole("button", { name: "Bearbeiten", exact: true }).click();
    await settle(page);
    await shooter.shoot("account-edit-mode", "Account detail in edit mode", { fullPage: true });
  });

  await shooter.step("account-create-validation", async () => {
    await open(page, `${INTRANET}/admin/accounts/new`);
    await page.locator("form button[type=submit]").first().click();
    await settle(page);
    await shooter.shoot("account-create-validation", "„Konto anlegen“ submitted empty", { fullPage: true });
  });

  shooter.write();
});

test("extranet / trainer", async ({ page }) => {
  const shooter = new Shooter(page, join(OUTPUT_ROOT, "extranet", "trainer", "states"));
  await signIn(page, EXTRANET, "anna.trainer@example.com", "anna");

  await shooter.step("training-capture-validation", async () => {
    await open(page, `${EXTRANET}/trainer/trainings/new`);
    await page.getByRole("button", { name: "Training speichern" }).click();
    await page.waitForTimeout(300);
    await shooter.shoot("training-capture-validation", "Capture form submitted empty: validation messages", { fullPage: true });
  });

  await shooter.step("training-capture-group", async () => {
    await page.getByLabel("Trainingsart").selectOption({ label: "Gruppentraining" });
    await page.waitForTimeout(300);
    await shooter.shoot("training-capture-group", "Capture form with „Gruppentraining“: multi-team picker", { fullPage: true });
  });

  await shooter.step("training-saved", async () => {
    await open(page, `${EXTRANET}/trainer/trainings/new`);
    await page.getByLabel("Dauer (Minuten)").fill("60");
    await page.getByLabel("Trainingsart").selectOption({ label: "Einzeltraining" });
    await page.locator("#teamPicker").click();
    await page.locator("[data-slot=command-item]").first().click();
    await page.getByLabel("keine Anfahrt").check();
    await page.getByRole("button", { name: "Training speichern" }).click();
    await page.waitForURL(/\/trainer\/trainings\/saved/);
    await settle(page);
    await shooter.shoot("training-saved", "„Training gespeichert“ confirmation (a real training was captured)");
  });

  await shooter.step("training-delete-dialog", async () => {
    await page.getByRole("link", { name: "Training ansehen" }).click();
    await settle(page);
    await page.getByRole("button", { name: "Training löschen" }).click();
    await dialogThenCancel(page, shooter, "training-delete-dialog", "„Training löschen“ confirmation (cancelled)");
  });

  await shooter.step("open-trainings-row-ticked", async () => {
    await open(page, `${EXTRANET}/trainer/open-trainings`);
    const box = await firstEnabled(page.getByRole("checkbox", { name: /Training vom|auswählen/ }));
    await box.click();
    await shooter.shoot("open-trainings-row-ticked", "One training ticked, run button enabled");
  });

  await shooter.step("trainer-billing-run-in-preparation", async () => {
    await page.getByRole("button", { name: /^(Eigenrechnungs-Lauf erstellen|Zum Rechnungslauf hinzufügen)$/ }).click();
    await page.waitForURL(/\/trainer\/trainer-billing-runs\/\d+/);
    await settle(page);
    await shooter.shoot("trainer-billing-run-in-preparation", "„Eigenrechnungs-Lauf“ in preparation (created by this script)", { fullPage: true });
  });

  await shooter.step("trainer-billing-run-discard-dialog", async () => {
    await page.getByRole("button", { name: "Lauf verwerfen" }).click();
    await dialogThenCancel(page, shooter, "trainer-billing-run-discard-dialog", "„Eigenrechnungs-Lauf verwerfen?“ (cancelled)");
  });

  await shooter.step("open-trainings-with-run-notice", async () => {
    await open(page, `${EXTRANET}/trainer/open-trainings`);
    await shooter.shoot("open-trainings-with-run-notice", "„Sie haben einen Eigenrechnungs-Lauf in Vorbereitung …“ notice");
  });

  shooter.write();
});

test("extranet / no-access", async ({ page }) => {
  const shooter = new Shooter(page, join(OUTPUT_ROOT, "extranet", "no-access", "states"));
  await shooter.step("no-access", async () => {
    // No seeded account lands here, so the session payload is rewritten in the
    // browser to an account with no Extranet role. Nothing is stored.
    await page.route("**/api/me", async (route) => {
      const response = await route.fetch();
      const account = await response.json();
      await route.fulfill({ response, json: { ...account, roles: [], landingpage: "extranet-no-access" } });
    });
    await signIn(page, EXTRANET, "anna.trainer@example.com", "anna");
    await open(page, `${EXTRANET}/no-access`);
    await shooter.shoot("no-access", "„Kein Zugriff“: an account with no Extranet role (session payload rewritten)");
  });
  shooter.write();
});
