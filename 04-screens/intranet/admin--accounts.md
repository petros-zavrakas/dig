# Konten

|                 |                                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                      |
| **Role**        | Administrator:in                                                              |
| **Menu item**   | „Konten“ in the „Administrator:in“ section                                    |
| **Page title**  | „Konten“                                                                      |
| **URL**         | `/admin/accounts`                                                             |
| **Screenshots** | `screenshots/intranet/admin/03-accounts--desktop.png`, `…--mobile.png`        |

## Purpose

The list of every **account** (the login: e-mail, display name, roles, status), for both
the Intranet and the Extranet — every account is created here. From it the Administrator:in
opens an account to edit its roles, lock it, re-send an invitation or start a password
reset, and creates new accounts.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** occasional — when someone joins, leaves, or forgets a password. A few times
  a month.
- **Mode:** finding one account (by name), then opening it. Little scanning.
- **Typical volume:** tens of accounts (the seed data has 14; a real club perhaps 50–150:
  trainers, training partners and office staff). No paging.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Above the table

| Element        | Text                                                                      | When          |
| -------------- | ------------------------------------------------------------------------- | ------------- |
| Button (link)  | „Konto anlegen“ → `/admin/accounts/new`                                   | Always        |
| Loading text   | „Lade ...“                                                                | Before the first answer |
| Error alert    | „Konten konnten nicht geladen werden. Bitte später erneut versuchen.“     | Load failed   |

### Filter

| Filter                        | Type                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| „Nach Anzeigename filtern“    | Text box (placeholder, also its accessible name); filters the rows by display name as you type, in the browser |

### Table

No column can be hidden, no column is sortable, no paging. Rows come from the server
already ordered by display name.

| Column         | Shown by default | Can be hidden | Notes                                                                                                   |
| -------------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| Anzeigename    | yes              | no            | Link to the account page                                                                                |
| E-Mail         | yes              | no            | The login name                                                                                          |
| Rollen         | yes              | no            | Comma-separated role labels: „Trainer:in“, „Trainingspartner:in“, „Trainingskoordinator:in“, „Kassenwart:in“, „Vorstand“, „Administrator:in“, „Bewerber:in“ |
| Person         | yes              | no            | Linked person's first and last name as **plain text** (not a link — the Administrator:in may not be allowed to open the person); „—“ when none |
| Status         | yes              | no            | Badge „Aktiv“ (neutral) or „Gesperrt“ (red)                                                             |
| Erstpasswort   | yes              | no            | Badge „Wartet auf Erstpasswort“ (outlined) while no password has been set; otherwise „—“                |

### Empty state

- „Keine Einträge.“ in a single table row — when no account exists or the filter matches none.

## Behaviour the layout must keep

- „Status“ and „Erstpasswort“ are independent: an account can be „Gesperrt“ **and**
  „Wartet auf Erstpasswort“ at once, so both badges must be able to show together.
- The name filter narrows only by display name.
- „Person“ must not become a link.

## Observations on the current layout (input for layout proposals)

- **Columns are cut off at 1440 px.** The table fills the 1088 px page column and
  „Status“ and „Erstpasswort“ are entirely off-screen to the right; even „Person“ is cut
  („Jonas Trainer-Partr…“). The two status columns — the ones that need attention — are the
  ones nobody sees without horizontal scrolling.
- **Mobile (390 px):** only „Anzeigename“ is visible; every other column is behind a
  horizontal scroll with no visual cue that more columns exist.
- Long values push widths: an E2E test record („E2E Beitritt Partnerin-16596-…“ with a
  40-character e-mail) widens two columns; real names and multi-role lists
  („Trainingskoordinator:in, Kassenwart:in“) are similarly long.
- „Konto anlegen“ sits alone on its own row, right-aligned, above a filter box on the left —
  two rows of chrome for two controls.
- The display name and the linked person's name are usually identical, so the „Person“
  column mostly repeats the first column; the eye cannot spot the accounts **without** a
  person („—“) quickly.
- No visual difference between Intranet staff accounts and Extranet accounts (roles are
  plain comma text).
