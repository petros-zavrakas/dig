# Hund anlegen — create a dog

|                 |                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                 |
| **Role**        | Trainingskoordinator:in (Training coordinator)                                           |
| **Menu item**   | none — reached through the „Hund anlegen“ button on „Hunde“                              |
| **Page title**  | „Hund anlegen“, with a back arrow (accessible name „Zurück“) to `/training-coordinator/dogs` |
| **URL**         | `/training-coordinator/dogs/new`                                                         |
| **Screenshots** | `screenshots/intranet/training-coordinator/04-dog-create--desktop.png`, `…--mobile.png`<br>**States:** `screenshots/intranet/training-coordinator/states/06-dog-create-validation--desktop.png` (each also `--mobile.png`) |
## Purpose

Creates a new dog (Hund) with its master data. Only the call name, date of birth and
ownership are required; everything else can be filled in now or left empty. On success the
new dog's file opens. There is no edit form for a dog afterwards, so whatever is entered
here is what the dog file shows.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare — a few times a year, when a litter or a self-training dog joins.
  Several dogs of one litter may be entered in one sitting.
- **Mode:** data entry from paper or e-mail, 3–13 fields.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Form (one card)

Intro line: „Mit * markierte Felder sind Pflichtfelder.“ (the asterisk red). Required
fields get a red asterisk after their label automatically.

| Field                   | Control          | Required | Options / notes                                                                                                 |
| ----------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| „Rufname“               | Text             | yes      | Focused on page load                                                                                            |
| „Geburtsdatum“          | Date             | yes      |                                                                                                                 |
| „Eigentümer (am Hund)“  | Select           | yes      | Placeholder „Bitte wählen“ (not selectable); „Verein“, „Selbstausbildner“                                       |
| „Rasse“                 | Text             | no       |                                                                                                                 |
| „Farbe“                 | Text             | no       |                                                                                                                 |
| „Geschlecht“            | Select           | no       | „Bitte wählen“ (empty), „Rüde“, „Hündin“                                                                        |
| „TASSO-Nummer“          | Text             | no       |                                                                                                                 |
| „Kenndecken-Nummer“     | Text             | no       |                                                                                                                 |
| „Chip-Nummer“           | Text             | no       |                                                                                                                 |
| „Ausbildungsart“        | Select           | no       | „Bitte wählen“ (empty), „Vereins-Fremdausbildung“, „Selbstausbildung“                                           |
| „Wurf“                  | Text             | no       | Free text, e.g. „D-Wurf 2021“                                                                                   |
| „Eintrittsdatum“        | Date             | no       |                                                                                                                 |
| „Phase“                 | Select           | no       | „Bitte wählen“ (empty), „Welpe“, „Patenzeit“, „Grundausbildung“, „Spezialausbildung“, „Teamphase“, „Nachbetreuung“, „Rente“, „Archiv“ |

### Messages

- Field errors: shown in red under „Rufname“, „Geburtsdatum“ and „Eigentümer (am Hund)“;
  the text comes from the server (validation messages), the field is marked invalid.
- Generic error alert (red), above the buttons: „Hund-Anlage gerade nicht möglich. Bitte
  später erneut versuchen.“

### Buttons

- „Hund anlegen“ (primary, submit). Reads „Anlegen ...“ and is disabled while saving.
- „Abbrechen“ (outline, link back to `/training-coordinator/dogs`).

## Behaviour the layout must keep

- Validation happens on the server after submit (the browser's own validation is off), so
  errors appear next to their fields after the round trip.
- On success the page moves on to the new dog's file (`/training-coordinator/dogs/:id`).

## Observations on the current layout (input for layout proposals)

- One narrow centred card (about 450 px) with 13 fields stacked in a single column; the page
  is 1,250 px tall at 1440 px wide, and two thirds of the width stays empty.
- The fields have natural groups that the layout does not show: identity (Rufname,
  Geburtsdatum, Geschlecht, Rasse, Farbe), identification numbers (TASSO, Kenndecke, Chip),
  and club data (Eigentümer, Ausbildungsart, Wurf, Eintrittsdatum, Phase). The required
  „Eigentümer (am Hund)“ sits among the identity fields.
- Short values (numbers, dates) get full-width inputs.
- The buttons sit at the very bottom, below the fold on a laptop screen.
