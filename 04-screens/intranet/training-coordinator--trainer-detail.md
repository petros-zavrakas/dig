# Trainer:in — the trainer page

|                 |                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                          |
| **Role**        | Trainingskoordinator:in (Training coordinator)                                                    |
| **Menu item**   | none — reached only after „Trainer:in anlegen“ succeeds (there is no trainer list)                |
| **Page title**  | „Trainer:in“, with a back arrow (accessible name „Zurück“) to the dashboard `/`                   |
| **URL**         | `/training-coordinator/trainers/:id`                                                              |
| **Screenshots** | The seeded Trainer:in, opened directly: `screenshots/intranet/training-coordinator/states/05-trainer-detail--desktop.png` (each also `--mobile.png`) |
## Purpose

The confirmation page after creating a trainer: one read-only card with the person's master
data and the trainer profile's data. No actions.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare — seen once per created trainer.
- **Mode:** a glance to confirm what was saved.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Page states

| Element           | Text                                       | When                    |
| ----------------- | ------------------------------------------ | ----------------------- |
| Loading text      | „Lade ...“                                 | Before the first answer |
| Error alert (red) | „Trainer:in nicht gefunden.“               | Unknown id              |
| Error alert (red) | „Trainer:in konnte nicht geladen werden.“  | Any other load failure  |

### Card (one, read-only)

- Card title: „Vorname Nachname“.
- Always shown: „Status“ with a grey badge „Aktiv“ or „Archiviert“ (the trainer profile's
  status, not the person's).
- Person fields, only when filled in, in this order (label above value): „E-Mail“,
  „Straße“, „Postleitzahl“, „Ort“, „Telefon“, „Geburtsdatum“, „Bemerkung (Person)“.
- Profile fields, only when filled in: „Eintrittsdatum“, „Austrittsdatum“, „Bemerkung
  (Profil)“.

No buttons, no edit action.

## Behaviour the layout must keep

- Empty fields are left out entirely, so a freshly created trainer may show only the name
  and „Status“.

## Observations on the current layout (input for layout proposals)

- No screenshot exists. From the code, it uses the same full-width card with label-over-value
  pairs as the person file („Person“), so it shares that page's issues: a wide card with
  short content and the rest of the screen empty.
- Person data and trainer-profile data sit in one undivided list; only the „(Person)“ /
  „(Profil)“ suffixes on the remarks tell them apart.
- The page is a dead end apart from the back arrow to the dashboard.
