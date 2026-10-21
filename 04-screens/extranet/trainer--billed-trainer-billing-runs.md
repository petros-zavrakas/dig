# Abgeschlossene Rechnungen — Abgeschlossene Eigenrechnungen

|                 |                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                             |
| **Role**        | Trainer:in                                                                                           |
| **Menu item**   | „Abgeschlossene Rechnungen“ in the „Trainer:in“ section (after „Rechnung“)                          |
| **Page title**  | „Abgeschlossene Eigenrechnungen“                                                                     |
| **URL**         | `/trainer/billed-trainer-billing-runs`                                                               |
| **Screenshots** | `screenshots/extranet/trainer/09-billed-trainer-billing-runs--desktop.png`, `…--mobile.png`          |

## Purpose

The Trainer:in's archive of her closed „Eigenrechnungs-Läufe“, newest first, named after
the invoices she closed them with. From here she opens a closed run or downloads its PDF
attachment („Anlage zur Eigenrechnung“) again.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** rare; a few times a year, to find an old invoice or download its PDF again.
- **Mode:** looking up one invoice by number, date or period.
- **Typical volume:** 4–12 runs per year, growing over the years (the seed shows 5).
- **Device:** desktop and phone.

## Inventory (fixed — every element must stay)

### States

| Element      | Text                                                                          | When                      |
| ------------ | ----------------------------------------------------------------------------- | ------------------------- |
| Loading text | „Lade ...“                                                                    | Before the first answer   |
| Error alert  | „Eigenrechnungen konnten nicht geladen werden. Bitte später erneut versuchen.“ | Load failed               |
| Empty state  | „Noch keine abgeschlossenen Eigenrechnungen.“ (centred, in a bordered box)    | She has no closed run     |

There are no filters, no sorting, no column menu and no totals on this page.

### Table (desktop, from the `md` breakpoint)

| Column          | Notes                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Rechnungsdatum  | dd.mm.yyyy                                                                                                           |
| Rechnungsnr.    | Her own invoice number, as a link to the run page (whose back arrow returns here)                                    |
| Zeitraum        | The period label, free text (e.g. „Q2/2025“, „09/2025 – 10/2025“)                                                    |
| Sitzungen       | Number of sessions                                                                                                   |
| Summe           | Euro                                                                                                                 |
| (no header text; screen-reader label „Anlage zur Eigenrechnung“) | Round download icon button, tooltip and accessible name „Anlage zur Eigenrechnung herunterladen“; shows a spinner while loading |

Under a download button, on failure: „Die Anlage konnte nicht erstellt werden. Bitte später
erneut versuchen.“ / „Die Anlage konnte nicht heruntergeladen werden. Bitte später erneut
versuchen.“

### Cards (phone, below the `md` breakpoint; replace the table)

- header: the invoice number as a link (left), the round download button (right)
- label–value list: „Rechnungsdatum“, „Zeitraum“, „Sitzungen“, „Summe“

## Behaviour the layout must keep

- Newest first, as the server sends it.
- The invoice number is the way into the run; the download needs no detour through the run.
- The column header „Sitzungen“ (not „Trainings“): a group training counts as one session.

## Observations on the current layout (input for layout proposals)

- Desktop: a short, plain table; columns are spread wide over 1,090 px, so the eye travels
  far between number and amount. „Summe“ is left-aligned like text, not aligned as a number.
- The download button is a solid black circle on every row, the heaviest element on the
  page, heavier than the invoice number she is looking for.
- Phone: each card repeats four labels; the invoice number is the card heading and the date
  second, which suits lookup by number but not by date.
- Phone: the header title wraps over two lines („Abgeschlossene / Eigenrechnungen“) next to
  the wrapping account name.
- A thin grey line is left under the last card: the border of the hidden desktop table.
- Menu label („Abgeschlossene Rechnungen“) and page title („Abgeschlossene
  Eigenrechnungen“) differ; both are fixed.
