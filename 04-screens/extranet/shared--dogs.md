# Hunde / Meine Hunde

|                 |                                                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                                                                                              |
| **Role**        | Trainer:in („Hunde“) and Trainingspartner:in („Meine Hunde“): two mounts of the same list                                                                             |
| **Menu item**   | „Hunde“ in the „Trainer:in“ section; „Meine Hunde“ in the „Trainingspartner:in“ section                                                                               |
| **Page title**  | „Hunde“ (Trainer:in) / „Meine Hunde“ (Trainingspartner:in)                                                                                                            |
| **URL**         | `/trainer/dogs` / `/training-partner/dogs`                                                                                                                            |
| **Screenshots** | `screenshots/extranet/trainer/06-dogs--desktop.png`, `…--mobile.png`; `screenshots/extranet/training-partner/06-dogs--desktop.png`, `…--mobile.png`                   |

## Purpose

The entry point into a dog's training history. It lists teams (one dog with its current
Trainingspartner:in), and each entry opens that dog's history („‹Rufname› — Trainings“).
A Trainer:in sees **every active team of the club**; a Trainingspartner:in sees only the
dogs she keeps. There is no dog file (master data, health diary, progress) in the Extranet
yet; this list leads only to the training history.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** Trainer:in a few times a week, typically before a training to look at what
  colleagues did with the dog; Trainingspartner:in occasionally.
- **Mode:** finding one dog and tapping it. Nothing is entered.
- **Typical volume:** Trainer:in 40–60 teams (the seed has about 40); Trainingspartner:in 1–8.
- **Device:** mostly the phone, in the field; also desktop.

## Inventory (fixed — every element must stay)

### States (each replaces the list)

| Element      | Text                                                                       | When                                    |
| ------------ | -------------------------------------------------------------------------- | --------------------------------------- |
| Loading text | „Lade ...“                                                                 | Before the first answer                 |
| Error alert  | „Hunde konnten nicht geladen werden. Bitte später erneut versuchen.“       | Load failed                             |
| Empty state  | „Zurzeit gibt es kein aktives Team.“                                       | Trainer:in, the club has no active team |
| Empty state  | „Zurzeit ist Ihnen kein Hund zugeordnet.“                                  | Trainingspartner:in, no dog assigned    |

### List

One entry per team, sorted by the dog's call name. The whole entry is one link to the dog's
training history. Each entry shows:

- the dog's call name („Rufname“), or „(ohne Rufname)“ when the dog record is not resolved
- underneath, the name of the team's current Trainingspartner:in (first and last name)

There are no filters, no search, no sorting controls and no counts on this page.

## Differences per role

| Aspect           | Trainer:in                                   | Trainingspartner:in                          |
| ---------------- | -------------------------------------------- | -------------------------------------------- |
| Page title, menu | „Hunde“                                      | „Meine Hunde“                                |
| Scope            | Every active team of the club                | Only the dogs she keeps                      |
| Empty state      | „Zurzeit gibt es kein aktives Team.“         | „Zurzeit ist Ihnen kein Hund zugeordnet.“    |
| Link target      | `/trainer/dogs/:dogId/trainings`             | `/training-partner/dogs/:dogId/trainings`    |

The Trainingspartner:in's entries all carry her own name as the second line.

## Behaviour the layout must keep

- The entry is a single link (one target). The call name is the primary text; the
  Trainingspartner:in's name is secondary.
- The order is alphabetical by call name, as the server sends it.
- The empty state for the Trainingspartner:in stays singular („kein Hund“) against the
  plural title; that is deliberate.

## Observations on the current layout (input for layout proposals)

- Each entry is a full-width bordered box of about 90 px on desktop. With about 40 teams the
  page is a single column some 3,600 px tall on desktop (7,800 px at phone resolution), with
  most of the 1,440 px width empty. A denser layout (several columns on desktop, compact rows
  on the phone) would show far more dogs at once.
- There is no way to jump to a dog except scrolling. A search field or an alphabet index would
  be a new element: **optional addition** only.
- Long names (the leftover „E2E“ test records) wrap over two to three lines on the phone, in
  both the call name and the person line; real double names can do the same.
- For the Trainingspartner:in the second line repeats her own name on every entry, which adds
  nothing for her.
- Nothing marks the entry as tappable apart from a hover background on desktop; on the phone
  there is no chevron or other affordance.
- The list carries no icon or picture of the dog; the page reads as plain text boxes.
