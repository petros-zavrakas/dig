# Passwort vergeben (first password from an invitation)

|                 |                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet and Extranet (one page component per context, identical text)                                                             |
| **Role**        | Signed out — a new account holder following an invitation e-mail                                                                    |
| **Menu item**   | None (no header, no navigation)                                                                                                     |
| **Page title**  | Card title „Passwort vergeben“; after success „Passwort gesetzt“                                                                    |
| **URL**         | `/set-password?token=…`                                                                                                             |
| **Screenshots** | `screenshots/intranet/signed-out/03-set-password--desktop.png`, `…--mobile.png`; `screenshots/extranet/signed-out/03-set-password--…` (both show the missing-token state) |

## Purpose

Choose the first password for a freshly created account. When the Administrator:in creates
an account (or presses „Einladung neu ausstellen“), an invitation e-mail with a one-time,
time-limited link is sent. Accounts with an Intranet role redeem it in the Intranet;
accounts with Extranet roles only (Trainer:innen, Trainingspartner:innen) redeem it in the
Extranet.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** once per account, ever.
- **Mode:** data entry, two fields, then one link. This is often the person's **first
  contact** with the application.
- **Device:** whatever the e-mail is opened on; for Extranet accounts usually a phone.

## Inventory (fixed — every element must stay)

### States

| State                 | Card title             | Content                                                                                                                 |
| --------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| No token in the link  | „Passwort vergeben“    | Red alert only: „Ungültiger oder fehlender Token. Bitte den Link aus der Einladungs-Mail verwenden.“ (no form)         |
| Form                  | „Passwort vergeben“    | The two fields and the button below                                                                                     |
| Success               | „Passwort gesetzt“     | Text „Passwort gesetzt. Sie können sich jetzt anmelden.“ + button-styled link „Zur Anmeldung“ (to `/login`). No automatic sign-in. |

### Form fields

| Field                   | Type     | Required (red asterisk) | Validation message (under the field)                                                     |
| ----------------------- | -------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| „Neues Passwort“        | Password | yes                     | From the server, e.g. „Das Passwort muss mindestens 12 Zeichen lang sein.“               |
| „Passwort wiederholen“  | Password | yes                     | „Passwörter stimmen nicht überein.“ (checked in the browser before sending)             |

No legend line explaining the asterisk, and no help text about the 12-character minimum
before the first attempt.

### Button

- „Passwort setzen“; while sending: „Speichern ...“ and disabled.

### Error alert (red, above the button)

| Text                                                                                                          | When                          |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| „Der Link ist ungültig. Bitte die Administration um eine neue Einladung bitten.“                              | Token unknown                 |
| „Der Link ist abgelaufen oder wurde bereits eingelöst. Bitte die Administration um eine neue Einladung bitten.“ | Token expired or already used |
| „Passwort gerade nicht setzbar. Bitte später erneut versuchen.“                                               | Any other failure             |

## Differences per context

None in the visible page. Only the login the success link leads to differs (Intranet or
Extranet).

## Behaviour the layout must keep

- Works without header or navigation (signed out).
- The server's password-rule message needs a place under the first field.
- Success is a separate confirmation with a link; the person then signs in by hand.
- Kept as a page separate from „Neues Passwort vergeben“ (reset); the two share their form
  but carry different wording.

## Observations on the current layout (input for layout proposals)

- As the first screen a new member ever sees, it is the barest one: a small card with a
  title and two fields, no logo, no club name, no word of welcome. (A welcome or
  explanatory line would be a new element — **optional addition** only.)
- The screenshots show the missing-token state: one red sentence in a bordered box, no next
  step offered.
- **Mobile (390 px): the card runs edge to edge** with its rounded border clipped against
  the screen sides — no page padding.
- Identical in look to the reset page; only the title differs.
