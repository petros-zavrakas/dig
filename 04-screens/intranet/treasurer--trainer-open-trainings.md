# Trainer-Abrechnung — Offene Trainings je Trainer:in

|                 |                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                      |
| **Role**        | Kassenwart:in (Treasurer)                                                                     |
| **Menu item**   | „Trainer-Abrechnung“ in the „Kassenwart:in“ section                                           |
| **Page title**  | „Offene Trainings je Trainer:in“                                                              |
| **URL**         | `/treasurer/trainer-open-trainings`                                                           |
| **Screenshots** | `screenshots/intranet/treasurer/11-trainer-open-trainings--desktop.png`, `…--mobile.png`      |

## Purpose

The Kassenwart:in's check list for the **trainer track**: every training session a
Trainer:in conducted, grouped per Trainer:in with her count and sums (duration, kilometres,
travel reimbursement). Trainer:innen invoice the association themselves from the Extranet
(their „Eigenrechnungs-Lauf“); this page is where she checks an incoming trainer invoice
against the sessions. With „Eigenrechnungs-Status“ she switches between sessions not yet
in a trainer's run („offen“), in a run in preparation („im Lauf“), and already invoiced
(„abgerechnet“) — and in the last case narrows to one invoice number, so the group sums are
exactly that invoice's figures.

The page is **read-only**: no selection, no editing, no actions besides filters, the column
menu, collapsing groups and links out.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** whenever a trainer invoice arrives — a few per month, more at quarter end.
- **Mode:** checking. Pick a Trainer:in (and „abgerechnet“ + the invoice number), compare the
  group sums with the invoice. No data entry.
- **Typical volume:** 5–15 Trainer:innen; a busy one has 60–90 open sessions (the seed data
  shows 89, 3 and 61). Unfiltered, the page is very long.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Above the table (each one appears only in some states)

| Element        | Text                                                                                                                              | When                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Warning banner | „Die Erstattungssätze der Trainer:innen sind noch nicht gepflegt — Fahrtkosten können nicht berechnet werden.“ + link „Tarife pflegen“ | Trainer reimbursement rates not maintained (the „Fahrtkosten“ column and its sum then disappear); shows over an empty list too |
| Error alert    | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“                                                          | Load failed                                                                            |
| Loading text   | „Lade ...“                                                                                                                        | Before the first answer                                                                |

### Filters (left part of the table's toolbar)

All filters narrow the loaded list in the browser and are kept in the URL; group sums run
over what is left.

| Filter                    | Type                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| „Trainer:in“              | Typeahead picker, single choice, shown as a dashed button carrying the title (or the chosen name); „Keine Treffer.“ when the search matches nothing |
| „Von“                     | Date (session date)                                                                                                                           |
| „Bis“                     | Date (session date)                                                                                                                           |
| „Quartal“                 | Select (only quarters that contain sessions, newest first, e.g. „Q3 2026“); choosing one fills „Von“/„Bis“. Disabled when there are no rows   |
| „Eigenrechnungs-Status“   | Native select, no empty option: „offen“ (default), „im Lauf“, „abgerechnet“. Any value other than „offen“ counts as a set filter              |
| „Rechnungsnr.“            | Search field, **only while „abgerechnet“ is chosen**. Exact match on the Trainer:in's invoice number (trimmed, case-insensitive)               |
| „Filter zurücksetzen“     | Ghost button, only while a filter is set; resets everything, the status back to „offen“                                                       |

### Toolbar (right part)

- „Alle zuklappen“ / „Alle aufklappen“: collapse or expand all Trainer:in groups
- „Spalten“: column visibility menu

### Table

Rows are **grouped by Trainer:in**. Each group header row has a collapse chevron, the
Trainer:in's name with „n Trainings“ underneath, and sums under their columns:
Σ Dauer (h:mm, not wrapped at 24 h), Σ gefahrene km („—“ when no session has kilometres),
Σ Fahrtkosten (missing amounts counted beside the figure in amber: „15,00 € + 1 nicht
berechenbar“, or „3 nicht berechenbar“ alone). No figure across Trainer:innen. No column
is sortable; the server fixes the order. A group training is **one row**.

| Column                         | Shown by default | Can be hidden | Notes                                                                                                                                                         |
| ------------------------------ | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Datum                          | yes              | no            | Link to the training detail; plain text for a group training                                                                                                  |
| Rechnungsnr.                   | yes              | yes           | **Only while „abgerechnet“ is chosen**: the Trainer:in's invoice number, „—“ if missing                                                                       |
| Rechnungsdatum                 | yes              | yes           | **Only while „abgerechnet“ is chosen**                                                                                                                        |
| Dauer                          | yes              | no            | h:mm                                                                                                                                                          |
| Hund                           | yes              | yes           | A group training lists all its dogs, comma-separated                                                                                                          |
| Trainingspartner:in zur Zeit   | no               | yes           | Comma-separated for a group training                                                                                                                          |
| Trainingsart                   | yes              | no            | Preceded by the **documentation badge**. A group training reads „Gruppentraining · ‹n› Teams“ and links to the training list narrowed to that group             |
| gefahrene km                   | yes              | no            | „—“ when empty; amber „uneinheitlich“ when a group's teams disagree                                                                                           |
| Ticketkosten                   | yes              | yes           | Amber „uneinheitlich“ when a group's teams disagree                                                                                                           |
| Fahrtkosten                    | yes              | no            | Header carries the „Hinweis“ info icon with the tooltip „Fahrtkosten: die Erstattung an die Trainer:in je Training — Pauschale, gefahrene km × km-Satz oder Fahrkarte, mindestens die Pauschale; ohne Anfahrt 0,00 €. Vorläufig zu den aktuellen Sätzen: verbindlich werden sie erst im Eigenrechnungs-Lauf der Trainer:in.“ Withdrawn while the banner shows |
| Kostenpflicht-Variante         | yes              | yes           | Information only; „—“ when empty; „uneinheitlich“ + neutral „Hinweis“ for a group whose teams differ. Always the last column                                   |

### Cell markers

- **Amber „nicht berechenbar“ pill** (words visible) in place of a missing Fahrtkosten
  amount, reason in its tooltip: „Die Fahrtkosten sind nicht deklariert. Korrektur durch die
  Trainingskoordinator:in.“ or „Die Teams dieses Gruppentrainings haben unterschiedliche
  Fahrtangaben. Korrektur durch die Trainingskoordinator:in.“
- **Amber „uneinheitlich“ pill** in place of a group's kilometres or ticket cost, same
  group-journey tooltip.
- **Neutral „Hinweis“** (small round grey info icon): after 0,00 € with „Keine Anfahrt: Die
  Trainer:in ist nicht angereist.“; after the variant „uneinheitlich“ with „Die Teams dieses
  Gruppentrainings haben unterschiedliche Kostenpflicht-Varianten.“
- **Documentation badge** (round icon before „Trainingsart“): green „Dokumentation fertig“ /
  orange „Dokumentation offen — Sach-Felder können sich noch ändern“, for a group „Dokumentation
  offen — nicht bei allen Teams fertig. Sach-Felder können sich noch ändern.“

### Empty states (shown in place of the table; the toolbar stays)

- No filter set: „Keine offenen Trainings.“
- A filter set (including a status other than „offen“): „Keine Treffer für diese Filter.“ +
  button „Filter zurücksetzen“

## Behaviour the layout must keep

- The group sums are what she compares with an invoice, so they must stay with their group
  and aligned under (or clearly labelled with) their columns.
- „Rechnungsnr.“ (filter and the two columns) exists only while „abgerechnet“ is chosen.
- Filter options come from all rows, so one filter never empties another's options.
- Collapse state is per Trainer:in and survives a group leaving and returning through a filter.
- Filters only narrow; the banner depends on the data alone, not on the filters.

## Observations on the current layout (input for layout proposals)

- **The table is broken at 1440 px by long values:** the „Hund“ column of a group training
  lists every dog in one unwrapped line; with long names (here test data such as
  „E2E-Beitritt-A-16596-…, E2E-Beitritt-B-…, …“) it stretches „Hund“ across the whole width,
  and every column after it — Trainingsart, km, Ticketkosten, Fahrtkosten, variant — is pushed
  off-screen. Only Datum, Dauer, Hund and the edge of the documentation badge are visible.
  Real data with three or four dogs per group will do the same.
- Unfiltered, the page is extremely long (about 150 rows, over 6,600 px on desktop): every
  group starts expanded. The group headers are only a light grey band, so the Trainer:in
  boundaries are easy to miss while scrolling.
- The Trainer:in name in the group header sits in the narrow „Datum“ column, and Σ Dauer
  („111:55“) appears under „Dauer“ — the other sums are off-screen in the current view.
- The „Trainer:in“ picker is a dashed button without a label above it, while every other
  filter has a label; it reads differently from its neighbours.
- „Eigenrechnungs-Status“ is the most important switch on the page (it changes the meaning
  of the whole list), but it looks like just another filter in the row.
- Mobile: the filters wrap into several rows, the table shows only Datum, Dauer and Hund, and
  the page is more than 13,000 px tall.
- There is no overview of totals per Trainer:in outside the table. _Any summary would be a
  new element, so only propose one as an optional addition, marked as such._
