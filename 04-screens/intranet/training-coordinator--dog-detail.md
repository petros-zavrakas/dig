# Hund — the dog file (all three Intranet roles)

|                 |                                                                                                                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                                                                                                                                             |
| **Role**        | Trainingskoordinator:in (Training coordinator), Kassenwart:in (Treasurer), Vorstand (Board) — one page per role, built from the same cards, see "Differences per role"                                              |
| **Menu item**   | none — reached through a „Rufname“ link on „Hunde“ (and after „Hund anlegen“)                                                                                                                                      |
| **Page title**  | „Hund“, with a back arrow (accessible name „Zurück“) to the role's „Hunde“ list                                                                                                                                     |
| **URL**         | `/training-coordinator/dogs/:id`, `/treasurer/dogs/:id`, `/board/dogs/:id`                                                                                                                                           |
| **Screenshots** | `screenshots/intranet/training-coordinator/05-dog-detail--desktop.png`, `…--mobile.png`; `screenshots/intranet/treasurer/04-dog-detail--…`; `screenshots/intranet/board/04-dog-detail--…` (all show the dog „Alma“)<br>**States:** `screenshots/intranet/training-coordinator/states/02-dog-keeper-dialog--desktop.png`, `screenshots/intranet/training-coordinator/states/03-dog-keeper-end-dialog--desktop.png` (each also `--mobile.png`) |
## Purpose

Everything the club holds on one dog: its master data, its team (the current
Trainingspartner:in, i.e. the person the dog lives and trains with, plus the history of
earlier ones, „Verlauf“), and its whole training history across all those phases. The
Trainingskoordinator:in also manages the team here (assign, switch, end). She and the
Kassenwart:in can release trainings for billing from the history, exactly as on the
„Trainings“ list.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** Trainingskoordinator:in often (several times a week); Kassenwart:in when
  checking one team's trainings before billing; Vorstand occasionally.
- **Mode:** mostly reading. Writes are rare and small: a keeper change a few times a year
  per dog; releasing trainings for billing in batches.
- **Typical volume:** 13 master-data fields at most; 1–4 entries in „Verlauf“; 5–100
  trainings per dog (50 per page).
- **Device:** desktop.

## Inventory (fixed — every element must stay)

### Page states

| Element            | Text                                     | When                    |
| ------------------ | ---------------------------------------- | ----------------------- |
| Loading text       | „Lade ...“                               | Before the first answer |
| Error alert (red)  | „Hund nicht gefunden.“                   | Unknown id              |
| Error alert (red)  | „Hund konnte nicht geladen werden.“      | Any other load failure  |

### Card 1 — master data

- Card title: the dog's call name (e.g. „Alma“).
- Always shown (label above value):
  - „Geburtsdatum“
  - „Eigentümer (am Hund)“: „Verein“ or „Selbstausbildner“
  - „Status“: grey badge „Aktiv“ or „Archiviert“
- Shown only when filled in, in this order: „Rasse“, „Farbe“, „Geschlecht“ („Rüde“ /
  „Hündin“), „TASSO-Nummer“, „Kenndecken-Nummer“, „Chip-Nummer“, „Ausbildungsart“
  („Vereins-Fremdausbildung“ / „Selbstausbildung“), „Wurf“, „Eintrittsdatum“, „Phase“
  („Welpe“ … „Archiv“).
- Read-only. There is no edit action for a dog.

### Card 2 — „Team / Trainingspartner:in“

- With a current Trainingspartner:in: her name (bold) and „seit ‹Datum›“ underneath.
  - Buttons (Trainingskoordinator:in only): „Wechseln“ (outline) and „Beenden“ (outline).
- Without one: muted text „keine aktive Trainingspartner:in“.
  - Button (Trainingskoordinator:in only): „Zuordnen“ (primary).
- „Verlauf“ (small muted heading) with a bordered list, newest first, one entry per keeper
  relationship: name (bold) and either „seit ‹Datum› · aktuell“ (the open one) or
  „‹Von› – ‹Bis›“. Shown only when there is at least one entry.

### Dialog „Trainingspartner:in zuordnen“ (from „Zuordnen“)

- Title „Trainingspartner:in zuordnen“; description „Wählen Sie eine Person und ein
  Von-Datum.“
- Step 1 — person picker: search field „Person suchen“ (placeholder „Name oder E-Mail“,
  focused), result list (each row: „Vorname Nachname“ bold, e-mail muted underneath; the
  list scrolls inside itself, at most half the screen height). Empty: „Keine passenden
  Personen gefunden.“ Error (red): „Personen konnten nicht geladen werden. Bitte später
  erneut versuchen.“ The dog's current keeper is not offered.
- Step 2 — after picking: „Ausgewählte Person: ‹Name›“; date field „Von-Datum“ (pre-filled
  with today, editable); field error under it from the server (e.g. „Bitte ein Von-Datum
  angeben.“).
- Error alert (red): „Diese Person ist bereits als Trainingspartner:in zugeordnet.“ or
  „Zuordnung gerade nicht möglich. Bitte später erneut versuchen.“
- Buttons: „Andere Person wählen“ (outline, back to step 1), „Zuordnen“ (primary; „Zuordnen
  ...“ while saving). Closing the dialog discards the half-finished choice.

### Dialog „Trainingspartner:in wechseln“ (from „Wechseln“)

- Title „Trainingspartner:in wechseln“; description „Wählen Sie die neue Person und das
  Von-Datum (Übergabedatum). Die bisherige Zuordnung wird zu diesem Datum automatisch
  beendet.“
- Same two steps as „Zuordnen“, with „Neue Person: ‹Name›“ instead of „Ausgewählte Person:“
  and a „Von-Datum“ field (today by default).
- Error alert (red): „Diese Person ist bereits als Trainingspartner:in zugeordnet.“ or
  „Wechsel gerade nicht möglich. Bitte später erneut versuchen.“
- Buttons: „Andere Person wählen“ (outline), „Wechseln“ (primary; „Wechseln ...“ while
  saving).

### Dialog „Trainingspartner:in beenden“ (from „Beenden“)

- Title „Trainingspartner:in beenden“; description „Beenden Sie die Zuordnung von
  ‹Name (bold)› mit einem Bis-Datum. Der Hund hat danach keine aktive Trainingspartner:in.“
- Date field „Bis-Datum“ (today by default); field error under it from the server (e.g.
  „Bitte ein Bis-Datum angeben.“).
- Error alert (red): „Dieser Hund hat aktuell keine aktive Trainingspartner:in.“ or
  „Beenden gerade nicht möglich. Bitte später erneut versuchen.“
- Button: „Beenden“ (primary; „Beenden ...“ while saving). No cancel button; the dialog's
  close (✕) and Escape close it.

All three dialogs have the standard close control (✕, top right; its screen-reader text is
the English „Close“ from the shared dialog primitive). On success the dialog closes and the
Team card and „Verlauf“ refresh.

### Card 3 — „Trainings“ (the dog's training history)

The same list component as the „Trainings“ page
(`04-screens/intranet/training-coordinator--trainings.md`), pinned to this dog. Everything
listed there under "Notice alert", "Release bar" and "Edit mode" applies here unchanged
for the Trainingskoordinator:in and the Kassenwart:in. Differences from that page:

| Element             | Here                                                                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Loading / error     | „Lade ...“; red alert „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“ — inside the card                              |
| Filters             | Only three: „Trainingsart“ (faceted multi-select, same options), „Von“ and „Bis“ (date inputs with visible labels). No Hund, Trainer:in, Inhalt, Abrechnungsstatus or Kostenpflicht-Variante filter |
| Toolbar             | „Spalten“ (column menu) at the right end of the filter row                                                                                   |
| Summary row         | **none** (no „Anzahl“ / „Σ Stunden“)                                                                                                          |
| Group-training chip | never appears here; a „Trainingsart“ group link leads to the „Trainings“ page narrowed to that group training                                |
| State               | filters, sort and page are not in the URL; they reset when the page is left                                                                   |
| Pager               | „‹n› Trainings · Seite ‹x› von ‹y›“ + „Zurück“ / „Weiter“; 50 per page                                                                        |
| Empty state         | „Keine Einträge.“                                                                                                                             |

Sorting: server-side on „Datum“, „Dauer“, „gefahrene km“, „Ticketkosten“; default Datum,
newest first.

Columns, in this order (every column can be hidden through „Spalten“):

| Column                         | Shown by default | Notes                                                                 |
| ------------------------------ | ---------------- | --------------------------------------------------------------------- |
| Datum                          | yes              | Sortable. Underlined link to the role's training detail               |
| Dauer                          | yes              | Sortable. h:mm                                                        |
| Hund                           | no               | Redundant inside the dog's own file                                   |
| Trainingspartner:in zur Zeit   | yes              | Who the keeper was on that date                                       |
| Trainer:in                     | yes              |                                                                       |
| Trainingsart                   | yes              | Link for group-training members; „—“ when empty                       |
| Abrechnungsstatus              | yes              | Grey badge; removed in the edit mode                                  |
| Kostenpflicht-Variante         | yes              | Text; a select in the edit mode                                       |
| Inhalt                         | yes              | One outline badge per value                                           |
| Bemerkung Trainer:in           | yes              | Trainingskoordinator:in only. One line, truncated, full text on hover |
| Bemerkung Trainingspartner:in  | yes              | Trainingskoordinator:in only. Same                                    |
| Bemerkung Kasse                | no               | Same                                                                  |
| gefahrene km                   | no               | Sortable                                                              |
| Ticketkosten                   | no               | Sortable                                                              |
| Abrechnung                     | edit mode only   | Cannot be hidden; last column („Freigeben“ / „freigegeben“ + undo / status text) |

Release bar (floating at the bottom of the viewport while the card's table is on screen,
Trainingskoordinator:in and Kassenwart:in only): „‹n› Trainings bereit zur Freigabe“ ·
„‹n› ohne Kostenpflicht-Variante“, buttons „Bearbeiten“ / „Bearbeiten beenden“ and
„Seite freigeben (‹n›)“.

## Differences per role

| Aspect                                | Trainingskoordinator:in                    | Kassenwart:in                              | Vorstand                                  |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------ | ----------------------------------------- |
| Master-data card                      | same                                       | same                                       | same                                      |
| Team card, „Verlauf“                  | same                                       | same                                       | same                                      |
| „Zuordnen“ / „Wechseln“ / „Beenden“ and their dialogs | yes                        | **no**                                     | **no**                                    |
| Training columns                      | 14 (+ „Abrechnung“ in the edit mode); 10 shown by default | 12: no „Bemerkung Trainer:in“, no „Bemerkung Trainingspartner:in“; 8 shown by default | 12, same as Kassenwart:in; 8 shown by default |
| Release bar, edit mode, notice alert  | yes                                        | yes                                        | **none** (absent, not disabled)           |
| Datum link goes to                    | `/training-coordinator/trainings/:id`      | `/treasurer/trainings/:id`                 | `/board/trainings/:id`                    |
| Back arrow goes to                    | `/training-coordinator/dogs`               | `/treasurer/dogs`                          | `/board/dogs`                             |

## Behaviour the layout must keep

- The keeper actions belong to the current Trainingspartner:in, so „Wechseln“ and „Beenden“
  stay next to her name; „Zuordnen“ stays next to the empty-state text.
- „Verlauf“ is newest first and the open entry is marked „aktuell“.
- Both keeper dialogs with a picker are two-step: choosing a person replaces the picker with
  the date step, and „Andere Person wählen“ goes back.
- The dates in the keeper dialogs default to today but can be set in the past or future.
- The training history keeps the release bar's guarantees from the „Trainings“ page: it
  floats, it hides when the table is out of view, and the card reserves space at its bottom
  so the last rows and the pager can be scrolled out from under it.

## Observations on the current layout (input for layout proposals)

- Everything is one column of stacked cards. The master-data card is about 650 px tall with
  13 label-over-value pairs in a single column inside a card that is about 670 px wide; the
  right half of the screen next to the first two cards stays empty.
- The training history, the part the Kassenwart:in comes for, starts below 1,000 px at
  1440 px wide, and below 2,100 px on mobile.
- Dates in the two upper cards are shown as raw ISO dates („2020-02-11“, „seit
  2024-01-01“), while the list and the history use German dates („15.06.2026“).
- The page does not show the dog's name in the header (only „Hund“); the name is the first
  card's title.
- The current Trainingspartner:in appears twice in the Team card: once at the top and again
  as the „aktuell“ entry in „Verlauf“.
- The history table is wider than the card at 1440 px: with the default columns „Inhalt“ is
  cut off at the right edge and the two Bemerkung columns are off-screen, reachable only by
  horizontal scrolling.
- The card has a large empty band at its bottom (the space reserved for the floating release
  bar), which reads as a layout gap when the bar is not visible in a screenshot.
- Mobile: „Von“ and „Bis“ wrap onto separate lines with their labels misaligned, and the
  table shows only Datum, Dauer and part of „Trainingspartner:in zur Zeit“.
