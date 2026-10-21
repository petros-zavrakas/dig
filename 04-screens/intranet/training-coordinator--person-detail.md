# Person — the person file

|                 |                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                          |
| **Role**        | Trainingskoordinator:in (Training coordinator)                                                    |
| **Menu item**   | none — reached through a name link on „Personen“                                                  |
| **Page title**  | „Person“, with a back arrow (accessible name „Zurück“) to `/training-coordinator/persons`          |
| **URL**         | `/training-coordinator/persons/:id`                                                               |
| **Screenshots** | `screenshots/intranet/training-coordinator/08-person-detail--desktop.png`, `…--mobile.png` (the person „Adam Admin“, with a linked account)<br>**States:** `screenshots/intranet/training-coordinator/states/04-person-link-account-dialog--desktop.png` (each also `--mobile.png`) |
## Purpose

One person's master data and the link between this person and a user account
(Benutzerkonto). Linking an account is what lets a Trainingspartner:in or Trainer:in log in
to the Extranet as this person. The page has exactly two cards today: master data and
„Benutzerkonto“. It does **not** show profiles (trainer, applicant), the dogs the person
keeps, or roles.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** a few times a month, typically right after an administrator has created an
  account that now needs linking to its person.
- **Mode:** reading, then one action (link or unlink).
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Page states

| Element           | Text                                   | When                    |
| ----------------- | -------------------------------------- | ----------------------- |
| Loading text      | „Lade ...“                             | Before the first answer |
| Error alert (red) | „Person nicht gefunden.“               | Unknown id              |
| Error alert (red) | „Person konnte nicht geladen werden.“  | Any other load failure  |

### Card 1 — master data

- Card title: „Vorname Nachname“.
- Always shown: „Status“ with a grey badge „Aktiv“ or „Archiviert“.
- Shown only when filled in, in this order (label above value): „E-Mail“, „Straße“,
  „Postleitzahl“, „Ort“, „Telefon“, „Geburtsdatum“, „Bemerkung“.
- Read-only. There is no edit action for a person.

### Card 2 — „Benutzerkonto“

- With a linked account: the account's display name (bold), a red badge „Gesperrt“ next to
  it when the account is locked, the account's e-mail (muted) underneath; button
  „Verknüpfung lösen“ (outline).
- Without one: muted text „kein Benutzerkonto zugeordnet“; button „Benutzerkonto zuordnen“
  (primary).

### Dialog „Benutzerkonto zuordnen“ (from „Benutzerkonto zuordnen“)

- Title „Benutzerkonto zuordnen“; description „Wählen Sie ein bestehendes, noch nicht
  zugeordnetes Benutzerkonto.“
- Step 1 — account picker: search field „Benutzerkonto suchen“ (placeholder „Anzeigename
  oder E-Mail“), result list (each row: display name bold, red badge „Gesperrt“ when locked,
  e-mail muted underneath; the list scrolls inside itself, at most half the screen height).
  Empty: „Keine passenden Konten gefunden.“ Error (red): „Konten konnten nicht geladen
  werden. Bitte später erneut versuchen.“ Only accounts not yet linked to a person are
  offered.
- Step 2 — after picking: „Ausgewähltes Konto: ‹Anzeigename›“ (+ „Gesperrt“ badge when
  locked) and the e-mail underneath.
- Error alert (red): „Dieses Konto ist bereits vergeben oder diese Person hat bereits ein
  Konto.“ or „Verknüpfung gerade nicht möglich. Bitte später erneut versuchen.“
- Buttons: „Anderes Konto wählen“ (outline, back to step 1), „Verknüpfen“ (primary;
  „Verknüpfen ...“ while saving). Closing the dialog discards the choice.

### Dialog „Verknüpfung lösen“ (from „Verknüpfung lösen“)

- Title „Verknüpfung lösen“; description „Die Verknüpfung mit dem Konto ‹Anzeigename (bold)›
  wird gelöst. Das Konto bleibt aktiv und behält seine Rollen — nur der Bezug zu dieser
  Person wird entfernt.“
- Error alert (red): „Diese Person hat aktuell kein verknüpftes Benutzerkonto.“ or „Aktion
  gerade nicht möglich. Bitte später erneut versuchen.“
- Button: „Verknüpfung lösen“ (primary; „Verknüpfung lösen ...“ while saving). No cancel
  button; the dialog's ✕ and Escape close it.

Both dialogs have the standard close control (✕, top right; its screen-reader text is the
English „Close“ from the shared dialog primitive). On success the dialog closes and the
card refreshes.

## Behaviour the layout must keep

- „Verknüpfung lösen“ is a confirmation dialog, not a direct action: the description must
  stay readable before the button is pressed, because it explains that the account stays
  active.
- The account picker is two-step: choosing an account replaces the list with the
  confirmation step, and „Anderes Konto wählen“ goes back.
- A locked account is flagged „Gesperrt“ in the card, in the picker list and in the
  confirmation step.

## Observations on the current layout (input for layout proposals)

- Two full-width cards (about 1,090 px) holding very little: three short lines each. The
  page ends at about 450 px and the rest of the screen is empty.
- In the screenshot the person's name and e-mail appear twice, once in each card, because
  the account's display name and e-mail match the person's; the two cards do not make clear
  which data belongs to the person and which to the account.
- Labels sit above values, one pair per row, though the values are short.
- Nothing on the page tells what the person is (trainer, Trainingspartner:in, contact) or
  which dogs she keeps. _Showing that would be new information, so only propose it as an
  optional addition._
