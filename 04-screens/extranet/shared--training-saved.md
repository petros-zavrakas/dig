# Training gespeichert

|                 |                                                                                         |
| --------------- | --------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                |
| **Role**        | Trainer:in and Trainingspartner:in (one page component, mounted for each role)          |
| **Menu item**   | None — reached only by saving „Neues Training“                                          |
| **Page title**  | „Training gespeichert“ (no back arrow in the header)                                     |
| **URL**         | `/trainer/trainings/saved`, `/training-partner/trainings/saved`                         |
| **Screenshots** | After a real capture: `screenshots/extranet/trainer/states/03-training-saved--desktop.png` (each also `--mobile.png`) |
## Purpose

The confirmation after saving a training. It says what was saved and offers the next
step: look at the saved training (or the group), record another one, or go home. Recording
several trainings in a row after a training day is common, so „Weiteres Training
erfassen“ matters.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** after every capture.
- **Mode:** a glance and one tap.
- **Device:** mainly the phone.

## Inventory (fixed — every element must stay)

### Message (one of)

| Text | When |
| --- | --- |
| „Das Training wurde erfasst.“ | One training saved (also the fallback when the page is opened without save information, e.g. after a reload) |
| „‹n› Trainings als Gruppentraining erfasst“ | Trainer:in saved a new group training with several teams |
| „1 Training zum Gruppentraining hinzugefügt“ / „‹n› Trainings zum Gruppentraining hinzugefügt“ | Trainer:in joined an existing group training |

### Buttons (in this order, each only when its condition holds)

| Button | Style | When | Target |
| --- | --- | --- | --- |
| „Training ansehen“ | Primary | Exactly one training was saved | Its detail page |
| „Trainings ansehen“ | Primary | Trainer:in only: several teams saved, or a join (even of one team) | „Meine Trainings“ narrowed to that group training |
| „Weiteres Training erfassen“ | Primary when neither link above is shown, else outline | Always | The same role's „Neues Training“ |
| „Zur Startseite“ | Outline | Always | `/` |

So after a Trainer:in joins a group with one team, both „Training ansehen“ and
„Trainings ansehen“ appear.

## Differences per role

- **Trainer:in:** all three messages and all four buttons are possible.
- **Trainingspartner:in:** always one training: „Das Training wurde erfasst.“; never
  „Trainings ansehen“ (even when she joined a group training). Links lead to her own
  detail and capture pages.

## Behaviour the layout must keep

- No back arrow: the buttons are the page's whole navigation (a back arrow would point at
  the form just submitted).
- The page reads what was saved from the navigation; after a reload it falls back to the
  plain message with only „Weiteres Training erfassen“ and „Zur Startseite“.

## Observations on the current layout (input for layout proposals)

- (No screenshot.) From the code: a narrow card (about 384 px) centred with a large top
  margin; the message is small grey text — the least prominent element on a page whose
  whole job is to confirm. Buttons wrap side by side, so on a phone up to four buttons of
  different widths form a ragged block.
- There is no visual success signal (icon, colour). _A summary of what was saved (date,
  dog) would be new data — only as an optional addition._
