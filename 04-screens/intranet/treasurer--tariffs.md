# Tarife (Kassenwart:in and Trainingskoordinator:in)

|                 |                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                                                                |
| **Role**        | Kassenwart:in (Treasurer) and Trainingskoordinator:in (Training coordinator) — identical page, see "Differences per role"               |
| **Menu item**   | „Tarife“ in the „Kassenwart:in“ section and „Tarife“ in the „Trainingskoordinator:in“ section                                           |
| **Page title**  | „Tarife“                                                                                                                                |
| **URL**         | `/treasurer/tariffs`, `/training-coordinator/tariffs`                                                                                    |
| **Screenshots** | `screenshots/intranet/treasurer/12-tariffs--desktop.png`, `…--mobile.png`; `screenshots/intranet/training-coordinator/12-tariffs--desktop.png`, `…--mobile.png` |

## Purpose

The club's fee schedule. Two records: the tariff for invoicing teams („Tarife
Vereinsrechnung“: hourly rates, travel flat rates, kilometre rate) and the reimbursement
paid to Trainer:innen („Erstattung Trainer:in“). The page shows the current rates, lets
her change all nine together and keeps a history of every change. Without rates no
training amount can be computed.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare — once at setup, then about once a year when fees change.
- **Mode:** reading the current values; occasionally editing a few amounts and saving.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

Top to bottom: two rate cards (or the "not maintained" notice), the card „Sätze pflegen“,
the card „Änderungshistorie“.

### Page states

| Element      | Text                                         | When                       |
| ------------ | -------------------------------------------- | -------------------------- |
| Loading text | „Lade …“                                     | Before the first answer    |
| Alert        | „Die Tarife konnten nicht geladen werden.“    | Load failed (replaces the page) |

### Rate cards (read-only)

Shown once rates are maintained. Each line „**‹Satz›:** ‹Betrag €›“.

- Card „Tarife Vereinsrechnung“: „Stundensatz Einzeltraining, normal“, „Stundensatz
  Einzeltraining, ermäßigt“, „Stundensatz Gruppentraining, normal“, „Stundensatz
  Gruppentraining, ermäßigt“, „Fahrtkostenpauschale Einzeltraining“,
  „Fahrtkostenpauschale Gruppentraining (je Team)“, „km-Satz“
- Card „Erstattung Trainer:in“: „Fahrtkostenpauschale“, „km-Satz“

Instead of both cards, while nothing is maintained: warning alert with a triangle icon,
title „Noch keine Tarife hinterlegt“, text „Für den Verein ist bisher kein Satz erfasst —
das ist nicht dasselbe wie 0,00 €. Solange hier nichts steht, kann zu einem Training kein
Betrag berechnet werden.“

### Card „Sätze pflegen“ (form)

- Help text at the top: „Beträge in Euro, z. B. 44,00. Alle neun Sätze werden gemeinsam
  gespeichert.“
- Field group „Tarife Vereinsrechnung“ with seven text inputs (decimal keyboard), labels
  as above followed by „(€)“, e.g. „Stundensatz Einzeltraining, normal (€)“, „km-Satz (€)“
- Field group „Erstattung Trainer:in“ with „Fahrtkostenpauschale (€)“ and „km-Satz (€)“
- No required marks. Field error under a box that holds something unreadable: „Kein
  lesbarer Betrag. Beispiele: 44 oder 1234,56 — ein Tausenderpunkt wird nicht gelesen.“
  Server validation messages appear under their field the same way (an empty box is refused
  by the server). Editing a field clears its error.
- Form-level alert for server messages that belong to no field
- Alert „Die Tarife konnten nicht gespeichert werden. Bitte später erneut versuchen.“
- Button „Sätze speichern“ (primary), disabled while saving; next to it the muted status
  „Gespeichert.“ after a successful save (disappears on the next edit)

### Card „Änderungshistorie“

A list, newest first, each entry: muted „‹Datum Uhrzeit› · ‹Name›“, then „‹Gruppe› ·
**‹Satz›**: ‹alt› → ‹neu›“ (e.g. „Erstattung Trainer:in · **km-Satz**: 0,35 € → 0,39 €“;
a first value reads „—“ as the old value).
Empty: „Noch keine Änderung an den Tarifen festgehalten.“

## Differences per role

None visible. The two roles reach the page from their own menu section and URL and save
through their own endpoint; content, labels and behaviour are identical.

## Behaviour the layout must keep

- All nine rates are saved together with one button.
- An empty rate is not 0,00 €: the "not maintained" notice and the „—“ in the history must
  stay distinguishable from a zero amount.
- The two groups share the label „km-Satz“ (and a „Fahrtkostenpauschale“), so the group
  heading must stay visibly attached to its fields in both the read cards and the form.

## Observations on the current layout (input for layout proposals)

- Every rate appears twice in a row: once in the read cards, once in the form below. The
  page is about 1,550 px tall on desktop for nine numbers.
- The form inputs span the full card width (about 1,050 px) for values of five
  characters; amounts are left-aligned.
- The read cards are label lines with the value right after the label, so values do not
  line up in a column and are hard to compare.
- The group headings inside the form („Tarife Vereinsrechnung“, „Erstattung Trainer:in“)
  look the same as the card titles, so the hierarchy is flat.
- On mobile the page becomes a very long single column.
