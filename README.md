# Design brief — Hunde für Handicaps portal

Read this file first. It explains what to design, what must not change, and where to
find everything else in this folder.

## The task

Create a **new visual design** for an existing web application: two single-page apps
used by a German assistance-dog charity (Hunde für Handicaps e. V.).

- **Intranet** (`intranet.localhost`): the office side. Training coordination,
  treasury/billing, the board's read-only view and account administration.
- **Extranet** (`extranet.localhost`): the field side. Dog trainers (Trainer:innen) and
  dog owners in training (Trainingspartner:innen) record trainings and, for trainers,
  invoice their work.

The current UI is functional but plain. The goal is a design that looks considerably
better **and** is more practical to work with every day.

## The rule: the inventory is fixed, the arrangement is open

**Fixed. Do not add, remove, merge, split or rename:**
- the pages (every screen in `04-screens/`)
- the menu items and which role sees them
- the filters on each page
- the buttons and links, with their exact German labels
- the messages: errors, confirmations, empty states, warnings, tooltips, badges
- the table columns and form fields
- the behaviour described under "Behaviour the layout must keep" in each screen file

**Open. Redesign freely:**
- the visual language: colour, typography, spacing, shape, iconography, density, motion
- the overall layout and the application shell (header, navigation drawer, page frame)
- where elements are placed on a page, how they are grouped, their hierarchy and order
- how a table, a filter bar, a form or a detail page is laid out
- responsive behaviour

**Layout proposals are welcome.** Where a different arrangement would be clearly more
practical, propose it with a one-line rationale. Each screen file ends with
"Observations on the current layout" as a starting point. If a proposal needs an element
that does not exist yet (e.g. a summary figure), mark it **"optional addition"** so it
can be judged separately. Never make one silently.

## Constraints

- **Language:** the UI is German. Keep labels verbatim, including gender-inclusive forms
  with a colon („Trainer:in“, „Trainingspartner:innen“). German words run long, so
  design for them.
- **Implementation:** React + Tailwind CSS v4 + shadcn/ui (Radix). The design must be
  buildable by restyling these components and composing them differently. It must not
  depend on a different component library. See `05-design-system.md`.
- **Devices:** the Intranet is used mainly on desktop. The Extranet is used on phones in
  the field (recording a training right after it happens) as well as on desktop.
  *(Draft: Petros to confirm.)*
- **Accessibility:** keep WCAG 2.2 AA: contrast, visible focus, targets of at least 24 px.
  The current UI is keyboard- and screen-reader-accessible, and the redesign must not
  regress that.

## Folder contents

| Path | What |
|---|---|
| `01-product.md` | The organisation, the two apps, what they are for |
| `02-roles.md` | The six login roles, what each does, which screens each sees |
| `03-glossary.md` | Domain terms: English name, German UI label, one-line meaning |
| `04-screens/` | One file per screen: purpose, usage, full inventory, states, observations |
| `05-design-system.md` | Current components, tokens and patterns, and what is reusable |
| `06-usage-context.md` | Frequency, mode (reading vs. entering), device per role and screen |
| `07-pain-points.md` | What the owner finds impractical or ugly today |
| `08-references/` | Screenshots of designs the owner likes, each with a note on *what* to take from it |
| `screenshots/` | The current UI, every screen, desktop (1440 px) and mobile (390 px); `…/states/` holds dialogs, edit modes, validation errors and other interactive states |

Screenshots show the **current** state. They are a record of the inventory, not a layout
to keep. Some lists contain leftover automated-test records (names starting with „E2E“).
Ignore those names, but note that real data can be just as long.
