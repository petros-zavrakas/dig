# Übersicht (dashboard)

|                 |                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Context**     | Intranet                                                                                                                                                                 |
| **Role**        | Every Intranet role (one page component for all; differences below)                                                                                                      |
| **Menu item**   | „Übersicht“, the first, heading-less entry of the drawer                                                                                                                 |
| **Page title**  | „Übersicht“                                                                                                                                                              |
| **URL**         | `/`                                                                                                                                                                      |
| **Screenshots** | `screenshots/intranet/<role>/01-dashboard--desktop.png`, `…--mobile.png` for `admin`, `training-coordinator`, `treasurer`, `board`, `coordinator-and-treasurer`         |

## Purpose

The page every Intranet account lands on after signing in. Today it greets the person and,
for the Trainingskoordinator:in, offers the only entry point to creating a Trainer:in.
The page belongs to no role; its URL stays neutral because its job is to show whatever the
signed-in person can reach.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** seen at every sign-in; otherwise passed through quickly.
- **Mode:** reading one line; one click for the Trainingskoordinator:in's quick action.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

| Element              | Text                                       | When                                                                                       |
| -------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Greeting heading     | „Willkommen, ‹Anzeigename›“                | Always                                                                                     |
| Section label        | „Schnellzugriff“                           | Account holds the Trainingskoordinator:in role                                             |
| Button (link)        | „Trainer:in anlegen“ → `/training-coordinator/trainers/new` | Account holds the Trainingskoordinator:in role. It is the **only** way to reach the create-trainer form (there is no trainer list and no menu entry). |

No loading, error or empty state of its own (the account is already loaded by the shell).

## Differences per role

| Role (screenshot folder)       | What the page shows                                         |
| ------------------------------ | ----------------------------------------------------------- |
| admin                          | Greeting only                                               |
| training-coordinator           | Greeting + „Schnellzugriff“ + „Trainer:in anlegen“          |
| treasurer                      | Greeting only                                               |
| board                          | Greeting only                                               |
| coordinator-and-treasurer      | Greeting + „Schnellzugriff“ + „Trainer:in anlegen“ (from the coordinator role) |

## Behaviour the layout must keep

- „Trainer:in anlegen“ must stay reachable from here for every account with the
  Trainingskoordinator:in role, because nothing else leads to that form. The create form and
  the trainer detail page both point their back arrow to „Übersicht“.
- The greeting is a subordinate heading; the header's „Übersicht“ is the page's top heading.

## Observations on the current layout (input for layout proposals)

- **Almost empty page.** For four of five roles the entire content is one line of text;
  more than 90 % of the viewport is white, on desktop and mobile alike.
- The greeting (24 px) is larger than the page title in the header (16 px).
- The single quick-action button sits alone under a small grey label, looking like an
  afterthought.
- The page repeats nothing of the navigation: a person must open the drawer to go anywhere.
  Shortcuts to the role's own pages, counts of open work (e.g. open billable trainings for the
  Kassenwart:in, trainings to correct for the Trainingskoordinator:in) or a list of recent
  items would all be **new elements — optional additions only**, to be judged separately.
- The greeting carries the full display name at 24 px; long names (e.g. „Willkommen, Sabine
  Coordinator-Treasurer“) will wrap at 390 px.
