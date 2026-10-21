# Konto anlegen

|                 |                                                                                  |
| --------------- | -------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                         |
| **Role**        | Administrator:in                                                                 |
| **Menu item**   | None — reached from „Konto anlegen“ on „Konten“                                  |
| **Page title**  | „Konto anlegen“ (back arrow to „Konten“)                                         |
| **URL**         | `/admin/accounts/new`                                                            |
| **Screenshots** | `screenshots/intranet/admin/04-account-create--desktop.png`, `…--mobile.png`<br>**States:** `screenshots/intranet/admin/states/02-account-create-validation--desktop.png` (each also `--mobile.png`) |
## Purpose

Create a new **account**: login e-mail, display name and one or more roles. On success the
system sends an invitation e-mail in which the new account holder chooses her first
password (in the Intranet if any Intranet role was given, otherwise in the Extranet). The
Administrator:in never sees or sets a password. Linking the account to a person happens
afterwards on the account page.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare — when someone joins. Sometimes several in a row (hence „Weiteres
  Konto anlegen“).
- **Mode:** data entry: two text fields and a few checkboxes.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Form (state „editing“)

- Legend line at the top: „Mit * markierte Felder sind Pflichtfelder.“ (the asterisk in red)

| Field          | Type                          | Required mark | Notes / validation                                                                                                                 |
| -------------- | ----------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| „E-Mail“       | E-mail                        | red „*“       | Focused on load. Server messages under the field (must not be blank, must be an e-mail, must be unique)                           |
| „Anzeigename“  | Text                          | red „*“       | Server messages under the field (must not be blank, at most 120 characters)                                                        |
| „Rollen“       | Group of 7 checkboxes, multi-select: „Trainer:in“, „Trainingspartner:in“, „Trainingskoordinator:in“, „Kassenwart:in“, „Vorstand“, „Administrator:in“, „Bewerber:in“ | none shown (but at least one is required by the server) | Server message under the group when none is ticked |

Field validation messages are the server's texts, shown under the field in red.

### Buttons

- „Konto anlegen“ (primary, submits); while sending „Anlegen ...“ and disabled.
- „Abbrechen“ (outlined, link back to „Konten“).

### Error alert

- „Konto-Anlage gerade nicht möglich. Bitte später erneut versuchen.“ — any failure other
  than field validation; red, above the buttons.

### Success state (replaces the form in the same card)

| Element       | Text                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Card title    | „Konto angelegt“                                                                                       |
| Text          | „Das Konto wurde angelegt. In wenigen Minuten wird eine Einladungs-Mail an **‹E-Mail›** verschickt.“  |
| Button        | „Weiteres Konto anlegen“ (primary; empties the form)                                                   |
| Button (link) | „Abbrechen“ (outlined; back to „Konten“)                                                               |

## Behaviour the layout must keep

- Roles are a free multi-selection; any combination is valid (one person commonly holds
  several roles).
- Success stays on this page (no redirect to the new account) and offers a quick start on
  the next one.
- The invitation is sent asynchronously — the success text says „in wenigen Minuten“.

## Observations on the current layout (input for layout proposals)

- A narrow 448 px card centred in the 1088 px column, so on desktop the form floats in the
  middle with large empty margins left and right, while the header title stays at the
  left edge — the form and its title do not line up.
- The card has no title in the editing state (only the success state has one); the header
  title is the only heading.
- „Rollen“ is a bare stack of seven checkboxes with no grouping between the Intranet roles
  (Trainingskoordinator:in, Kassenwart:in, Vorstand, Administrator:in) and the Extranet roles
  (Trainer:in, Trainingspartner:in, Bewerber:in), though that split decides where the
  invitation is redeemed. Grouping them under sub-headings would be a layout change only if
  the sub-headings are treated as **optional addition** (they are new text).
- „Rollen“ is required but carries no asterisk, unlike the two text fields above it.
- The success message „Konto angelegt“ re-uses the label „Abbrechen“ for what is really
  „back to the list“, which reads oddly after a completed action (label is fixed; placement
  and emphasis are open).
- Mobile: works, the card fills the column; the checkbox list is long but readable.
