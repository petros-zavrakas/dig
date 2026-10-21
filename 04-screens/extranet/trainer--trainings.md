# Meine Trainings (Trainer:in)

|                 |                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **Context**     | Extranet                                                                                               |
| **Role**        | Trainer:in                                                                                             |
| **Menu item**   | „Meine Trainings“ in the „Trainer:in“ section (also a button on „Startseite“)                          |
| **Page title**  | „Meine Trainings“                                                                                      |
| **URL**         | `/trainer/trainings`; narrowed to one group training: `/trainer/trainings?groupTrainingId=‹id›`        |
| **Screenshots** | `screenshots/extranet/trainer/03-trainings--desktop.png`, `…--mobile.png` (whole list, no group view) |

## Purpose

Every training the Trainer:in has recorded (she is the Trainer:in on all of them), newest
first. She uses it to find a training to look at, supplement or correct, to check whether
the Trainingskoordinator:in has released it for billing („Abrechnungsstatus“), and to see
the trainings of one group training together. It is also her entry to „Neues Training“.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** several times a week, usually right after recording a training or when
  preparing her own invoice.
- **Mode:** scanning and finding one training; occasional filtering by dog or date range.
- **Typical volume:** 50–200 trainings per year (the seed data has 120). The whole list is
  loaded at once; there is no paging.
- **Device:** phone in the field and desktop at home, roughly equally (draft).

## Inventory (fixed — every element must stay)

### Above the list

| Element            | Text                                                                                                       | When                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Button (primary)   | „Neues Training“ → `/trainer/trainings/new`                                                                | Always, also while loading or on error                   |
| Loading text       | „Lade ...“                                                                                                 | Before the first answer                                  |
| Error alert        | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“                                   | Load failed                                              |
| Group filter chip  | „Gruppentraining vom ‹Datum› · ‹Trainer:in›“ + a ✕ link (accessible name „Filter „Gruppentraining“ entfernen“) that returns to the whole list | `?groupTrainingId=` is set |
| Group filter chip  | „Gruppentraining nicht gefunden“ + the same ✕                                                              | `?groupTrainingId=` matches none of her trainings        |

### Filters

All filters narrow the list, the summary and the cards together. Facet filters are
multi-select popovers with a search field (placeholder = the facet title), one checkbox
per option and a count per option; while something is selected the trigger shows the
selected labels (on wide screens; more than two → a number) or a count. „Keine Treffer.“
when the search inside a facet matches nothing. Options only list values that occur in the
loaded trainings.

| Filter              | Type                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| „Hund“              | Facet; call names, plus „(keine Angabe)“ when a training has no resolved dog name                                          |
| „Trainingsart“      | Facet; „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“, „Spezialtraining“, „Nachsorge“, plus „(keine Angabe)“ |
| „Inhalt“            | Facet; „Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“          |
| „Abrechnungsstatus“ | Facet; „noch nicht freigegeben“, „zur Abrechnung freigegeben“, „im Abrechnungs-Lauf“, „abgerechnet“                        |
| „Von“               | Date (labelled)                                                                                                            |
| „Bis“               | Date (labelled)                                                                                                            |

There is no „Filter zurücksetzen“ button on this page and no column visibility menu.

### Summary strip

„Anzahl: ‹n›“ and „Σ Dauer: ‹h:mm›“ — over the currently filtered trainings.

### Table (desktop, from the `md` breakpoint up)

Opens sorted by Datum, newest first. Every column header is a sort control.

| Column                       | Notes                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Datum                        | `TT.MM.JJJJ`, underlined link to the training detail — the **only** way into a training                                    |
| Dauer                        | h:mm                                                                                                                        |
| Hund                         | Call name, „—“ when unresolved                                                                                              |
| Trainingspartner:in zur Zeit | The Trainingspartner:in at the time of the training                                                                         |
| Trainingsart                 | Label; for a training that belongs to a group training it is an underlined link to this list narrowed to that group; „—“ when empty |
| Inhalt                       | One outlined badge per content value; „—“ when empty                                                                        |
| Abrechnungsstatus            | Grey badge with the state label; a second grey badge „Eigenrechnung abgerechnet“ when the training is in one of her closed self-invoices |

### Cards (phone, below the `md` breakpoint — the table is hidden)

One bordered card per training, same order and filtering as the table:

- Heading: the date as link to the detail, and on the right the Abrechnungsstatus badge(s).
- Label/value rows: „Dauer“, „Hund“, „Trainingspartner:in zur Zeit“, „Trainingsart“
  (with the group link), „Inhalt“ (badges).

### Empty state

„Keine Einträge.“ — as a table row on desktop and as text in place of the cards on the
phone. Shown both when she has no trainings and when the filters match nothing.

## Behaviour the layout must keep

- The date is the entry into the detail (table cell and card heading). Rows are not
  clickable as a whole today; if a layout makes the whole card or row the target, the
  date must still read as the link (proposal, not a change of inventory).
- The group view is an address: it survives a reload and is reached from links (the
  „Training gespeichert“ page after a group capture, a „Gruppentraining“ cell). The chip
  must always be visible while the list is narrowed, so the narrowed list never looks like
  her whole list. All other filters work inside the group.
- Filters, summary, table and cards always show the same set of trainings.
- „Neues Training“ does not move while the list loads or fails.

## Observations on the current layout (input for layout proposals)

- Desktop: the page is long (120 rows in one table, about 5700 px tall); there is no
  paging or grouping. The table is wider than its container because of long test names in
  „Hund“ and „Trainingspartner:in zur Zeit“: at 1440 px only Datum, Dauer, Hund and
  Trainingspartner:in zur Zeit are visible, and Trainingsart, Inhalt and Abrechnungsstatus
  (the column she most wants to scan) are cut off to the right. Real names can be long too.
- Desktop: row heights vary (rows with two Inhalt badges are taller), so the list looks
  uneven.
- The filter triggers are small dashed buttons; „Von“/„Bis“ have labels above, the facets
  do not, so the filter row has a ragged baseline.
- „Neues Training“ sits alone at the top right, far from the filters, with a large empty band.
- Phone: the filters wrap into four rows (three facets, „Abrechnungsstatus“ with „Von“, then
  „Bis“ alone) and take the first screen together with the summary; the first card starts
  about 700 px down (at 2x).
- Phone: the full list is one very long scroll (about 52 000 px at 2x for 120 cards). Each
  card is about 440 px tall at 2x; the label column is wide because of
  „Trainingspartner:in zur Zeit“, which pushes values to the right half, and long Inhalt
  badges („Reaktionsschulung“) overflow the card's right edge.
- Phone: the status badge is the only colour-free marker; „noch nicht freigegeben“ and
  „zur Abrechnung freigegeben“ look identical apart from the text.
- The summary strip („Anzahl: 120 Σ Dauer: 150:25“) is plain bold text and easy to miss.
