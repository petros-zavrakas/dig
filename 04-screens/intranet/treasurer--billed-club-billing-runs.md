# Abgeschlossene Rechnungen

|                 |                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                    |
| **Role**        | Kassenwart:in (Treasurer)                                                                   |
| **Menu item**   | „Abgeschlossene Rechnungen“ in the „Kassenwart:in“ section (directly after „Rechnungen“)    |
| **Page title**  | „Abgeschlossene Rechnungen“                                                                 |
| **URL**         | `/treasurer/billed-club-billing-runs`                                                       |
| **Screenshots** | `screenshots/intranet/treasurer/09-billed-club-billing-runs--desktop.png`, `…--mobile.png`  |

## Purpose

Every closed club billing run, **one row per invoice**, so the Kassenwart:in can find any
invoice the portal knows — by Trainingspartner:in, by invoice date or by invoice number —
open its run, or download its invoice attachment („Anlage zur Rechnung“) as a PDF. Each row
shows what was stored at the close, so later renamings or deletions never change it.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** occasional — when a team asks about an invoice, at year end, or to download
  an attachment for sending or archiving.
- **Mode:** looking up. Filter or search, then open a run or download a PDF. No data entry.
- **Typical volume:** grows by 30–60 rows per quarter; a few hundred after a year or two.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Above the table (each one appears only in some states)

| Element      | Text                                                                       | When                    |
| ------------ | -------------------------------------------------------------------------- | ----------------------- |
| Loading text | „Lade ...“                                                                 | Before the first answer |
| Error alert  | „Rechnungen konnten nicht geladen werden. Bitte später erneut versuchen.“  | Load failed             |

### Filters (in the table's toolbar)

All filters narrow the loaded list in the browser and are kept in the URL, so Back from a
run's page restores the view.

| Filter                    | Type                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| „Trainingspartner:in“     | Native select of the stored names among all rows, alphabetical; blank first option = all                             |
| „Von“                     | Date (on the invoice date)                                                                                            |
| „Bis“                     | Date (on the invoice date)                                                                                            |
| „Quartal“                 | Select of quarters that contain an invoice, newest first, e.g. „Q3 2026“; choosing one fills „Von“/„Bis“. Disabled when there are no rows |
| „Rechnungsnummer suchen“  | Search field, case-insensitive part of the number                                                                     |
| „Filter zurücksetzen“     | Ghost button, only while a filter is set                                                                              |

### Table

Sorted newest invoice first (invoice date, then number). No column menu, no sorting by the
user, no column hiding. No sum across rows.

| Column                        | Notes                                                                                                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rechnungsdatum                |                                                                                                                                                                                                      |
| Rechnungsnr.                  | Link to the run's page                                                                                                                                                                               |
| Trainingspartner:in · Hund    | „‹Trainingspartner:in› · ‹Hund›“                                                                                                                                                                     |
| Zeitraum                      | The period label, free text (e.g. „Q1/2026“, „09/2025 – 01/2026“)                                                                                                                                    |
| Trainings                     | Count                                                                                                                                                                                                |
| Summe                         | Euro amount                                                                                                                                                                                          |
| (no visible header)           | Round icon button „PDF herunterladen“ (download icon, tooltip „PDF herunterladen“; spinner while downloading). Hidden header text „Anlage zur Rechnung“. **Warning-coloured** (amber) with the tooltip „PDF noch nicht erstellt – wird beim ersten Herunterladen erzeugt.“ while the attachment has not been generated yet |

Download errors appear under the button in the row, as a destructive alert:
„Die Anlage konnte nicht erstellt werden. Bitte später erneut versuchen.“,
„Die Anlage ist beschädigt oder fehlt – bitte die Administration informieren.“ or
„Die Anlage konnte nicht heruntergeladen werden. Bitte später erneut versuchen.“

### Empty states (shown in place of the table)

- No filter set: „Noch keine abgeschlossenen Rechnungen.“
- A filter set: „Keine Rechnungen für diese Filter.“ + button „Filter zurücksetzen“

## Behaviour the layout must keep

- The filter options are drawn from all rows, so choosing one filter never empties another
  filter's options.
- The toolbar stays visible over an empty filtered result, so the filter can be undone.
- The amber download button means "not generated yet", not an error; the first download may
  take a moment. The two states must stay distinguishable without relying on colour alone
  (the tooltip and accessible description carry the text).
- A row's download error must stay attached to that row.

## Observations on the current layout (input for layout proposals)

- Desktop: the table fits at 1440 px, but the columns are spread evenly, so the narrow
  values („Trainings“, „Summe“) get as much room as the team name; amounts are left-aligned.
- Almost every download button is amber (not generated yet) and only a few are black, so the
  last column reads as a column of warnings although nothing is wrong.
- The filter bar is a row of labelled native fields above the table, with an empty
  „Trainingspartner:in“ select and empty „Quartal“ select that give no hint of their content.
- Mobile: the filters stack into one tall column, and the table is cut after the third
  column — „Trainingspartner:in · Hund“, „Summe“ and the download button are off-screen and
  need horizontal scrolling. The download, the main action, is not reachable without it.
- Nothing groups the list by period or year, although invoices are created in quarterly
  bursts (many rows share one date). _Any grouping or summary would be a new element, so only
  propose one as an optional addition, marked as such._
