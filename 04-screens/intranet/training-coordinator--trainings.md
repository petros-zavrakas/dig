# Trainings — the training list (all three Intranet roles)

|                 |                                                                                                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                                                                                                                                              |
| **Role**        | Trainingskoordinator:in (Training coordinator), Kassenwart:in (Treasurer), Vorstand (Board) — one shared list component, see "Differences per role"                                                                    |
| **Menu item**   | „Trainings“ in the „Trainingskoordinator:in“, the „Kassenwart:in“ and the „Vorstand“ section (one entry per role)                                                                                                     |
| **Page title**  | „Trainings“                                                                                                                                                                                                           |
| **URL**         | `/training-coordinator/trainings`, `/treasurer/trainings`, `/board/trainings` (filters, sort and page live in the URL query)                                                                                          |
| **Screenshots** | `screenshots/intranet/training-coordinator/10-trainings--desktop.png`, `…--mobile.png`; `screenshots/intranet/treasurer/05-trainings--desktop.png`, `…--mobile.png`; `screenshots/intranet/board/05-trainings--desktop.png`, `…--mobile.png`<br>**States:** `screenshots/intranet/treasurer/states/08-trainings-edit-mode--desktop.png` (each also `--mobile.png`) |
## Purpose

The club-wide census of every recorded training, newest first. Each role reads it for her
own job: the Trainingskoordinator:in checks and corrects what the field recorded, the
Kassenwart:in prepares billing, the Vorstand looks things up. The two writing roles also
use it to classify trainings (Kostenpflicht-Variante) and to release them for billing
(„zur Abrechnung freigeben“, the Billable mark) — one row at a time or a whole page at once.
Every row's date opens the training detail „Training“.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** Trainingskoordinator:in and Kassenwart:in several times a week; the
  Vorstand occasionally.
- **Mode:** mostly scanning and filtering (by Trainer:in, Hund, period, Abrechnungsstatus).
  In the edit mode the writing roles work row by row through a page: set the
  Kostenpflicht-Variante, press „Freigeben“, or release the whole page.
- **Typical volume:** a few hundred trainings in total (seed data: 186), 50 rows per page.
- **Device:** desktop. The table has up to 14 columns.

## Inventory (fixed — every element must stay)

### Above the table (each one appears only in some states)

| Element                     | Text                                                                                                   | When                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Loading text                | „Lade ...“                                                                                             | Before the first answer                                                                                   |
| Error alert                 | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“                               | Load failed                                                                                               |
| Group-training filter chip  | „Gruppentraining vom ‹Datum› · ‹Trainer:in›“ + an ✕ icon button (accessible name „Filter „Gruppentraining“ entfernen“); just „Gruppentraining“ + ✕ when no row is left | The list is narrowed to one group training (reached by clicking a Trainingsart link or „In der Liste anzeigen“ on a detail page). Sits above the filters. |
| Notice alert (writers only) | One or more sentences (below) + button „Schließen“                                                     | After a page release („Seite freigeben“) or after an inline Kostenpflicht-Variante change that says something. Sits between the filters and the table; it takes focus so it scrolls into view. Red (destructive) only for the failure sentence. |

Sentences the notice alert can carry:

- Page release report, built from parts: „‹n› Trainings freigegeben“ (or „1 Training
  freigegeben“), then optionally „, ‹n› war/waren bereits freigegeben“ and „, ‹n› nicht
  möglich (‹Gründe›)“. Reasons: „im Abrechnungs-Lauf“, „abgerechnet“, „ohne
  Kostenpflicht-Variante“, „Kostenpflicht-Variante passt nicht“, „nicht mehr vorhanden“
  (with counts in front when there are several kinds, e.g. „2 abgerechnet, 1 nicht mehr
  vorhanden“).
- Second line when the „noch nicht freigegeben“ filter is set: „Die freigegebenen
  Trainings sind nicht mehr in dieser Liste (Filter „noch nicht freigegeben“).“
- Release failed (red): „Die Freigabe konnte nicht ausgeführt werden. Bitte später erneut
  versuchen.“
- Variant applied to a group training: „Auf ‹n› Trainings des Gruppentrainings angewendet“
- Variant does not fit: „Nicht geändert — die Variante passt nicht zur
  Gruppentraining-Zugehörigkeit des Trainings.“
- Variant refused for the whole group: „Nicht geändert — die Variante gilt für das ganze
  Gruppentraining (‹n› Teams).“ followed by sentences naming the blocking siblings, e.g.
  „Bruno (03.08.2026) ist in einem Abrechnungslauf.“, „… sind zur Abrechnung
  freigegeben.“, „… ist abgerechnet. Ein abgerechnetes Gruppentraining lässt sich nicht
  mehr umstellen.“, and the remedy „Um die Variante zu ändern, zuerst die Freigabe(n)
  zurücknehmen.“ / „Um die Variante zu ändern, zuerst diesen Lauf / diese Läufe verwerfen
  und die Freigabe(n) zurücknehmen.“

### Filters

All filters go to the server and return to page 1. Each faceted filter is a dashed outline
button that opens a searchable checklist with a count per option (counted over the page
in view); „Keine Treffer.“ when the search matches nothing. Once something is chosen the
button shows the chosen labels as small badges (wide screens, up to two) or a count
(narrow screens, or more than two chosen).

| Filter                   | Type                                     | Options                                                                                                                             |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| „Trainingsart“           | Faceted multi-select                     | „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“, „Spezialtraining“, „Nachsorge“                                    |
| „Inhalt“                 | Faceted multi-select                     | „Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“                          |
| „Abrechnungsstatus“      | Faceted multi-select                     | „noch nicht freigegeben“, „zur Abrechnung freigegeben“, „im Abrechnungs-Lauf“, „abgerechnet“                                       |
| „Kostenpflicht-Variante“ | Faceted multi-select                     | „ja“, „Gruppentraining mit Pauschale“, „Gruppentraining ohne Pauschale“, „nein“, „nicht gesetzt“                                    |
| „Trainer:in“             | Typeahead picker, single choice          | Server search over trainers; the chosen name shows as a badge on the button; first entry „Auswahl entfernen“ while one is chosen   |
| „Hund“                   | Typeahead picker, single choice          | Server search over dogs (call name); same behaviour as „Trainer:in“                                                                |
| „Von“                    | Date input with visible label            |                                                                                                                                     |
| „Bis“                    | Date input with visible label            | Range is inclusive                                                                                                                  |

There is no „Filter zurücksetzen“ button on this page (each filter is cleared on its own).

### Toolbar

- „Spalten“: column visibility menu (dropdown with a heading „Spalten“ and one checkbox per
  hideable column), at the right end of the filter row.

### Table

Sorting is server-side on four columns only: „Datum“, „Dauer“, „gefahrene km“,
„Ticketkosten“. Their headers are buttons with an arrow (up/down for the active column,
a neutral double chevron otherwise). Default: Datum, newest first. Clicking another
column sorts it ascending; clicking the active one flips the direction.

Columns of the Trainingskoordinator:in (14; the Kassenwart:in and the Vorstand have 12,
see "Differences per role"). Every column can be hidden through „Spalten“.

| Column                          | Shown by default | Notes                                                                                                                                         |
| ------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Datum                           | yes              | Sortable. Link (underlined) to the training detail                                                                                             |
| Dauer                           | yes              | Sortable. h:mm                                                                                                                                 |
| Hund                            | yes              | Call name                                                                                                                                     |
| Trainingspartner:in zur Zeit    | yes              |                                                                                                                                               |
| Trainer:in                      | yes              |                                                                                                                                               |
| Trainingsart                    | yes              | For a group-training member the label is a link that narrows the list to that group training (shows the chip above). „—“ when empty           |
| Abrechnungsstatus               | yes              | Grey badge: „noch nicht freigegeben“ / „zur Abrechnung freigegeben“ / „im Abrechnungs-Lauf“ / „abgerechnet“. Removed in the edit mode          |
| Kostenpflicht-Variante          | yes              | Read mode text: „ja ohne Anfahrt“, „ja mit Anfahrtspauschale“, „ja mit km-Abrechnung“, „ja mit Fahrkarte“, „ja (Fahrtkosten nicht deklariert)“, „Gruppentraining mit Pauschale“, „Gruppentraining ohne Pauschale“, „nein“, or „—“. Becomes a select in the edit mode |
| Inhalt                          | no               | One outline badge per content value; „—“ when empty                                                                                           |
| Bemerkung Trainer:in            | no               | Trainingskoordinator:in only. Truncated to one line (about 16 rem), full text on hover; „—“ when empty                                         |
| Bemerkung Trainingspartner:in   | no               | Trainingskoordinator:in only. Same as above                                                                                                   |
| Bemerkung Kasse                 | no               | Same as above                                                                                                                                 |
| gefahrene km                    | no               | Sortable. „—“ when empty                                                                                                                       |
| Ticketkosten                    | no               | Sortable. Euro                                                                                                                                 |
| Abrechnung                      | edit mode only   | Cannot be hidden. Always the last column. See "Edit mode"                                                                                     |

### Summary row (table footer)

One cell spanning the full width: „Anzahl: ‹n›“ and „Σ Stunden: ‹h:mm›“, computed over the
whole filtered set (not just the page).

### Pager (below the table)

„‹n› Trainings · Seite ‹x› von ‹y›“ on the left; buttons „Zurück“ and „Weiter“ on the right
(disabled at the ends).

### Release bar (Trainingskoordinator:in and Kassenwart:in only)

A bar floating at the bottom of the viewport, as wide as the page column, white with
border and shadow. Visible while the table is on screen.

- Text: „‹n› Trainings bereit zur Freigabe“ (bold) · „‹n› ohne Kostenpflicht-Variante“
  (muted). Each part disappears at zero.
- Button „Bearbeiten“ (outline), which reads „Bearbeiten beenden“ while the edit mode is on.
- Button „Seite freigeben (‹n›)“ (primary): releases every ready row of the current page in
  one request, without a confirmation step. Disabled at 0 and while a release runs.

"Ready" means: Abrechnungsstatus „noch nicht freigegeben“ and a Kostenpflicht-Variante that
fits the row's group-training membership.

### Edit mode (Trainingskoordinator:in and Kassenwart:in only)

Toggled with „Bearbeiten“. It survives paging and filtering but not leaving the page.

- **„Abrechnungsstatus“ column disappears.**
- **„Kostenpflicht-Variante“ becomes a compact select** (accessible name
  „Kostenpflicht-Variante“). Options: „— nicht gesetzt —“ (not offered once released),
  „ja“ (only for trainings outside a group training), „Gruppentraining mit Pauschale“ and
  „Gruppentraining ohne Pauschale“ (only for group-training members), „nein“. A stored value
  that no longer fits shows as a disabled „ungültig: ‹Variante›“. Saves on change. Disabled
  unless the training is „noch nicht freigegeben“. Tooltip: on a released row „Freigabe
  zurücknehmen, ändern, neu freigeben“; on a non-fitting value „Die gespeicherte Variante
  passt nicht zur Gruppentraining-Zugehörigkeit und gilt als nicht gesetzt.“
- **„Abrechnung“ column added**, one of three states per row:
  - not yet released: small primary button „Freigeben“ (accessible name „zur Abrechnung
    freigeben“), disabled while no fitting Kostenpflicht-Variante is set; to its right up to
    two round amber warning icons with tooltip: „Doku ist noch nicht abgeschlossen —
    Sach-Felder können sich noch ändern“ (document icon) and „Fahrtkosten nicht
    deklariert“ (car icon). Warnings never block.
  - released: green check + „freigegeben“, and at the right a small round outline icon
    button (undo arrow) „Freigabe zurücknehmen“.
  - in a run or billed: muted text „im Abrechnungs-Lauf“ or „abgerechnet“.

### Empty state

„Keine Einträge.“ in place of the rows (with or without filters).

## Differences per role

| Aspect                     | Trainingskoordinator:in                          | Kassenwart:in                            | Vorstand                       |
| -------------------------- | ------------------------------------------------ | ---------------------------------------- | ------------------------------ |
| Columns                    | 14 (all above)                                   | 12: no „Bemerkung Trainer:in“, no „Bemerkung Trainingspartner:in“ | 12, same as Kassenwart:in      |
| Hidden by default          | Inhalt, three Bemerkung columns, gefahrene km, Ticketkosten | Inhalt, Bemerkung Kasse, gefahrene km, Ticketkosten | same as Kassenwart:in          |
| Release bar, edit mode, notice alert | yes                                    | yes (same surface, her own endpoints)    | **none** — read-only, absent rather than disabled |
| Datum link goes to         | `/training-coordinator/trainings/:id`            | `/treasurer/trainings/:id`               | `/board/trainings/:id`         |
| Trainingsart group link    | narrows her own list                              | narrows her own list                     | narrows her own list           |

## Behaviour the layout must keep

- The release bar floats and stays reachable all the way down a 50-row page; the list
  reserves space at its bottom so the last rows and the pager can be scrolled out from under
  it. It hides when the table is out of view.
- The notice alert belongs to the rows, so it stays above the table and below the filters;
  it is never a toast that fades.
- „Seite freigeben“ acts on the page in view only (bounded to one server page). The count on
  the button must stay visible.
- The group-training chip must always be visible while that filter is set, so a narrowed
  list never looks like an incomplete one.
- The footer sums cover the whole filtered set and stay visible whichever columns are hidden.
- Sort, filters and page are in the URL, so a link reproduces the view.
- Warnings in the „Abrechnung“ column stay next to the „Freigeben“ button they qualify.

## Observations on the current layout (input for layout proposals)

- At 1440 px only four columns fit: „Trainingspartner:in zur Zeit“ grows to the longest name
  (long test names push it past 500 px), so „Trainer:in“, „Trainingsart“,
  „Abrechnungsstatus“ and „Kostenpflicht-Variante“ are off-screen and need horizontal
  scrolling. Real names can be long too (double names, „Trainer-Partner“).
- The page column is capped at about 1150 px, leaving wide empty margins on large screens
  while the table overflows.
- The filter row mixes dashed chip buttons with two labelled date inputs whose labels sit
  above them, so the row has a ragged top edge; „Spalten“ is far to the right, detached.
- On mobile the filters wrap into five rows (chips, then „Von“ and „Bis“ stacked, then
  „Spalten“) before the first training appears; the table then shows three columns and
  scrolls sideways.
- On mobile the release bar wraps to two lines and covers about three rows of the table.
- The summary row and the pager text are small and visually weak; „Anzahl“ and the pager's
  „186 Trainings“ repeat the same number.
- Rows are uniform: nothing signals status (open, released, billed) at a glance unless the
  Abrechnungsstatus column happens to be in view. The default sort and the active sort
  arrow are the only order cues.
- There is no visible indication of how many filters are active, or a way to clear them all.
  _A "clear all filters" control or an active-filter summary would be new — propose only as
  an optional addition._
