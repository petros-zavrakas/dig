# Personen — the person directory

|                 |                                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| **Context**     | Intranet                                                                             |
| **Role**        | Trainingskoordinator:in (Training coordinator) — no other role reaches this page     |
| **Menu item**   | „Personen“ in the „Trainingskoordinator:in“ section                                  |
| **Page title**  | „Personen“ (in the header; no back arrow)                                            |
| **URL**         | `/training-coordinator/persons`                                                      |
| **Screenshots** | `screenshots/intranet/training-coordinator/06-persons--desktop.png`, `…--mobile.png` |

## Purpose

The neutral directory of every person (Person) the club holds data on: trainers,
Trainingspartner:innen, office staff, contacts. One row per person with the e-mail and the
linked user account (Benutzerkonto), if any. The name opens the person's file; „Person
anlegen“ creates a new one.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** weekly or less; mostly as the way into a person's file to link or unlink an
  account, or to check whether a person already exists before creating one.
- **Mode:** looking up one person by name. No data entry on this page.
- **Typical volume:** 50–200 persons, all loaded at once (no paging), ordered by last name.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Above the table

| Element               | Text                                                                       | When                    |
| --------------------- | -------------------------------------------------------------------------- | ----------------------- |
| Primary button (link) | „Person anlegen“ → `/training-coordinator/persons/new`                     | Always                  |
| Loading text          | „Lade ...“                                                                 | Before the first answer |
| Error alert (red)     | „Personen konnten nicht geladen werden. Bitte später erneut versuchen.“    | Load failed             |

### Filters

| Filter       | Type                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| Name search  | Text field without a visible label; placeholder (and accessible name) „Nach Name filtern“. Filters the „Name“ column (first and last name) as you type, case-insensitive, in the browser |

No other filters, no column menu.

### Table

No sorting controls (the order is the server's: by last name).

| Column  | Notes                                                                               |
| ------- | ----------------------------------------------------------------------------------- |
| Name    | „Vorname Nachname“, link (bold, underline on hover) to the person's file            |
| E-Mail  | The person's e-mail, or muted „—“                                                   |
| Konto   | Display name of the linked user account, or muted „—“                               |

All three columns are always shown.

### Empty state

„Keine Einträge.“ in place of the rows (no persons, or the search matches none).

## Behaviour the layout must keep

- The name search filters as you type.
- „Konto“ shows the account's display name, which may differ from the person's name.

## Observations on the current layout (input for layout proposals)

- At 1440 px the „Name“ column grows to the longest name (long test names push it past
  700 px), which pushes the „Konto“ column off the right edge: it is not visible at all in
  the desktop screenshot, only a sliver of its first characters. The column that tells the
  coordinator whether a person has an account is the one she cannot see.
- On mobile only the „Name“ column is visible; „E-Mail“ and „Konto“ are off-screen with no
  hint that the table scrolls sideways.
- The „Person anlegen“ button sits alone on its own row above the search field.
- The search field has no visible label, unlike the dog list's „Rufname“ field.
- Rows look identical whatever the person is (trainer, Trainingspartner:in, office, plain
  contact); nothing on the row says so. _A role or profile indicator would be new
  information, so only propose it as an optional addition._
