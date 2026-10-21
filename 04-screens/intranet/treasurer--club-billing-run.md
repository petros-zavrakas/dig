# Abrechnungs-Lauf — one club billing run (in preparation and closed)

|                 |                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                                                                                                           |
| **Role**        | Kassenwart:in (Treasurer)                                                                                                                                                          |
| **Menu item**   | None. Reached from a chip or a team's run button on „Rechnungen“ (in preparation), or from an invoice number on „Abgeschlossene Rechnungen“ (closed)                                |
| **Page title**  | „Abrechnungs-Lauf“ (in the app header); the page's own heading is „Abrechnungs-Lauf · ‹Trainingspartner:in› · ‹Hund›“                                                               |
| **URL**         | `/treasurer/club-billing-runs/:id`                                                                                                                                                 |
| **Screenshots** | Closed: `screenshots/intranet/treasurer/10-club-billing-run-billed--desktop.png`, `…--mobile.png`. In preparation and the discard dialog: `screenshots/intranet/treasurer/states/03-club-billing-run-in-preparation--desktop.png`, `screenshots/intranet/treasurer/states/04-club-billing-run-discard-dialog--desktop.png` (each also `--mobile.png`) |
## Purpose

One club billing run: the trainings of **one team** (one Trainingspartner:in with one dog)
that the Kassenwart:in bundles for one invoice to that team. The page has two states:

- **In preparation („in Vorbereitung“)** — a working page. She takes trainings out (✕),
  adds the team's other open billable trainings (+), sets the period label and the
  standard/reduced hourly rate, then copies the run's total into the association software
  („Vereinssoftware“), creates the invoice there, and closes the run here with that
  invoice's number and date. Or she discards the run.
- **Closed („abgerechnet“)** — read-only, exactly as invoiced. Its one action is downloading
  the invoice attachment („Anlage zur Rechnung“) as a PDF.

The invoice itself is made outside the portal; the portal only produces the attachment.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** in preparation: once per team per billing period, usually straight after
  creating the run on „Rechnungen“. Closed: occasionally, to look up an invoice or download
  its attachment again.
- **Mode:** in preparation: checking amounts, small edits, then one careful close (the
  number is typed from another program, the total compared against it). Closed: reading
  and downloading.
- **Typical volume:** 1–5 trainings in the run, 0–5 further addable trainings. A run
  covering a long period can hold more (the seed data has one with 16).
- **Device:** desktop. She works side by side with the association software.

## Inventory (fixed — every element must stay)

### Header (both states)

| Element      | Text                                                                                                       | When                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Back link    | „← Offene abrechenbare Trainings“                                                                          | In preparation                          |
| Back link    | „← Abgeschlossene Rechnungen“                                                                               | Closed (it switches right after her own close) |
| Heading      | „Abrechnungs-Lauf · ‹Trainingspartner:in› · ‹Hund›“                                                        | Always                                  |
| Status badge | „in Vorbereitung“ / „abgerechnet“                                                                          | Always                                  |
| Meta line    | „angelegt am ‹Datum› von ‹Name›“, closed adds „ · abgeschlossen am ‹Datum› von ‹Name›“                     | Always                                  |

### Page-level states

| Element      | Text                                                                                                   | When                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Loading text | „Lade ...“                                                                                             | Before the first answer                                                 |
| Error alert  | „Der Abrechnungs-Lauf konnte nicht geladen werden. Bitte später erneut versuchen.“                      | Load failed                                                             |
| Replacement  | „Dieser Lauf besteht nicht mehr.“ + link „Zu den offenen abrechenbaren Trainings“ (replaces the whole page) | The run was discarded or emptied elsewhere, or never existed            |

### Section „Trainings in diesem Lauf“ (both states)

Section heading „Trainings in diesem Lauf“. A table with **no** column menu, sorting or
filtering; the server fixes the order (date).

| Column                 | Notes                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Datum                  | Link to the training detail                                                                                                                   |
| Trainingsart           | Preceded by the **documentation badge** (in preparation only; a closed run's lines have none)                                                 |
| Dauer                  | h:mm                                                                                                                                          |
| Trainer:in             |                                                                                                                                               |
| Kostenpflicht-Variante | e.g. „ja“, „Gruppentraining ohne Pauschale“; „—“ when empty                                                                                   |
| Gebühr                 | Amount, or the amber „nicht berechenbar“ pill (words visible, not icon-only) with its reason in a tooltip                                     |
| Fahrtkosten            | Amount, with the neutral „Hinweis“ icon after it where a rule applied (see markers); or „nicht berechenbar“                                    |
| Betrag                 | The line's sum, or „nicht berechenbar“                                                                                                        |
| ✕ (no visible header)  | In preparation only. Ghost icon button, tooltip „Aus dem Lauf nehmen“, accessible name „Training vom ‹Datum› aus dem Lauf nehmen“. Hidden header text „Aus dem Lauf nehmen“ |

**Footer row:** „Summe“ spanning the label columns, then Σ Gebühr, Σ Fahrtkosten and the
total (bold) under their columns; an empty cell under ✕. When a line is not computable
the sum reads in the partial form „94,50 € + 1 nicht berechenbar“ (count in amber), never
as a plain total.

Alerts above this table (in preparation):

- „Dieses Training ist nicht mehr in diesem Lauf.“ (the training left the run from another tab)
- „Das Training konnte nicht aus dem Lauf genommen werden. Bitte später erneut versuchen.“

### Section „Weitere abrechenbare Trainings von ‹Trainingspartner:in› · ‹Hund›“ (in preparation only)

The team's other open billable trainings, priced at this run's rates, so the amount beside
„+“ is the amount that enters. It uses the **same column set as „Rechnungen“** (see
`treasurer--billable-trainings.md`): shown by default Datum, Dauer, Trainer:in, Trainingsart
(with documentation badge), gefahrene km, Ticketkosten, Trainingsgebühr (with the
„Hinweis“ header tooltip „Vorläufige Beträge: …“), Fahrtkosten, Kostenpflicht-Variante;
hidden by default Hund, Trainingspartner:in zur Zeit, Abrechnungsstatus, Inhalt,
Bemerkung Kasse. No „Spalten“ menu, no sort, no filter. The amounts' „nicht berechenbar“
shows as the **icon-only** amber marker here, as on „Rechnungen“.

Last column „+“ (no visible header; hidden header text „In den Lauf aufnehmen“): ghost icon
button, tooltip „In den Lauf aufnehmen“, accessible name „Training vom ‹Datum› in den Lauf
aufnehmen“. **Disabled** when the training cannot be priced, with the tooltip
„Nicht aufnehmbar: ‹Grund›“, e.g. „Nicht aufnehmbar: Die Fahrtkosten sind nicht
deklariert. Korrektur durch die Trainingskoordinator:in.“

| Element     | Text                                                                                                                              | When                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Empty state | „Keine weiteren abrechenbaren Trainings dieses Teams.“                                                                            | Nothing else to add          |
| Error alert | „Nichts aufgenommen — 1 Training kann nicht in den Lauf:“ / „… n Trainings können nicht in den Lauf:“ + list „‹Datum›: ‹Grund›“    | Adding was refused           |
| Error alert | „Die Trainings konnten nicht in einen Abrechnungs-Lauf aufgenommen werden. Bitte später erneut versuchen.“                        | Adding failed otherwise      |

Refusal reasons: „nicht mehr vorhanden“, „nicht mehr zur Abrechnung freigegeben“,
„bereits in einem Abrechnungs-Lauf“, „bereits abgerechnet“, „gehört zu einem anderen
Team“, or one of the not-computable reasons.

### Side column — in preparation

Beside the tables on a wide screen, below them otherwise. Every control saves on its own;
there is no save button.

| Element                              | Type / text                                                                                                                                                       | Notes                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Alert                                | „Dieser Lauf ist bereits abgeschlossen.“                                                                                                                          | A write from a stale tab hit a run closed meanwhile                                        |
| „Zeitraum-Bezeichnung“               | Text field (e.g. „Q3/2026“), saved on leaving the field or Enter                                                                                                  | Field errors: „Bitte eine Zeitraum-Bezeichnung eintragen.“, „Höchstens 50 Zeichen.“         |
| Alert                                | „Die Zeitraum-Bezeichnung konnte nicht gespeichert werden. Bitte später erneut versuchen.“                                                                         | Save failed                                                                               |
| „Stundensatz“                        | Fieldset with two radios: „normal (48,00 €/h · Gruppe 31,00 €/h)“ / „ermäßigt (36,00 €/h · Gruppe 24,00 €/h)“ (figures from the run's frozen rates), saved on change | Disabled while any write is in flight                                                      |
| Alert                                | „Der Stundensatz konnte nicht gespeichert werden. Bitte später erneut versuchen.“                                                                                 | Save failed                                                                               |
| Muted line                           | „Tarife eingefroren am ‹Datum›“                                                                                                                                   |                                                                                           |

**Close box** (bordered card), heading „Rechnung aus der Vereinssoftware eintragen“:

| Element                                | Type / text                                                                                    | Notes                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Total line                             | „Summe dieses Laufs: ‹Betrag›“, or „Summe dieses Laufs: nicht berechenbar“                       | The figure she copies into the association software                               |
| „Rechnungsnummer (Vereinssoftware)“    | Text field                                                                                     | Error: „Bitte die Rechnungsnummer eintragen.“, or the server's own refusal          |
| „Rechnungsdatum“                       | Date field, today by default                                                                   | Errors: „Bitte das Rechnungsdatum eintragen.“, „Bitte ein gültiges Rechnungsdatum eintragen.“, or the server's |
| Muted note                             | „Danach ist der Lauf unveränderlich; seine Trainings gelten als abgerechnet.“                   |                                                                                  |
| Alert (in the box)                     | „Die Rechnungsnummer ‹X› gehört schon zum “ + link „Lauf „‹Bezeichnung›“ von ‹Trainingspartner:in› · ‹Hund›“ + „.“ | The number is already used by another run                                         |
| Alert (in the box)                     | „Der Lauf hat sich geändert, bitte neu laden.“                                                  | The total moved or became not computable meanwhile                                 |
| Alert (in the box)                     | „Der Lauf konnte nicht abgeschlossen werden. Bitte später erneut versuchen.“                    | Close failed otherwise                                                            |
| Primary button                         | „Lauf abschließen“                                                                             | Opens the close dialog. Disabled while the total is not computable, with the reason below |
| Reason line                            | „Ein Training dieses Laufs ist nicht berechenbar. Erst herausnehmen, dann abschließen.“         | Only while the total is not computable                                            |
| Alert                                  | „Der Lauf konnte nicht verworfen werden. Bitte später erneut versuchen.“                       | Discard failed                                                                   |
| Destructive button                     | „Lauf verwerfen“                                                                               | Directly under „Lauf abschließen“, inside the box. Opens the discard dialog         |

### Side column — closed

Text only, one action:

| Element                 | Text                                                                                                       | When                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Status line             | „Lauf abgeschlossen.“                                                                                      | Right after her own close on this page     |
| Alert                   | „Dieser Lauf ist bereits abgeschlossen.“                                                                   | A stale tab's write hit the closed run      |
| Invoice line (bold)     | „Rechnung Nr. ‹Nummer› vom ‹Datum›“                                                                        | Always                                     |
| Primary button          | „PDF herunterladen“ („PDF herunterladen ...“ while the download runs)                                      | Always. Saves `Anlage-zur-Rechnung-‹Nr›.pdf` |
| Muted hint              | „PDF noch nicht erstellt – wird beim ersten Herunterladen erzeugt.“                                        | The attachment has not been generated yet  |
| Error alert             | „Die Anlage konnte nicht erstellt werden. Bitte später erneut versuchen.“                                  | Generation failed                          |
| Error alert             | „Die Anlage ist beschädigt oder fehlt – bitte die Administration informieren.“                             | Stored file damaged or missing             |
| Error alert             | „Die Anlage konnte nicht heruntergeladen werden. Bitte später erneut versuchen.“                           | Download failed otherwise                  |
| Text                    | „Zeitraum: ‹Bezeichnung›“                                                                                  | Always                                     |
| Text                    | „Stundensatz: normal (…)“ / „Stundensatz: ermäßigt (36,00 €/h · Gruppe 24,00 €/h)“                         | Always                                     |
| Muted line              | „Tarife eingefroren am ‹Datum›“                                                                            | Always                                     |

No „Weitere“ table, no ✕, no close box, no discard on a closed run.

### Dialogs (in preparation)

| Dialog                    | Title                              | Body                                                                                                                                                  | Buttons                                                        |
| ------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Close                     | „Lauf abschließen?“                | „Rechnung Nr. ‹Nummer› vom ‹Datum› · ‹Trainingspartner:in› · ‹Hund› · ‹n› Trainings · Summe ‹Betrag›. Der Abschluss lässt sich nicht rückgängig machen.“ („1 Training“ in the singular) | „Abbrechen“ (outline), „Abschließen“ (primary)                  |
| Discard                   | „Lauf verwerfen?“                  | „Die ‹n› Trainings werden wieder offen und bleiben zur Abrechnung freigegeben. Der Lauf wird gelöscht.“ / one training: „Das Training wird wieder offen und bleibt zur Abrechnung freigegeben. Der Lauf wird gelöscht.“ | „Abbrechen“ (outline), „Verwerfen“ (destructive)                |
| Take out the last training | „Letztes Training herausnehmen?“  | „Der Lauf enthält dann kein Training mehr und wird gelöscht.“                                                                                         | „Abbrechen“ (outline), „Herausnehmen und Lauf löschen“ (destructive) |

Each dialog stays open with its buttons disabled while its request runs. After a discard
or the last take-out the app returns to „Rechnungen“, which shows „Lauf verworfen.“.

### Markers (in the amount columns)

- **Amber „nicht berechenbar“** in place of a missing amount, reason in its tooltip: as a
  pill with the words in „Trainings in diesem Lauf“; as an icon only in the „Weitere“ table.
- **Neutral „Hinweis“** (small round grey info icon) after an amount: the flat rate used as
  the floor („angegeben ‹x› · berechnet ‹y› (Pauschale als Mindestbetrag)“), a group journey
  divided among the teams („Fahrtkosten der Trainer:in ‹x› ÷ ‹n› Teams = ‹y› je Team“,
  optionally „ · berechnet ‹z› (Mindestbetrag je Team)“), or „Keine Anfahrt: Die Trainer:in
  ist nicht angereist.“
- **Documentation badge** before „Trainingsart“ (in preparation): „Dokumentation fertig“
  (green) / „Dokumentation offen — Sach-Felder können sich noch ändern“ (orange).

## Behaviour the layout must keep

- One write at a time: while any request is in flight, ✕, „+“, the radios and the buttons are
  disabled (the period label still saves). A new write clears the previous write's message.
- Footer sums stay under their columns (or clearly labelled if moved).
- „Lauf abschließen“ and „Lauf verwerfen“ stay together, with the close box's total visible
  next to the number and date fields: she compares the total with the invoice before closing.
- A disabled „+“ or „Lauf abschließen“ must keep its reason reachable (tooltip / reason line).
- The closed state must read as final and read-only; „PDF herunterladen“ is its primary action.
- After her own close the page stays and turns into the closed state in place.

## Observations on the current layout (input for layout proposals)

- Closed state, desktop: the side column is narrow (16 rem) while the table area is wide;
  the table is still wider than its column, so „Betrag“ is cut off at the right edge and needs
  horizontal scrolling, although the page has plenty of empty space below.
- The invoice number and date — the most important fact of a closed run — wrap over two
  lines in the narrow side column, and sit level with the table heading rather than in the
  page header.
- Mobile: the table is wider than the screen and pushes the whole page sideways (the app
  header ends at about half the page width). The side column falls below the table.
- The status badge „abgerechnet“ is a small grey pill, visually equal to an „in Vorbereitung“
  run; the two states are hard to tell apart at a glance.
- The meta line („angelegt am … · abgeschlossen am …“) is long and wraps on mobile.
- In preparation (`states/03-…`): the side column stacks period label, rate radios,
  frozen-rates line, the close box and the discard button in 16 rem, so it is far taller
  than a one-line table and leaves a large empty area under the table. The line table
  already overflows at 1440 px: the last column („Betrag“) is cut off. The rate radio labels
  („normal (48,00 €/h · Gruppe 31,00 €/h)“) wrap over two lines in the narrow column.
  „Lauf verwerfen“ sits directly under „Lauf abschließen“ with little separation.
- There is no visual cue tying „Summe dieses Laufs“ in the close box to the footer total of
  the table; both show the same figure in different places.
