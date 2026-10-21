# App shell — header, navigation drawer, user menu

|                 |                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet (the Extranet uses the same shared header; differences listed below)                                                                                                                     |
| **Role**        | Every signed-in role                                                                                                                                                                              |
| **Menu item**   | — (the shell carries the menu)                                                                                                                                                                    |
| **Page title**  | The current page's title, shown in the header                                                                                                                                                     |
| **URL**         | Every authenticated URL                                                                                                                                                                           |
| **Screenshots** | `screenshots/intranet/<role>/02-navigation-drawer--desktop.png`, `…--mobile.png` for `admin`, `training-coordinator`, `treasurer`, `board`, `coordinator-and-treasurer`; Extranet: `screenshots/extranet/<role>/02-navigation-drawer--…` for `trainer`, `training-partner`, `trainer-and-training-partner`<br>**States:** `screenshots/intranet/treasurer/states/01-user-menu-open--desktop.png` (each also `--mobile.png`) |
## Purpose

The frame around every signed-in page: a header bar with the page title, a drawer that
holds the whole navigation, and a user menu for signing out. The navigation is built from
the **roles** the account holds: one section per role, so a person holding several roles
(common in this club — the Administrator:in is often also the Trainingskoordinator:in or a
board member) sees each role's pages under its own heading. The same label can therefore
appear twice („Hunde“, „Trainings“, „Tarife“), told apart only by the section heading.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** on every page view. The drawer is opened at every change of area.
- **Mode:** navigation only.
- **Typical volume:** 1 entry („Übersicht“) plus 1–6 entries per role section; the largest
  real menu is a Trainingskoordinator:in who is also Kassenwart:in (11 entries, 2 headings),
  and a person can hold up to four Intranet roles (up to 15 entries, 4 headings).
- **Device:** Intranet mainly desktop; Extranet phone and desktop.

## Inventory (fixed — every element must stay)

### Header bar (sticky at the top, on every authenticated page)

| Element                  | Text / content                                                                         | When                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Menu button              | Icon only (hamburger); accessible name „Navigation öffnen“                            | Always                                                                       |
| Back arrow               | Icon only (arrow left); accessible name „Zurück“; links to the page's parent list      | Only on pages that declare a parent (detail and create pages, see list below) |
| Page title               | The route's title, e.g. „Übersicht“, „Konten“, „Konto anlegen“, „Konto“                 | Always; it is the page's only top-level heading                              |
| User menu trigger        | The account's display name („Anzeigename“) + chevron-down icon                        | Always, right-aligned                                                         |

Pages with a back arrow in the Intranet (title → target):
„Konto anlegen“, „Konto“ → „Konten“ · „Hund anlegen“, „Hund“ → „Hunde“ ·
„Trainer:in anlegen“, „Trainer:in“ → „Übersicht“ · „Person anlegen“, „Person“ → „Personen“ ·
„Training“ → „Trainings“ (each role's own list). Top-level pages (every drawer entry and
„Abrechnungs-Lauf“, which renders its own back link inside the page) have no arrow.

### User menu (dropdown, opened from the trigger)

| Element      | Text                                         | Notes                                   |
| ------------ | -------------------------------------------- | --------------------------------------- |
| Label        | The account's login e-mail                   | Not clickable                           |
| Menu item    | Logout icon + „Abmelden“                     | Ends the session and opens the login page; browser back does not return |

### Navigation drawer (slides in from the left, at every screen width)

| Element      | Text                                      | Notes                                         |
| ------------ | ----------------------------------------- | --------------------------------------------- |
| Drawer title | „Navigation“                              |                                               |
| Close button | Icon only (X); accessible name „Navigation schließen“ |                                    |
| Sections     | One heading-less first section, then one section per role held, each with an upper-case heading (the German role name) | Fixed order, never reshuffled |
| Entries      | Icon + label; the active entry is highlighted | Choosing an entry closes the drawer          |

#### Intranet menu tree per role

The first section is always present and has no heading:

- „Übersicht“ (dashboard icon) → `/`

Then, in this fixed order, one section for each role the account holds:

| Section heading („…“)        | Entries (icon) → URL                                                                                                                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Trainingskoordinator:in“    | „Hunde“ (dog) → `/training-coordinator/dogs` · „Personen“ (person card) → `/training-coordinator/persons` · „Trainings“ (clipboard) → `/training-coordinator/trainings` · „Tarife“ (euro) → `/training-coordinator/tariffs`                                                            |
| „Kassenwart:in“              | „Hunde“ (dog) → `/treasurer/dogs` · „Trainings“ (clipboard) → `/treasurer/trainings` · „Rechnungen“ (receipt) → `/treasurer/billable-trainings` · „Abgeschlossene Rechnungen“ (checked document) → `/treasurer/billed-club-billing-runs` · „Trainer-Abrechnung“ (hand with coins) → `/treasurer/trainer-open-trainings` · „Tarife“ (euro) → `/treasurer/tariffs` |
| „Vorstand“                   | „Hunde“ (dog) → `/board/dogs` · „Trainings“ (clipboard) → `/board/trainings`                                                                                                                                                                                                           |
| „Administrator:in“           | „Konten“ (people) → `/admin/accounts`                                                                                                                                                                                                                                                  |

Resulting drawers for the screenshot roles:

- **admin:** „Übersicht“ · ADMINISTRATOR:IN „Konten“
- **training-coordinator:** „Übersicht“ · TRAININGSKOORDINATOR:IN „Hunde“, „Personen“, „Trainings“, „Tarife“
- **treasurer:** „Übersicht“ · KASSENWART:IN „Hunde“, „Trainings“, „Rechnungen“, „Abgeschlossene Rechnungen“, „Trainer-Abrechnung“, „Tarife“
- **board:** „Übersicht“ · VORSTAND „Hunde“, „Trainings“
- **coordinator-and-treasurer:** „Übersicht“ · TRAININGSKOORDINATOR:IN (4 entries) · KASSENWART:IN (6 entries)

#### Extranet menu tree per role

First section, no heading: „Startseite“ (house icon) → `/`. Then:

| Section heading („…“)   | Entries (icon) → URL                                                                                                                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Trainer:in“            | „Meine Trainings“ (clipboard) → `/trainer/trainings` · „Hunde“ (dog) → `/trainer/dogs` · „Rechnung“ (receipt) → `/trainer/open-trainings` · „Abgeschlossene Rechnungen“ (checked document) → `/trainer/billed-trainer-billing-runs` |
| „Trainingspartner:in“   | „Meine Trainings“ (clipboard) → `/training-partner/trainings` · „Meine Hunde“ (dog) → `/training-partner/dogs`                                                                                                         |

A person holding both Extranet roles sees „Meine Trainings“ twice, under the two headings.

### Loading state (before the header exists)

- „Lade ...“ as plain muted text in the page column, while the session is being checked.
  No header is shown yet. Without a session the browser goes to the login page.

## Differences per context (Extranet shell)

The Extranet mounts the same shared header and drawer; only these differ:

- **Menu:** first entry „Startseite“ (house icon) instead of „Übersicht“; role sections
  „Trainer:in“ and „Trainingspartner:in“ (see above).
- **Page title can be dynamic:** the per-dog training history is titled
  „‹Rufname› — Trainings“, filled in once the data has loaded. Every Intranet title is static.
- **Back arrow target can vary:** when a link crosses from one area into another (for example
  from a dog's history into a training), the back arrow returns to where the person came from,
  not to the route's fixed parent. It only appears on pages that declare a parent.
- **„Kein Zugriff“ (`/no-access`)** is shown without the shell (no header, no drawer).
- The user menu is identical (e-mail label + „Abmelden“).

## Behaviour the layout must keep

- The navigation must be reachable from every authenticated page and in the same place
  regardless of how many roles the account holds. (It was moved into a drawer at every width
  because a horizontal bar wrapped into two rows for multi-role accounts.)
- Role sections are real named groups for screen readers; identical labels („Hunde“,
  „Trainings“, „Tarife“, „Meine Trainings“) must stay distinguishable by their section heading.
  Do not lengthen the labels.
- Section order is fixed: Trainingskoordinator:in, Kassenwart:in, Vorstand, Administrator:in
  (Extranet: Trainer:in, Trainingspartner:in). „Übersicht“/„Startseite“ is always first.
- The active entry is visibly marked. „Übersicht“/„Startseite“ is active only on `/` itself.
- Choosing an entry navigates and closes the drawer.
- The header title is the page's single top-level heading; pages do not repeat it.
- The header content lines up with the page column (same maximum width and side padding),
  so the content edge does not jump between pages.
- Signing out replaces the history entry, so browser back does not reopen a signed-in page.

## Observations on the current layout (input for layout proposals)

- **Navigation is always hidden.** At 1440 px the desktop shows only a small hamburger
  icon; every change of area costs two clicks, and there is no visible indication of which
  area one is in apart from the page title. On a wide desktop a permanent side navigation
  (collapsing to the drawer on narrow screens) would likely be more practical — but note the
  rule above that the navigation must not change shape with the number of roles.
- **The header is very sparse:** one 56 px bar with a 16 px title on the left and the display
  name on the right; there is no product name, logo or club identity anywhere in the app.
- **Page title is small (16 px, semibold)** and sits in the bar, while the first heading in
  the page (e.g. „Willkommen, …“ on the dashboard) is larger (24 px). The hierarchy is
  inverted.
- **Drawer:** a 288 px white sheet over a dimmed, blurred page. Role headings are small grey
  upper-case text with little separation; with two roles (coordinator-and-treasurer) the
  eleven entries look like one long list, and the two „Hunde“/„Trainings“/„Tarife“ pairs are
  easy to confuse. Only the active entry has a grey background; the rest are grey text.
- **Two „Rechnungen“-like entries** in the Kassenwart:in section („Rechnungen“,
  „Abgeschlossene Rechnungen“) plus „Trainer-Abrechnung“ — related billing pages with no
  visual grouping.
- **Mobile (390 px):** the bar holds hamburger, back arrow, title and the full display name;
  long display names (e.g. „Sabine Coordinator-Treasurer“) leave little room for the title
  („Konto anlegen“ already crowds it). The drawer takes about 75 % of the width, which is fine.
- The user menu trigger is plain grey text, easy to overlook as the only way to sign out.
