# Trainer:in anlegen — create a trainer

|                 |                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                          |
| **Role**        | Trainingskoordinator:in (Training coordinator)                                                    |
| **Menu item**   | none — the only entry is the „Trainer:in anlegen“ quick action under „Schnellzugriff“ on the „Übersicht“ (dashboard). There is no trainer list page |
| **Page title**  | „Trainer:in anlegen“, with a back arrow (accessible name „Zurück“) to the dashboard `/`           |
| **URL**         | `/training-coordinator/trainers/new`                                                              |
| **Screenshots** | `screenshots/intranet/training-coordinator/09-trainer-create--desktop.png`, `…--mobile.png` (mode „Neue Person“; the „Bestehende Person“ mode has no screenshot)<br>**States:** `screenshots/intranet/training-coordinator/states/08-trainer-create-validation--desktop.png` (each also `--mobile.png`) |
## Purpose

Makes someone a Trainer:in by giving a person a trainer profile. Two ways, chosen at the
top: create a **new person** together with the profile, or attach the profile to an
**existing person** (picked from a list that leaves out persons who are already
trainers). On success the new trainer's page („Trainer:in“) opens.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare — a few times a year.
- **Mode:** a choice, then data entry (2–11 fields for a new person, 0–2 for an existing one).
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Mode switch (top of the card)

- Label „Wer wird Trainer:in?“ (also the switch's accessible name).
- Segmented control with two options: „Neue Person“ (default) and „Bestehende Person“.
  Switching clears errors and any picked person; typed values stay.

### Mode „Neue Person“

Intro line: „Mit * markierte Felder sind Pflichtfelder.“ (the asterisk red). Required
fields get a red asterisk after their label automatically.

| Field                  | Control | Required | Notes                          |
| ---------------------- | ------- | -------- | ------------------------------ |
| „Vorname“              | Text    | yes      | Focused on page load           |
| „Nachname“             | Text    | yes      |                                |
| „E-Mail“               | E-mail  | no       |                                |
| „Straße“               | Text    | no       |                                |
| „Postleitzahl“         | Text    | no       |                                |
| „Ort“                  | Text    | no       |                                |
| „Telefon“              | Text    | no       |                                |
| „Geburtsdatum“         | Date    | no       |                                |
| „Bemerkung (Person)“   | Text    | no       | Remark on the person           |
| „Eintrittsdatum“       | Date    | no       | Trainer profile field          |
| „Bemerkung (Profil)“   | Text    | no       | Remark on the trainer profile  |

### Mode „Bestehende Person“

- Step 1 — person picker in place of the form: search field „Person suchen“ (placeholder
  „Name oder E-Mail“, focused), result list (each row: „Vorname Nachname“ bold, e-mail muted;
  scrolls inside itself, at most half the screen height). Empty: „Keine passenden Personen
  gefunden.“ Error (red): „Personen konnten nicht geladen werden. Bitte später erneut
  versuchen.“ Persons who already have a trainer profile are not offered. No buttons in this
  step (leave via the back arrow or by switching mode).
- Step 2 — after picking: „Ausgewählte Person: ‹Name›“, then only the two profile fields
  „Eintrittsdatum“ (date) and „Bemerkung (Profil)“ (text), both optional; no required-field
  intro line.

### Messages (both modes)

- Field errors in red under „Vorname“, „Nachname“, „E-Mail“, „Geburtsdatum“ and
  „Eintrittsdatum“; text from the server.
- Generic error alert (red), above the buttons: „Trainer:in-Anlage gerade nicht möglich.
  Bitte später erneut versuchen.“
- In „Bestehende Person“: „Diese Person ist bereits als Trainer:in erfasst.“

### Buttons

- „Trainer:in anlegen“ (primary, submit). Reads „Anlegen ...“ and is disabled while saving.
- „Andere Person wählen“ (outline): only in „Bestehende Person“, step 2; back to the picker.
- „Abbrechen“ (outline, link to the dashboard `/`).

## Behaviour the layout must keep

- The mode switch stays at the top and visible in both modes; it decides which fields exist.
- In „Bestehende Person“ the form appears only after a person is picked.
- On success the page moves on to `/training-coordinator/trainers/:id`.

## Observations on the current layout (input for layout proposals)

- Same narrow centred card (about 450 px) as the other create forms; in „Neue Person“ mode
  11 full-width fields stacked, about 1,150 px tall, with most of the width empty.
- Person fields and trainer-profile fields run together; only the „(Person)“ / „(Profil)“
  suffixes on the two remark labels hint that the last two fields belong to something
  else.
- The segmented control is clear, but its selected state („Neue Person“) is only a faint
  grey fill.
- „Abbrechen“ goes to the dashboard, because there is no trainer list to return to.
