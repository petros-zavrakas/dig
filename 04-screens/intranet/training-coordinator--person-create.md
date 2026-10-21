# Person anlegen — create a person

|                 |                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                      |
| **Role**        | Trainingskoordinator:in (Training coordinator)                                                |
| **Menu item**   | none — reached through the „Person anlegen“ button on „Personen“                              |
| **Page title**  | „Person anlegen“, with a back arrow (accessible name „Zurück“) to `/training-coordinator/persons` |
| **URL**         | `/training-coordinator/persons/new`                                                           |
| **Screenshots** | `screenshots/intranet/training-coordinator/07-person-create--desktop.png`, `…--mobile.png`<br>**States:** `screenshots/intranet/training-coordinator/states/07-person-create-validation--desktop.png` (each also `--mobile.png`) |
## Purpose

Creates a person (Person) master record: a future Trainingspartner:in, a contact, anyone the
club needs on file. Only the name is required. The person gets no profile and no account
here; those are attached later (the account on the person's file, the keeper relationship
on a dog's file, a trainer profile through „Trainer:in anlegen“). On success the page
returns to the „Personen“ list.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** a few times a month.
- **Mode:** data entry, 2–9 fields, often from an application form or e-mail.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Form (one card)

Intro line: „Mit * markierte Felder sind Pflichtfelder.“ (the asterisk red). Required
fields get a red asterisk after their label automatically.

| Field           | Control | Required | Notes                         |
| --------------- | ------- | -------- | ----------------------------- |
| „Vorname“       | Text    | yes      | Focused on page load          |
| „Nachname“      | Text    | yes      |                               |
| „E-Mail“        | E-mail  | no       |                               |
| „Straße“        | Text    | no       |                               |
| „Postleitzahl“  | Text    | no       |                               |
| „Ort“           | Text    | no       |                               |
| „Telefon“       | Text    | no       |                               |
| „Geburtsdatum“  | Date    | no       |                               |
| „Bemerkung“     | Text    | no       | Single-line free text         |

### Messages

- Field errors in red under „Vorname“, „Nachname“, „E-Mail“ and „Geburtsdatum“; the text
  comes from the server, the field is marked invalid.
- Generic error alert (red), above the buttons: „Person-Anlage gerade nicht möglich. Bitte
  später erneut versuchen.“

### Buttons

- „Person anlegen“ (primary, submit). Reads „Anlegen ...“ and is disabled while saving.
- „Abbrechen“ (outline, link back to `/training-coordinator/persons`).

## Behaviour the layout must keep

- Validation happens on the server after submit; errors appear next to their fields.
- On success the page returns to the list (not to the new person's file).

## Observations on the current layout (input for layout proposals)

- Same pattern as „Hund anlegen“ and „Trainer:in anlegen“: one narrow centred card (about
  450 px) with every field stacked full width, most of the screen empty.
- The address is three separate full-width rows (Straße, Postleitzahl, Ort); a postal code
  gets as much width as a street.
- There is no hint that the person may already exist (the duplicate check is a look at the
  „Personen“ list before coming here).
