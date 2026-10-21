# Hunde — the dog list (all three Intranet roles)

|                 |                                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                                                                                                                            |
| **Role**        | Trainingskoordinator:in (Training coordinator), Kassenwart:in (Treasurer), Vorstand (Board) — one shared list component, see "Differences per role"                                                |
| **Menu item**   | „Hunde“ in the „Trainingskoordinator:in“, the „Kassenwart:in“ and the „Vorstand“ section (one entry per role)                                                                                        |
| **Page title**  | „Hunde“ (in the header; no back arrow)                                                                                                                                                              |
| **URL**         | `/training-coordinator/dogs`, `/treasurer/dogs`, `/board/dogs`                                                                                                                                      |
| **Screenshots** | `screenshots/intranet/training-coordinator/03-dogs--desktop.png`, `…--mobile.png`; `screenshots/intranet/treasurer/03-dogs--…`; `screenshots/intranet/board/03-dogs--…`                              |

## Purpose

The club's census of dogs. Each row is one dog (Hund) with its master data; the call name
(„Rufname“) opens the dog file. The Trainingskoordinator:in also starts creating a new dog
here. The list opens showing **active dogs only**; archived dogs are reachable through the
„Status“ filter.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** Trainingskoordinator:in several times a week (as the way into a dog file);
  Kassenwart:in and Vorstand occasionally.
- **Mode:** looking up one dog by call name, or narrowing by litter, phase or entry year to
  get an overview. No data entry.
- **Typical volume:** 30–80 dogs, all loaded at once (no paging). Filtering happens in the
  browser, instantly.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Above the table

| Element                           | Text                                                                   | When                                      |
| --------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| Primary button (link)             | „Hund anlegen“ → `/training-coordinator/dogs/new`                      | Trainingskoordinator:in only, always      |
| Loading text                      | „Lade ...“                                                             | Before the first answer                   |
| Error alert (red)                 | „Hunde konnten nicht geladen werden. Bitte später erneut versuchen.“   | Load failed                               |

### Filters

All filters work in the browser on the loaded list. Within one filter the chosen options
combine with OR, across filters with AND. Each faceted filter is a dashed outline button
that opens a searchable checklist (search field with the filter's name as placeholder) with
a count per option; „Keine Treffer.“ when the search matches nothing. Once something is
chosen, the button shows the chosen labels as small badges (wide screens, up to two) or a
count (narrow screens, or more than two chosen).

| Filter            | Type                                   | Options                                                                                                                                                     |
| ----------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Phase“           | Faceted multi-select                   | „Welpe“, „Patenzeit“, „Grundausbildung“, „Spezialausbildung“, „Teamphase“, „Nachbetreuung“, „Rente“, „Archiv“; plus „(keine Angabe)“ when a dog has no phase |
| „Ausbildungsart“  | Faceted multi-select                   | „Vereins-Fremdausbildung“, „Selbstausbildung“; plus „(keine Angabe)“ when needed                                                                            |
| „Wurf“            | Faceted multi-select                   | The litters present in the data, alphabetical; plus „(keine Angabe)“ when needed                                                                             |
| „Eintrittsjahr“   | Faceted multi-select                   | The entry years present in the data, newest first; plus „(keine Angabe)“ when needed. Filters on a hidden column (there is no „Eintrittsjahr“ column)        |
| „Status“          | Faceted multi-select                   | „Aktiv“, „Archiviert“. **Pre-set to „Aktiv“** when the page opens                                                                                            |
| „Rufname“         | Text search with a visible label „Rufname“ | Placeholder (and accessible name) „Nach Rufname filtern“; case-insensitive substring match                                                              |

There is no „Filter zurücksetzen“ button (each filter is cleared on its own) and no column
menu („Spalten“) on this page.

### Table

Sorting is in the browser, on three columns only: „Rufname“, „Geburtsdatum“,
„Eintrittsdatum“. Their headers are buttons with an arrow (up/down for the active column,
a neutral double chevron otherwise). Default: Rufname ascending. Dogs without an entry date
sort last in both directions.

| Column          | Notes                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- |
| Rufname         | Sortable. Link (bold, underline on hover) to the dog file of the calling role              |
| Geburtsdatum    | Sortable. dd.mm.yyyy                                                                       |
| Phase           | Label, or muted „—“                                                                        |
| Ausbildungsart  | Label, or muted „—“                                                                        |
| Status          | Badge: „Aktiv“ (outline) or „Archiviert“ (grey)                                            |
| Wurf            | Free text, or muted „—“                                                                    |
| Eintrittsdatum  | Sortable. dd.mm.yyyy, or „—“                                                               |

All seven columns are always shown; none can be hidden.

### Empty state

„Keine Einträge.“ in place of the rows (both when there are no dogs and when the filters
match none).

## Differences per role

| Aspect                     | Trainingskoordinator:in              | Kassenwart:in            | Vorstand            |
| -------------------------- | ------------------------------------ | ------------------------ | ------------------- |
| „Hund anlegen“ button      | yes                                  | **no**                   | **no**              |
| Rufname link goes to       | `/training-coordinator/dogs/:id`     | `/treasurer/dogs/:id`    | `/board/dogs/:id`   |
| Filters, columns, data     | identical                            | identical                | identical           |

## Behaviour the layout must keep

- The list opens filtered to „Aktiv“, and that pre-set must be visible on the „Status“
  filter, otherwise archived dogs look missing.
- Filter counts react to the other filters (each option's count is computed against the
  other active filters).
- The „Rufname“ field filters as you type.

## Observations on the current layout (input for layout proposals)

- The „Hund anlegen“ button sits alone on its own row above the filters, far from the page
  title, so the page spends about 60 px on one button.
- The „Rufname“ search is the most used control but sits last in the filter row, after five
  facet buttons; its label floats above the row and breaks the row's baseline.
- At 1440 px the table fits, but the „Rufname“ column grows to the longest name (long test
  names push it past 300 px) while the other columns are compact. Plain names leave a wide
  empty band.
- The „Status“ column says „Aktiv“ on every row of the default view, which is noise.
- 40 rows of equal weight with no grouping; scanning by litter or phase relies entirely on
  the filters.
- Mobile: the filters wrap onto three lines, and the table overflows horizontally — only
  „Rufname“ and the start of „Geburtsdatum“ are visible, with no sign that more columns
  exist to the right.
