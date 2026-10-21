# Konto (account detail)

|                 |                                                                                  |
| --------------- | -------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                         |
| **Role**        | Administrator:in                                                                 |
| **Menu item**   | None — reached from a display name on „Konten“                                   |
| **Page title**  | „Konto“ (back arrow to „Konten“)                                                 |
| **URL**         | `/admin/accounts/:id`                                                            |
| **Screenshots** | `screenshots/intranet/admin/05-account-detail--desktop.png`, `…--mobile.png` (an active account with a password and a linked person, read view)<br>**States:** `screenshots/intranet/admin/states/01-account-edit-mode--desktop.png` (each also `--mobile.png`) |
## Purpose

One **account**: its identity (display name, roles), its lifecycle (active / locked), its
password state, and the **person** it belongs to. The Administrator:in edits the display
name and roles, locks or unlocks the account, re-sends the invitation while no password has
been set, starts a password reset once one has, and links or unlinks the person.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** occasional, a few times a month.
- **Mode:** reading the state, then one action. Editing is short (name, roles).
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Page states

| Element       | Text                                   | When                      |
| ------------- | -------------------------------------- | ------------------------- |
| Loading text  | „Lade ...“                             | Before the first answer   |
| Error alert   | „Konto nicht gefunden.“                | Unknown account           |
| Error alert   | „Konto konnte nicht geladen werden.“   | Any other load failure    |

When loaded, two cards are stacked: the account card and the „Person“ card.

### Card 1 — account (read view)

| Element                | Content                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| Card title             | The display name                                                                                            |
| Card description       | The login e-mail                                                                                            |
| „Rollen“               | Comma-separated role labels                                                                                 |
| „Status“               | Badge „Aktiv“ (neutral) or „Gesperrt“ (red)                                                                 |
| „Erstpasswort“         | Badge „Wartet auf Erstpasswort“ (outlined) or „Passwort gesetzt“ (neutral)                                   |

Footer buttons:

| Button                       | Style                                     | When                                       | Effect                                     |
| ---------------------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| „Bearbeiten“                 | primary                                   | Always                                     | Switches the card to the edit form         |
| „Sperren“                    | destructive (red)                         | Account is active                          | Locks immediately (no confirmation dialog) |
| „Entsperren“                 | outlined                                  | Account is locked                          | Unlocks immediately                        |
| „Einladung neu ausstellen“   | outlined                                  | No password set yet                        | Sends a new invitation e-mail              |
| „Passwort zurücksetzen“      | outlined                                  | A password is set                          | Sends a password-reset e-mail              |

Each action button is disabled while its request is running.

Messages inside the card (above the footer):

| Text                                                                                     | Kind            | When                                       |
| ---------------------------------------------------------------------------------------- | --------------- | ------------------------------------------ |
| „Eine neue Einladungs-Mail wurde an ‹E-Mail› versendet.“                                 | Neutral alert   | After „Einladung neu ausstellen“ succeeded |
| „Eine E-Mail zum Zurücksetzen des Passworts wurde an ‹E-Mail› versendet.“                 | Neutral alert   | After „Passwort zurücksetzen“ succeeded    |
| „Aktion gerade nicht möglich. Bitte später erneut versuchen.“                            | Red alert       | Lock/unlock, re-invitation or reset failed (one alert per failed action) |

### Card 1 — account (edit form, replaces the read view)

| Element                     | Content                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Card title                  | „Konto bearbeiten“                                                                                                      |
| „E-Mail (Login-Name)“       | Read-only text (the e-mail cannot be changed)                                                                           |
| „Anzeigename“               | Text field, required (red „*“), focused on open; server message under the field (not blank, at most 120 characters)    |
| „Rollen“                    | 7 checkboxes, as on „Konto anlegen“; at least one required (server message under the group; no asterisk shown)         |
| Error alert                 | „Speichern gerade nicht möglich. Bitte später erneut versuchen.“                                                        |
| Buttons                     | „Speichern“ (primary; „Speichern ...“ while sending) · „Abbrechen“ (outlined; back to the read view; disabled while sending) |

No „Mit * markierte Felder …“ legend line on this form.

### Card 2 — „Person“

| State                | Content                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| A person is linked   | Person's first and last name (bold), the person's e-mail underneath if any, button „Verknüpfung lösen“ (outlined) |
| No person linked     | Muted text „keine Person zugeordnet“, button „Person zuordnen“ (primary)                                 |

The person's name is plain text, not a link.

### Dialog „Person zuordnen“ (from „Person zuordnen“)

| Step                | Content                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header (both steps) | Title „Person zuordnen“; description „Wählen Sie eine bestehende, noch nicht zugeordnete Person.“                                                                        |
| 1 — pick            | Search field „Person suchen“ (placeholder „Name oder E-Mail“, focused); list of matching persons (name bold, e-mail below), each a button; the list scrolls inside itself at half the screen height. Empty: „Keine passenden Personen gefunden.“ Error: „Personen konnten nicht geladen werden. Bitte später erneut versuchen.“ An empty search lists every eligible person (active, without an account). |
| 2 — confirm         | „Ausgewählte Person: **‹Vorname Nachname›**“, e-mail below if any; buttons „Andere Person wählen“ (outlined, back to step 1) and „Verknüpfen“ (primary; „Verknüpfen ...“ while sending) |
| Errors (step 2)     | „Diese Person hat bereits ein Konto oder dieses Konto ist bereits einer Person zugeordnet.“ (conflict) · „Verknüpfung gerade nicht möglich. Bitte später erneut versuchen.“ |

Closing the dialog discards the selection. On success it closes and the card shows the person.

### Dialog „Verknüpfung lösen“ (from „Verknüpfung lösen“)

| Element      | Text                                                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Title        | „Verknüpfung lösen“                                                                                                                                                                                    |
| Description  | „Die Verknüpfung mit der Person **‹Vorname Nachname›** wird gelöst. Das Konto bleibt aktiv und behält seine Rollen — nur der Bezug zu dieser Person wird entfernt. Die Person und ihre Profile bleiben erhalten.“ |
| Button       | „Verknüpfung lösen“ (primary; „Verknüpfung lösen ...“ while sending). There is no cancel button; the dialog is closed with its X / Escape / clicking outside. |
| Errors       | „Dieses Konto ist aktuell keiner Person zugeordnet.“ (conflict) · „Aktion gerade nicht möglich. Bitte später erneut versuchen.“                                                                         |

## Behaviour the layout must keep

- „Status“ and „Erstpasswort“ are independent axes; a locked account can still be waiting
  for its first password.
- Exactly one of „Einladung neu ausstellen“ / „Passwort zurücksetzen“ is offered, depending
  on whether a password has been set. Exactly one of „Sperren“ / „Entsperren“.
- Lock/unlock, invitation and reset act immediately, without a confirmation step; their
  outcome appears as a message in the account card.
- Editing happens in place: the account card turns into the form, the „Person“ card stays.
- The e-mail (login name) is never editable.
- An account has at most one person; changing it is unlink, then link.

## Observations on the current layout (input for layout proposals)

- **The red „Sperren“ button sits directly next to „Bearbeiten“** in the same row, at the
  same size, with no confirmation — a destructive action placed where the most common one is.
- **Mobile (390 px): the footer buttons overflow the card.** „Passwort zurücksetzen“ is
  cut off at the right edge („Passwort zurücks…“); the button row does not wrap.
- The account card is stretched to the full 1088 px column width while its content is a
  narrow column of label/value pairs on the left — most of the card is empty on desktop.
- Labels („Rollen“, „Status“, „Erstpasswort“) are stacked above their values one after
  the other, so three short facts take about 170 px of height; a two-column definition list
  or a single status line would be denser.
- The display name appears three times in the screenshot (header user menu, card title,
  linked person), and the e-mail twice (account and person) — common when the person is the
  account holder, but it makes the two cards look alike.
- The page title is the generic „Konto“; the account's name is only the card title, in
  regular weight.
- Success and failure messages appear inside the card above the buttons, far from the
  button that caused them when several are shown.
