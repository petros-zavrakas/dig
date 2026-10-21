# Kein Zugriff

|                 |                                                         |
| --------------- | ------------------------------------------------------- |
| **Context**     | Extranet                                                |
| **Role**        | Any signed-in account (see "Two variants")              |
| **Menu item**   | None                                                    |
| **Page title**  | „Kein Zugriff“ (card title; the page has no app header) |
| **URL**         | `/no-access`                                            |
| **Screenshots** | Captured with a rewritten session payload (no seeded account lands here): `screenshots/extranet/no-access/states/01-no-access--desktop.png` (each also `--mobile.png`) |
## Purpose

The page a signed-in person sees when she may not use what she asked for. It answers two
different situations:

1. The account holds **no** Extranet-facing role at all (every Intranet account is mirrored
   into the Extranet, so a valid login does not by itself grant access). There is nowhere to
   go; the only action is to sign out.
2. The account **has** an Extranet home but opened a page of the other role (for example a
   Trainingspartner:in typing a Trainer:in address). She is one click away from her own
   pages, so the page offers the way back to „Startseite“.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare. Mostly office staff who try the Extranet with their Intranet
  account, or an old bookmark.
- **Mode:** read one sentence, press one button.
- **Device:** either.

## Inventory (fixed — every element must stay)

The page sits **outside** the application shell: no header, no navigation drawer, no user
menu. Everything is in one card.

| Element | Text | When |
| --- | --- | --- |
| Title | „Kein Zugriff“ | Always |
| Message | „Dieser Bereich ist für Ihr Konto ‹E-Mail-Adresse› nicht freigegeben. Ihre eigenen Bereiche erreichen Sie über die Startseite.“ (address bold) | The account has an Extranet home (situation 2) |
| Message | „Ihr Konto ‹E-Mail-Adresse› hat derzeit keinen Zugriff auf das Extranet.“ (address bold) | The account has no Extranet home (situation 1) |
| Button (primary) | „Zur Startseite“ → `/` | Situation 2 only |
| Button (secondary) | „Abmelden“ — signs out and goes to the login page | Always |

## Behaviour the layout must keep

- No header or drawer: an account without a role would get an empty navigation bar.
  The two buttons are the page's whole navigation.
- „Zur Startseite“ must **not** appear in situation 1; the start page would send the account
  straight back here (a loop).

## Observations on the current layout (input for layout proposals)

- (No screenshot.) From the code: a narrow card (about 384 px) centred with a top margin,
  muted small message text, buttons side by side in the card footer. It looks like the
  login page family rather than the app; that is consistent with it sitting outside the
  shell, and the redesign could style it together with the authentication pages.
