# Meine Trainings (Trainingspartner:in)

|                 |                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **Context**     | Extranet                                                                                               |
| **Role**        | Trainingspartner:in                                                                                    |
| **Menu item**   | „Meine Trainings“ in the „Trainingspartner:in“ section (also a button on „Startseite“)                 |
| **Page title**  | „Meine Trainings“                                                                                      |
| **URL**         | `/training-partner/trainings`                                                                          |
| **Screenshots** | `screenshots/extranet/training-partner/03-trainings--desktop.png`, `…--mobile.png`                    |

## Purpose

The trainings of every team the Trainingspartner:in keeps (her dogs), whoever recorded
them — newest first. She looks up what happened in a training, reads the Trainer:in's
remark, and opens a training to add or correct her own part. It is also her entry to
„Neues Training“. Unlike the Trainer:in's list it shows no billing state (she has none)
and it shows both remarks.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** weekly or less.
- **Mode:** reading. Occasional filtering by dog when she has more than one.
- **Typical volume:** 20–60 trainings per year (the seed data has 45).
- **Device:** mainly the phone (draft).

## Inventory (fixed — every element must stay)

### Above the list

| Element          | Text                                                                     | When                                   |
| ---------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| Button (primary) | „Neues Training“ → `/training-partner/trainings/new`                     | Always, also while loading or on error |
| Loading text     | „Lade ...“                                                               | Before the first answer                |
| Error alert      | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“ | Load failed                            |

There is no group-training view on this page.

### Filters

Same mechanics as on the Trainer:in's list: multi-select facet popovers with a search
field, a checkbox and count per option, „Keine Treffer.“ when the search matches nothing;
options only list values present in the data.

| Filter         | Type                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| „Hund“         | Facet; call names, plus „(keine Angabe)“ when a dog name is unresolved                                                     |
| „Trainingsart“ | Facet; „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“, „Spezialtraining“, „Nachsorge“, plus „(keine Angabe)“ |
| „Inhalt“       | Facet; „Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“          |
| „Von“          | Date (labelled)                                                                                                            |
| „Bis“          | Date (labelled)                                                                                                            |

No „Abrechnungsstatus“ facet, no reset button, no column visibility menu.

### Summary strip

„Anzahl: ‹n›“ and „Σ Dauer: ‹h:mm›“ — over the filtered trainings.

### Table (desktop, from the `md` breakpoint up)

Opens sorted by Datum, newest first. Every column except the two remarks is sortable.

| Column                         | Notes                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------- |
| Datum                          | `TT.MM.JJJJ`, underlined link to the training detail (the only entry)         |
| Dauer                          | h:mm                                                                          |
| Hund                           | „—“ when unresolved                                                           |
| Trainer:in                     |                                                                               |
| Trainingsart                   | Plain label (no group link); „—“ when empty                                   |
| Inhalt                         | Outlined badges; „—“ when empty                                               |
| Bemerkung Trainer:in           | Cut off after one line (about 256 px) with an ellipsis; full text as a tooltip; „—“ when empty |
| Bemerkung Trainingspartner:in  | Same                                                                          |

### Cards (phone, below `md` — the table is hidden)

- Heading: the date as link to the detail; on the right a grey badge with the
  **Trainingsart** (or „—“).
- Label/value rows: „Dauer“, „Hund“, „Trainer:in“, „Inhalt“ (badges), „Bemerkung
  Trainer:in“, „Bemerkung Trainingspartner:in“ — the remarks wrap in full.

### Empty state

„Keine Einträge.“ (table row on desktop, text instead of the cards on the phone).

## Behaviour the layout must keep

- The date is the entry into the detail, on table and card.
- Filters, summary, table and cards always show the same set.
- Remarks are shown in full on the phone; on desktop the full text must stay reachable.

## Observations on the current layout (input for layout proposals)

- Desktop: eight columns do not fit at 1440 px; „Bemerkung Trainingspartner:in“ is cut
  off at the right edge and needs horizontal scrolling. The remark columns, the most
  readable content for her, get truncated.
- Desktop: the filter row has labels only above „Von“/„Bis“, giving a ragged baseline;
  „Neues Training“ sits alone in a wide empty band at the top right.
- Phone: „Von“ and „Bis“ each take their own row, so filters plus summary fill the first
  screen; the first card starts about 700 px down (at 2x). The whole list is one long scroll
  (about 24 000 px at 2x for 45 cards).
- Phone: the label column is very wide („Bemerkung Trainingspartner:in“), squeezing the
  values into the right third; a remark wraps into a narrow column of three or more lines,
  and long Inhalt badges overflow the card's right edge.
- Phone: the badge in the card heading is the Trainingsart, while on the Trainer:in's cards
  the same position holds the billing state — the same visual element means different
  things for the two roles.
