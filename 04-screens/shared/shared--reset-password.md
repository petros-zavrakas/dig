# Neues Passwort vergeben (password reset)

|                 |                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet and Extranet (one page component per context, identical text)                                                                 |
| **Role**        | Signed out — the account holder following a password-reset e-mail                                                                      |
| **Menu item**   | None (no header, no navigation)                                                                                                         |
| **Page title**  | Card title „Neues Passwort vergeben“; after success „Passwort gesetzt“                                                                  |
| **URL**         | `/reset-password?token=…`                                                                                                               |
| **Screenshots** | `screenshots/intranet/signed-out/02-reset-password--desktop.png`, `…--mobile.png`; `screenshots/extranet/signed-out/02-reset-password--…` (both show the missing-token state) |

## Purpose

Set a new password for an account that **already has** one. The Administrator:in presses
„Passwort zurücksetzen“ on the account page; the account holder receives an e-mail with a
one-time link to this page. The old password stays valid until the new one is set. The
page is reached in the context that owns the account's password: the Intranet for accounts
with an Intranet role, the Extranet for accounts with Extranet roles only.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare — once per forgotten password.
- **Mode:** data entry, two fields, then one link.
- **Device:** whatever the e-mail is opened on; often a phone.

## Inventory (fixed — every element must stay)

### States

| State                     | Card title                  | Content                                                                                                               |
| ------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| No token in the link      | „Neues Passwort vergeben“   | Red alert only: „Ungültiger oder fehlender Token. Bitte den Link aus der Reset-Mail verwenden.“ (no form)            |
| Form                      | „Neues Passwort vergeben“   | The two fields and the button below                                                                                   |
| Success                   | „Passwort gesetzt“          | Text „Passwort gesetzt. Sie können sich jetzt anmelden.“ + button-styled link „Zur Anmeldung“ (to `/login`). No automatic sign-in. |

### Form fields

| Field                    | Type     | Required (red asterisk) | Validation message (under the field)                                                                    |
| ------------------------ | -------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| „Neues Passwort“         | Password | yes                     | From the server, e.g. „Das Passwort muss mindestens 12 Zeichen lang sein.“                              |
| „Passwort wiederholen“   | Password | yes                     | „Passwörter stimmen nicht überein.“ (checked in the browser before sending)                            |

There is no legend line explaining the asterisk on this form, and no help text about the
12-character minimum before the first attempt.

### Button

- „Passwort setzen“; while sending: „Speichern ...“ and disabled.

### Error alert (red, above the button)

| Text                                                                                                                    | When                             |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| „Der Reset-Link ist ungültig. Bitte die Administration um einen neuen Reset bitten.“                                    | Token unknown                    |
| „Der Reset-Link ist abgelaufen oder wurde bereits eingelöst. Bitte die Administration um einen neuen Reset bitten.“    | Token expired or already used    |
| „Passwort gerade nicht setzbar. Bitte später erneut versuchen.“                                                         | Any other failure                |

## Differences per context

None in the visible page. Only the sign-in page the success link leads to differs
(Intranet or Extranet login).

## Behaviour the layout must keep

- The page works without a header or navigation (the person is signed out).
- The password rule (minimum length) is reported by the server, so its message must have a
  place under the field.
- Success shows a separate confirmation with a link; the person signs in by hand.

## Observations on the current layout (input for layout proposals)

- Same bare-card treatment as the login: a 448 px card near the top of an empty page, no
  logo or club name. A person arriving from an e-mail has no visual confirmation of which
  service she is on.
- The missing-token state (the state in the screenshots) is a title plus one red bordered
  sentence; the red text on white is the whole page and offers no next step.
- Mobile: the card touches the screen edges (no side margin).
- The two-step meaning (reset vs. first password, see „Passwort vergeben“) is only carried by
  the title; the two pages otherwise look identical.
