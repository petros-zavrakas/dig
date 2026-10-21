# Eigenrechnungs-Lauf

|                 |                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                                                                                               |
| **Role**        | Trainer:in                                                                                                                                                             |
| **Menu item**   | None of its own. Reached from „Rechnung“ (after creating or adding, or via the notice's „Eigenrechnungs-Lauf öffnen“) or from „Abgeschlossene Rechnungen“ (the invoice number) |
| **Page title**  | „Eigenrechnungs-Lauf · ‹Zeitraum›“, e.g. „Eigenrechnungs-Lauf · Q3/2026“; „Eigenrechnungs-Lauf“ while loading. Back arrow to „Offene Trainings für die Eigenrechnung“, or to the closed-runs list when opened from there |
| **URL**         | `/trainer/trainer-billing-runs/:id`                                                                                                                                    |
| **Screenshots** | Closed run: `screenshots/extranet/trainer/10-trainer-billing-run--desktop.png`, `…--mobile.png`. In preparation and the discard dialog: `screenshots/extranet/trainer/states/06-trainer-billing-run-in-preparation--desktop.png`, `screenshots/extranet/trainer/states/07-trainer-billing-run-discard-dialog--desktop.png` (each also `--mobile.png`) |
## Purpose

One bundle of the Trainer:in's own sessions that becomes her self-invoice to the
association. It has two states:

- **in Vorbereitung** (in preparation): she can take sessions out, rename the period, enter
  or correct her hourly rate, discard the run, and finally close it by entering the number and
  date of the invoice she wrote in her own software.
- **abgeschlossen** (closed): read-only, as she invoiced it, with the one control
  „PDF herunterladen“ (the attachment to her invoice).

Each line is one session, priced by the server: fee („Honorar“ = duration × her hourly rate)
plus travel („Fahrtkosten“, at the reimbursement rates frozen when the run was created).

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** once per invoice (monthly or quarterly), one or two visits per run; closed
  runs are reopened rarely, mainly to download the PDF again.
- **Mode:** checking the lines and total, typing two or three short values (hourly rate the
  first time, invoice number, invoice date), confirming.
- **Typical volume:** 5–40 lines (the seed shows 6).
- **Device:** desktop more likely (she writes the invoice in her own software), but the phone
  must work.

## Inventory (fixed — every element must stay)

### Page states

| Element      | Text                                                                                     | When                                                       |
| ------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Loading text | „Lade ...“                                                                               | Before the first answer                                    |
| Grey text    | „Dieser Eigenrechnungs-Lauf besteht nicht.“                                              | Unknown run, another Trainer:in's run, or discarded meanwhile |
| Error alert  | „Der Eigenrechnungs-Lauf konnte nicht geladen werden. Bitte später erneut versuchen.“    | Load failed                                                |

### Above the content (both states)

- Status badge: „in Vorbereitung“ or „abgeschlossen“
- „angelegt am dd.mm.yyyy“

### Lines: section „Trainings in diesem Lauf“ (both states)

Error alert above the lines (in preparation, after „✕“):
- „Dieses Training ist nicht mehr in diesem Eigenrechnungs-Lauf. Die Seite ist aktualisiert.“
- „Das Training konnte nicht aus dem Eigenrechnungs-Lauf genommen werden. Bitte später erneut
  versuchen.“

Table (desktop, from the `md` breakpoint); no sorting, no column menu:

| Column       | Notes                                                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Datum        | Link to her training detail; plain text for a group training                                                                                  |
| Trainingsart | In preparation: preceded by the documentation badge (none on a closed run). Group training: „Gruppentraining · n Teams“ as a link to „Meine Trainings“ narrowed to it |
| Hund         | Call names; „—“ for a group training on a closed run (it names no one)                                                                        |
| Dauer        | h:mm                                                                                                                                          |
| Honorar      | Euro amount, or „—“ while the run has no hourly rate; followed by a grey „Hinweis“ marker whose tooltip is the computation „1:30 h × 40,00 € = 60,00 €“, or „Stundensatz fehlt“ |
| Fahrtkosten  | Euro amount + „Hinweis“ marker with the basis: „keine Anfahrt“, „Pauschale“, „‹n› km“, „Fahrkarte ‹Betrag›“, or „—“                          |
| Betrag       | Line total, bold; „—“ while no hourly rate                                                                                                    |
| (no header text; screen-reader label „Aus dem Lauf nehmen“) | In preparation only: „✕“ icon button per line, tooltip „Aus dem Lauf nehmen“, accessible name „Training vom dd.mm.yyyy aus dem Lauf nehmen“ |

Empty rows text: „Keine Trainings in diesem Lauf.“

Cards (phone, replace the table): header with the date (left) and, on the right, the
documentation badge (in preparation) and the „✕“ button (in preparation); then „Trainingsart“,
„Hund“, „Dauer“, „Honorar“ (with marker), „Fahrtkosten“ (with marker), „Betrag“ (bold).

### Side column — in preparation

In this order:

1. Field „Zeitraum-Bezeichnung“ (text; saved on leaving the field or Enter). Server messages
   appear under it.
2. Field „Stundensatz (€/h)“ (decimal; saved on leaving the field or Enter; empty on her very
   first run). Messages under it: „Bitte einen Stundensatz eingeben.“, „Bitte einen gültigen
   Stundensatz eingeben (Euro mit höchstens zwei Nachkommastellen).“, „Der Stundensatz muss
   größer als 0,00 € sein.“, or the server's.
   Under either field when the save failed otherwise: „Die Änderung konnte nicht gespeichert
   werden. Bitte später erneut versuchen.“
3. Note (grey): „Erstattungssätze festgehalten am dd.mm.yyyy: Pauschale ‹Betrag› · km-Satz
   ‹Betrag›/km“
4. Totals: „Honorar“ (or „—“), „Fahrtkosten“, „Summe“ (bold; „—“ while no hourly rate)
5. Close box, bordered, heading „Ihre Rechnung eintragen“:
   - „Summe dieses Laufs: ‹Betrag›“ (or „—“)
   - Field „Rechnungsnummer“ (text). Message: „Bitte die Rechnungsnummer eintragen.“ or the
     server's.
   - Field „Rechnungsdatum“ (date, today by default). Messages: „Bitte das Rechnungsdatum
     eintragen.“, „Bitte ein gültiges Rechnungsdatum eintragen.“, or the server's (date in
     the future, or before the latest session).
   - Grey note: „Danach ist der Lauf unveränderlich; seine Trainings gelten als abgerechnet.“
   - Error alert (refusal not tied to a field): „Die Summe dieses Laufs hat sich geändert, sie
     beträgt jetzt ‹Betrag›. Bitte prüfen und erneut abschließen.“ / „Bitte zuerst Ihren
     Stundensatz eintragen.“ / „Dieser Eigenrechnungs-Lauf ist bereits abgeschlossen. Die Seite
     ist aktualisiert.“ / „Der Eigenrechnungs-Lauf konnte nicht abgeschlossen werden. Bitte
     später erneut versuchen.“
   - Button „Lauf abschließen“ (primary). Disabled while no hourly rate, with the grey reason
     under it: „Bitte zuerst Ihren Stundensatz eintragen.“
   - Error alert: „Der Eigenrechnungs-Lauf konnte nicht verworfen werden. Bitte später erneut
     versuchen.“ (after a failed discard)
   - Button „Lauf verwerfen“ (destructive), directly under „Lauf abschließen“

While any write is in flight, every „✕“ and both buttons are disabled.

### Side column — closed

1. Status line „Der Eigenrechnungs-Lauf ist abgeschlossen.“ (only right after she closed it
   on this page)
2. Error alert „Dieser Eigenrechnungs-Lauf ist bereits abgeschlossen. Die Seite ist
   aktualisiert.“ (only when a close collided with another tab)
3. „Eigenrechnung Nr. ‹Nummer› vom dd.mm.yyyy“ (bold)
4. „Zeitraum: ‹Bezeichnung›“
5. „Stundensatz: ‹Betrag›/h“
6. The reimbursement-rates note (as above)
7. Totals „Honorar“, „Fahrtkosten“, „Summe“
8. Button „PDF herunterladen“ („PDF herunterladen ...“ while loading). Errors under it:
   „Die Anlage konnte nicht erstellt werden. Bitte später erneut versuchen.“ / „Die Anlage
   konnte nicht heruntergeladen werden. Bitte später erneut versuchen.“

### Dialogs

| Opened by                         | Title                              | Text                                                                                                                         | Buttons                                                   |
| --------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| „✕“ on the **last** remaining line | „Letztes Training herausnehmen?“   | „Der Eigenrechnungs-Lauf enthält dann kein Training mehr und wird gelöscht.“                                                 | „Abbrechen“, „Herausnehmen und Lauf löschen“ (destructive) |
| „Lauf verwerfen“                  | „Eigenrechnungs-Lauf verwerfen?“   | „Das Training ist danach wieder offen.“ / „Die n Trainings sind danach wieder offen.“ + „Der Eigenrechnungs-Lauf wird gelöscht.“ | „Abbrechen“, „Verwerfen“ (destructive)                   |
| „Lauf abschließen“ (after the fields pass) | „Lauf abschließen?“       | „Rechnung Nr. ‹Nummer› vom dd.mm.yyyy · Summe ‹Betrag›. Danach lässt sich der Eigenrechnungs-Lauf nicht mehr ändern.“         | „Abbrechen“, „Abschließen“ (primary)                      |

„✕“ on any other line takes the session out at once, without a dialog. After the run is
deleted (last line or discard) she returns to „Offene Trainings für die Eigenrechnung“.

### Markers

- Documentation badge (in preparation only): as on „Rechnung“ (green „Dokumentation
  fertig“ / orange „Dokumentation offen — …“).
- Neutral „Hinweis“ info marker after every „Honorar“ and „Fahrtkosten“ amount, opening on
  tap.

## Behaviour the layout must keep

- The total in the close box and the confirmation dialog is exactly the one sent with the
  close; it must be visible before she confirms.
- „Lauf verwerfen“ stays directly under „Lauf abschließen“ (as on the club run page in the
  Intranet), but clearly secondary and destructive.
- The hourly rate field is the only place she enters her rate. Without it every fee, the
  Honorar total and the Summe read „—“ and closing is impossible; the reason stays next to
  the disabled button.
- Each field's refusal stays under that field; refusals of the close stay in the close box.
- A closed run shows no field, no „✕“ and no „Lauf verwerfen“; only „PDF herunterladen“.
- The amounts come from the server; the page never computes them itself.

## Observations on the current layout (input for layout proposals)

- **Phone: the summary comes last.** The invoice number, period, rate, totals and the PDF
  button sit below all line cards (on the seed's 6 lines, after about 3,000 px at phone
  resolution). In preparation, the hourly rate field and the close box would equally sit
  below every line, so the first-run task (enter the rate) is out of sight.
- **Desktop:** two columns, lines left, a narrow side column (256 px) right. The side
  column's facts are loose paragraphs of different weights; the totals are small grey/black
  rows rather than a clear sum.
- The header title wraps on the phone („Eigenrechnungs-Lauf / · 09/2025 – 10/2025“) next to
  the wrapping account name.
- The status badge („abgeschlossen“) is a small grey pill, the same weight as the creation
  date beside it; the state that decides whether anything is editable is easy to miss.
- Every amount carries a grey info marker; with two per line the table looks busy, and the
  computation is reachable only by hover or tap.
- A thin grey line is left above the side column on the phone: the border of the hidden
  desktop table.
- In preparation (from code): the side column stacks two fields, a note, the totals and the
  close box with two more fields and two buttons, all at 256 px wide — the longest column on
  the page.
