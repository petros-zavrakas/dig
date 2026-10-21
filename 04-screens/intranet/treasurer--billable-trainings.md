# Rechnungen — Offene abrechenbare Trainings

|                 |                                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| **Context**     | Intranet                                                                             |
| **Role**        | Kassenwart:in (Treasurer)                                                            |
| **Menu item**   | „Rechnungen“ in the „Kassenwart:in“ section                                          |
| **Page title**  | „Offene abrechenbare Trainings“                                                      |
| **URL**         | `/treasurer/billable-trainings`                                                      |
| **Screenshots** | `screenshots/intranet/treasurer/07-billable-trainings--desktop.png`, `…--mobile.png`<br>**States:** `screenshots/intranet/treasurer/states/02-billable-trainings-row-ticked--desktop.png`, `screenshots/intranet/treasurer/states/05-billable-trainings-with-run-strip--desktop.png`, `screenshots/intranet/treasurer/states/06-billable-trainings-columns-menu--desktop.png`, `screenshots/intranet/treasurer/states/07-billable-trainings-partner-filter-open--desktop.png` (each also `--mobile.png`) |
## Purpose

The Kassenwart:in's work queue for invoicing the club: every training that has been
released for billing („zur Abrechnung freigegeben“) and is not yet in a billing run.
She picks trainings of **one team** (one Trainingspartner:in with one dog) and bundles
them into an „Abrechnungs-Lauf“, which becomes the invoice.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** a few sessions per quarter, each long. Work happens in bursts, team by team.
- **Mode:** scanning and selecting. She reads amounts, checks for warnings, ticks rows and
  creates a run. No data entry on this page.
- **Typical volume:** 30–60 teams, 1–5 trainings each. The list is long, which makes
  scanning and finding a team the main effort.
- **Device:** desktop. The table is wide (up to 12 columns).

## Inventory (fixed — every element must stay)

### Above the table (each one appears only in some states)

| Element        | Text                                                                                                                               | When                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Status line    | „Lauf verworfen.“                                                                                                                  | Returning from a run page whose run was discarded          |
| Strip of chips | „In Vorbereitung:“ + one chip per run, e.g. „Petra Partner · Bella — Q3/2026 · 3 Trainings“, each linking to the run page          | At least one run is in preparation                         |
| Warning banner | „Die Tarife sind noch nicht gepflegt — es kann kein Betrag berechnet werden.“ + link „Tarife pflegen“                              | Tariffs not maintained (the amount columns then disappear) |
| Error alert    | „Nichts aufgenommen — 1 Training kann nicht in den Lauf:“ / „… n Trainings können nicht in den Lauf:“ + list of „‹Datum›: ‹Grund›“ | Creating a run was refused                                 |
| Error alert    | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“                                                           | Load failed                                                |
| Loading text   | „Lade ...“                                                                                                                         | Before the first answer                                    |

Refusal reasons: „nicht mehr vorhanden“, „nicht mehr zur Abrechnung freigegeben“,
„bereits in einem Abrechnungs-Lauf“, „bereits abgerechnet“, „gehört zu einem anderen Team“.

### Filters

| Filter                | Type                                                                              |
| --------------------- | --------------------------------------------------------------------------------- |
| „Trainingspartner:in“ | Typeahead picker, single choice; „Keine Treffer.“ when the search matches nothing |
| „Von“                 | Date                                                                              |
| „Bis“                 | Date                                                                              |
| „Quartal“             | Select (only quarters that contain rows); choosing one fills „Von“/„Bis“          |
| „Filter zurücksetzen“ | Button, only while a filter is set                                                |

### Toolbar

- „Alle zuklappen“ / „Alle aufklappen“: collapse or expand all team groups
- „Spalten“: column visibility menu

### Table

Rows are **grouped by team**. Each group has a header row containing:

- the label „‹Trainingspartner:in› · ‹Hund›“, with „n Trainings“ underneath
- a tri-state checkbox: „Alle Trainings von … auswählen“
- sums under their columns: Σ Dauer, Σ gefahrene km, Σ Trainingsgebühr, Σ Fahrtkosten.
  A missing amount shows as a small round amber count next to the sum.
- the button „Abrechnungs-Lauf anlegen (n)“, or „Zum Lauf hinzufügen (n)“ when the team
  already has a run. It is disabled and shows no count while nothing is ticked.

Each row has a checkbox, „Training vom ‹Datum› auswählen“. It is disabled, with a
tooltip giving the reason, when the row cannot enter a run or when another team's rows
are already ticked.

| Column                       | Shown by default | Can be hidden | Notes                                                                                                                     |
| ---------------------------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Datum                        | yes              | no            | Link to the training detail                                                                                               |
| Dauer                        | yes              | no            | h:mm                                                                                                                      |
| Hund                         | no               | yes           |                                                                                                                           |
| Trainingspartner:in zur Zeit | no               | yes           |                                                                                                                           |
| Trainer:in                   | yes              | yes           |                                                                                                                           |
| Trainingsart                 | yes              | yes           | Preceded by the **documentation badge** (documented / not yet documented); links to the group training for group sessions |
| Abrechnungsstatus            | no               | yes           |                                                                                                                           |
| Inhalt                       | no               | yes           | Free text                                                                                                                 |
| Bemerkung Kasse              | no               | yes           | Free text                                                                                                                 |
| gefahrene km                 | yes              | no            | „—“ when empty                                                                                                            |
| Ticketkosten                 | yes              | yes           |                                                                                                                           |
| Trainingsgebühr              | yes              | no            | Header carries an info icon („Hinweis“) with the tooltip „Vorläufige Beträge: berechnet zum normalen Stundensatz. …“      |
| Fahrtkosten                  | yes              | no            |                                                                                                                           |
| Kostenpflicht-Variante       | yes              | yes           | Always the last column                                                                                                    |

### Cell markers (in the amount columns)

- **Amber „nicht berechenbar“**: shown as a round amber icon only on this page. It stands
  in place of a missing amount, and its tooltip gives the reason, e.g. „Die Fahrtkosten
  sind nicht deklariert. Korrektur durch die Trainingskoordinator:in.“
- **Neutral „Hinweis“**: a small round grey info icon after an amount, explaining a rule
  that applied (flat rate used as the floor, „Keine Anfahrt: Die Trainer:in ist nicht
  angereist.“, a group journey divided among the teams).

### Empty states (shown in place of the table)

- No filter set: „Keine offenen abrechenbaren Trainings.“ / „Trainings werden in der
  Trainingsliste zur Abrechnung freigegeben.“ + button „Zu den Trainings“
- A filter set: „Keine Treffer für diese Filter.“ + button „Filter zurücksetzen“

## Behaviour the layout must keep

- Ticking is limited to **one team at a time**. Every other team's checkboxes become
  disabled. The run button belongs to the team, so it has to stay visually tied to that team.
- The run button can sit far below the team label in a long group. The refusal alert
  scrolls into view at the top.
- Sums belong to their columns, so they must stay aligned with them (or be clearly labelled
  if moved).
- Filters only narrow the list, so the strip of chips is never filtered.

## Observations on the current layout (input for layout proposals)

- The team label wraps over several lines in a narrow first column, so long names
  (e.g. test data) push the group header very tall.
- The table is wider than the viewport at 1440 px. „Kostenpflicht-Variante“ and part of
  „Fahrtkosten“ are cut off and need horizontal scrolling.
- Group headers and rows look alike, so the team structure is weak when scanning.
- The run button sits under the team label inside the table, competing with the rows.
- There is no overview (how many teams, total open amount, how many with warnings).
  _Any summary would be a new element, so only propose one as an optional addition,
  marked as such._
