# Anmeldung

|                 |                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet and Extranet (one page component per context, identical apart from the title and the redirect)                 |
| **Role**        | Signed out                                                                                                              |
| **Menu item**   | None (no header, no navigation)                                                                                         |
| **Page title**  | Card title „Intranet-Anmeldung“ / „Extranet-Anmeldung“                                                                  |
| **URL**         | `/login`                                                                                                                |
| **Screenshots** | `screenshots/intranet/signed-out/01-login--desktop.png`, `…--mobile.png`; `screenshots/extranet/signed-out/01-login--…` |

## Purpose

Sign in with login e-mail and password. Every signed-out visit to an authenticated page
ends here. There is no self-service: no „Passwort vergessen“ link and no registration —
accounts and password resets are started by the Administrator:in.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** once per session; rare for people who stay signed in.
- **Mode:** data entry, two fields.
- **Device:** Intranet desktop; Extranet mostly phone (Trainer:innen and
  Trainingspartner:innen in the field), also desktop.

## Inventory (fixed — every element must stay)

### Card

| Element     | Text                                                        | Notes                                                                 |
| ----------- | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| Card title  | „Intranet-Anmeldung“ (Intranet) / „Extranet-Anmeldung“ (Extranet) |                                                                 |

### Form fields

| Field      | Type     | Required | Notes                                                                      |
| ---------- | -------- | -------- | -------------------------------------------------------------------------- |
| „E-Mail“   | E-mail   | yes      | Focused on load; browser autofill as user name. No asterisk is shown on this form (every field is required). |
| „Passwort“ | Password | yes      | Browser autofill of the saved password                                     |

### Button

- „Anmelden“; while sending: „Anmelden ...“ and disabled.

### Error alert (red, between the fields and the button)

| Text                                                                | When                                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| „Benutzername oder Passwort ist falsch.“                           | Wrong credentials, unknown e-mail **or** locked account (deliberately the same text) |
| „Anmeldung gerade nicht möglich. Bitte später erneut versuchen.“    | Any other failure                                                                    |

## Differences per context

- **Title:** „Intranet-Anmeldung“ vs. „Extranet-Anmeldung“.
- **After sign-in:** the Intranet always opens „Übersicht“ (`/`). The Extranet opens the
  landing page the server names: „Startseite“ (`/`), or „Kein Zugriff“ (`/no-access`) for an
  account without an Extranet role.
- Everything else (fields, button, messages) is identical.

## Behaviour the layout must keep

- The error message must not reveal whether the e-mail exists or the account is locked —
  one shared text for all three.
- The e-mail field has focus on load; Enter submits.
- After signing in, browser back does not return to the login page (history is replaced).
- The two contexts must remain recognisable as different sites (today only the title tells
  them apart).

## Observations on the current layout (input for layout proposals)

- A bare 384 px card at the top of an empty white page (64 px from the top). No logo, no
  club name, no hint of what the application is — „Intranet-Anmeldung“ in small text is the
  only identification.
- The card title is small (16 px) and the page has no heading outside the card.
- Desktop: about two thirds of the viewport are empty below the card.
- **Mobile (390 px): the card has no side margin** — its border sits a few pixels from the
  screen edge, because the card is centred with a maximum width but the page adds no
  padding.
- Nothing distinguishes the Intranet from the Extranet visually; a person holding accounts
  in both could sign in on the wrong site without noticing.
