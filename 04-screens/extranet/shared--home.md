# Startseite

|                 |                                                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                                                                                                                                                                       |
| **Role**        | Trainer:in, Trainingspartner:in, and an account holding both roles                                                                                                                                                                             |
| **Menu item**   | None of its own (the landing page after login; the header title „Startseite“ is the way back)                                                                                                                                                  |
| **Page title**  | „Startseite“                                                                                                                                                                                                                                   |
| **URL**         | `/`                                                                                                                                                                                                                                            |
| **Screenshots** | `screenshots/extranet/trainer/01-home--desktop.png`, `…--mobile.png`; `screenshots/extranet/training-partner/01-home--desktop.png`, `…--mobile.png`; `screenshots/extranet/trainer-and-training-partner/01-home--desktop.png`, `…--mobile.png` |

## Purpose

The landing page of the Extranet. It greets the signed-in person and offers every entry
point she can reach, as large touch targets, grouped into one section per role she holds.
It duplicates the navigation drawer on purpose: in the field, on a phone, a page of
thumb-sized buttons is a faster way to „Neues Training“ than opening the drawer. It is also
the **only** place where a person holding both roles chooses which party she records a
training as — by pressing the „Neues Training“ button in the matching role section.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** every session starts here (login lands on it). Trainer:innen several times
  a week, Trainingspartner:innen roughly weekly.
- **Mode:** a launcher. One tap, then away. Nothing is read here except the greeting.
- **Typical volume:** five buttons for a Trainer:in, three for a Trainingspartner:in, eight
  for an account holding both roles.
- **Device:** mainly the phone, right before or after a training.

## Inventory (fixed — every element must stay)

### Greeting

| Element    | Text                                              | When   |
| ---------- | ------------------------------------------------- | ------ |
| Title      | „Willkommen, ‹Anzeigename›“                       | Always |
| Login line | „Angemeldet als ‹E-Mail-Adresse›“ (address bold) | Always |

### Role section „Trainer:in“ (only for an account with the Trainer:in role)

Section heading „Trainer:in“, then in this order:

| Button                        | Style     | Target                                 |
| ----------------------------- | --------- | -------------------------------------- |
| „Neues Training“              | Primary   | `/trainer/trainings/new`               |
| „Meine Trainings“             | Secondary | `/trainer/trainings`                   |
| „Hunde“                       | Secondary | `/trainer/dogs`                        |
| „Rechnung“                    | Secondary | `/trainer/open-trainings`              |
| „Abgeschlossene Rechnungen“   | Secondary | `/trainer/billed-trainer-billing-runs` |

### Role section „Trainingspartner:in“ (only for an account with the Trainingspartner:in role)

Section heading „Trainingspartner:in“, then in this order:

| Button            | Style     | Target                             |
| ----------------- | --------- | ---------------------------------- |
| „Neues Training“  | Primary   | `/training-partner/trainings/new`  |
| „Meine Trainings“ | Secondary | `/training-partner/trainings`      |
| „Meine Hunde“     | Secondary | `/training-partner/dogs`           |

## Differences per role

- **Trainer:in only:** greeting + the „Trainer:in“ section.
- **Trainingspartner:in only:** greeting + the „Trainingspartner:in“ section.
- **Both roles:** greeting + both sections, „Trainer:in“ first. Labels inside a section are
  unqualified („Neues Training“ appears twice); the section heading is what tells them apart.
- An account whose landing page is not this one (no Extranet-facing role) is redirected to
  `/no-access` (see `shared--no-access.md`).

## Behaviour the layout must keep

- One section per role held, each with a visible role heading. The two „Neues Training“
  buttons lead to two different forms (different parties), so a person holding both roles
  must be able to tell at a glance which one is which. Do not merge the sections or pick
  one role for her.
- The order and wording of the buttons mirror the navigation drawer exactly (a test asserts
  this). If the drawer order changes, this page changes with it.
- „Neues Training“ is the primary action of each section.
- There is no sign-out here; it lives in the user menu of the header.

## Observations on the current layout (input for layout proposals)

- Everything sits in one narrow card (about 384 px wide) centred on the desktop page; at
  1440 px two thirds of the screen are empty.
- On the phone the card fills the width and the buttons are full-width and comfortably
  sized; for the single-role Trainer:in all five fit above the fold, which works well.
- For the account holding both roles the second „Neues Training“ sits below the fold on a
  phone (around 1000 px down in a 1688 px tall capture at 2x), and both primary buttons
  look identical — only a small bold heading separates them.
- All secondary buttons have the same weight; there are no icons, no hint of what is
  behind „Rechnung“ versus „Abgeschlossene Rechnungen“.
- The greeting and the „Angemeldet als“ line take a lot of space for information the
  header's user menu already shows (the display name). A long e-mail address
  („jonas.trainer-partner@example.com“) fills the whole line on a phone.
- The page shows no data at all (for example the number of trainings this month or open
  trainings to invoice). _Any such figure would be a new element — propose only as an
  optional addition, marked as such._
