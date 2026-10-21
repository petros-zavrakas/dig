# Training — detail (Kassenwart:in and Vorstand)

|                 |                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                                                              |
| **Role**        | Kassenwart:in (Treasurer); the Vorstand (Board) has a read-only version, see "Differences per role"                                     |
| **Menu item**   | none — reached from the date link in „Trainings“ (also from a dog's file and, for the Kassenwart:in, from the billing pages); back arrow in the header returns to „Trainings“ |
| **Page title**  | „Training“                                                                                                                            |
| **URL**         | `/treasurer/trainings/:id`, `/board/trainings/:id`                                                                                     |
| **Screenshots** | `screenshots/intranet/treasurer/06-training-detail--desktop.png`, `…--mobile.png`; `screenshots/intranet/board/06-training-detail--desktop.png`, `…--mobile.png` (a group-training member, not yet released) |

## Purpose

One training record as the billing side sees it. The Kassenwart:in reads the facts, then
classifies the training for billing (Kostenpflicht-Variante), leaves a note for the
accounts („Bemerkung Kasse“) and releases it for billing — or takes the release back. She
cannot correct or delete the record itself; that is the Trainingskoordinator:in's job. The
Vorstand reads the same page without any control.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** Kassenwart:in a few times a week, mostly when a training on a billing page
  needs a closer look; Vorstand rarely.
- **Mode:** reading; for the Kassenwart:in one or two quick billing actions.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

Three cards, top to bottom: summary, „Abrechnung“, „Korrektur-Verlauf“.

### Page states

| Element      | Text                                         | When                                    |
| ------------ | -------------------------------------------- | --------------------------------------- |
| Loading text | „Lade …“                                     | Before the first answer                 |
| Alert        | „Dieses Training gibt es nicht (mehr).“       | Unknown or deleted id (replaces the page) |
| Alert        | „Das Training konnte nicht geladen werden.“   | Load failed (replaces the page)         |

### Summary card

- Title „Training vom ‹Datum› · ‹Hund›“
- „Trainer:in:“, „Trainingspartner:in zur Zeit:“, „Trainingsart:“ (or „—“),
  „Dauer:“ h:mm, followed by „(‹Beginn›–‹Ende›)“ when both times exist, „Ort:“ (or „—“),
  „Inhalt:“ comma-separated (or „—“), „gefahrene km:“ (or „—“), „Ticketkosten:“ (euro or „—“)
- Badge „Als fertig dokumentiert markiert“ — only when the documentation is finished

### Card „Abrechnung“ (Kassenwart:in: with writes)

Read lines:

- „Abrechnungsstatus:“ grey badge („noch nicht freigegeben“ / „zur Abrechnung freigegeben“
  / „im Abrechnungs-Lauf“ / „abgerechnet“)
- Club billing run line (when in a run): „im Vereinsrechnungs-Lauf „‹Lauf›“ (in
  Vorbereitung)“ or „abgerechnet (Rechnungsnummer ‹Nr.› vom ‹Datum›)“ — **a link to the run
  page** for the Kassenwart:in
- Stamp (muted, when the Billable mark was ever set): „freigegeben am ‹Datum› von ‹Name›“
  or „Freigabe zurückgenommen am ‹Datum› von ‹Name›“
- „Eigenrechnung:“ „offen“ / „im Eigenrechnungs-Lauf“ / „abgerechnet (Rechnung Nr. ‹Nr.›
  vom ‹Datum›)“
- „Fahrtkosten:“ „‹n› km“ / „Kilometer“ / „Fahrkarte ‹€›“ / „Fahrkarte“ / „Pauschale“ /
  „keine Anfahrt“ / „nicht deklariert“ (no „korrigieren“ link here)
- For a group-training member: „Gruppentraining · ‹n› Teams“ + link „In der Liste
  anzeigen“ (her list narrowed to this group training)

Message alert (one at a time, after a write): „Auf ‹n› Trainings des Gruppentrainings
angewendet“, or a refusal: „Das Training ist zur Abrechnung freigegeben; die
Kostenpflicht-Variante ist gesperrt. Freigabe zurücknehmen, ändern, neu freigeben.“ /
„Das Training ist abgerechnet; Abrechnungsfelder sind gesperrt.“ / „Das Training ist in
einem Abrechnungs-Lauf; die Kostenpflicht-Variante ist gesperrt.“ / „Ein freigegebenes
Training braucht eine Kostenpflicht-Variante.“ / „Nicht geändert — die Variante passt nicht
zur Gruppentraining-Zugehörigkeit des Trainings.“ / „Nicht geändert — die Variante gilt
für das ganze Gruppentraining (‹n› Teams).“ + the blocking siblings („‹Hund› (‹Datum›) ist
in einem Abrechnungslauf / zur Abrechnung freigegeben / abgerechnet.“) + remedy („Um die
Variante zu ändern, zuerst die Freigabe(n) zurücknehmen.“, „… zuerst diesen Lauf
verwerfen und die Freigabe zurücknehmen.“, or „Ein abgerechnetes Gruppentraining lässt
sich nicht mehr umstellen.“) / „Das Training ist inzwischen in einem Abrechnungs-Lauf und
kann nicht zurückgenommen werden.“ / „Nicht möglich (‹Grund›)“ with reasons „im
Abrechnungs-Lauf“, „abgerechnet“, „ohne Kostenpflicht-Variante“, „Kostenpflicht-Variante
passt nicht“, „nicht mehr vorhanden“ / „Die Freigabe konnte nicht erteilt werden.“ / „Die
Abrechnungsangaben konnten nicht gespeichert werden.“

Fields (all disabled while a write is running):

| Field                    | Type                    | Help text / states                                                                                                                                                                         |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| „Kostenpflicht-Variante“ | Select, saves on change | Options „— nicht gesetzt —“, „ja“ (outside a group training), „Gruppentraining mit Pauschale“ / „Gruppentraining ohne Pauschale“ (group-training member), „nein“; a non-fitting stored value as disabled „ungültig: ‹Variante›“. Always: „Die Fahrtkosten-Art gibt die Trainer:in bei der Erfassung an.“ When released: „Freigabe zurücknehmen, ändern, neu freigeben“. When not fitting: „Die gespeicherte Variante passt nicht zur Gruppentraining-Zugehörigkeit und gilt als nicht gesetzt.“ Disabled once released, in a run or billed |
| „Bemerkung Kasse“        | Text area + button „Bemerkung speichern“ (secondary) | Disabled once billed                                                                                                                                       |

Then, while the release decision is still open (not in a run, not billed):

- Soft warning alert „Doku ist noch nicht abgeschlossen — Sach-Felder können sich noch
  ändern“ when the documentation is not finished (never blocks)
- Button „zur Abrechnung freigeben“ (primary) when not yet released, or „Freigabe
  zurücknehmen“ (secondary) when released

### Card „Korrektur-Verlauf“

A list, newest first: muted „‹Datum Uhrzeit› · ‹Name›“, then „**‹Feld›**: ‹alt› → ‹neu›“
(empty values read „leer“), or „Training gelöscht: ‹…›“; optional muted „Grund: ‹Text›“.
Empty: „Für dieses Training wurde noch keine Korrektur festgehalten.“

## Differences per role

| Aspect                     | Kassenwart:in                                     | Vorstand                                                                       |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| „Abrechnung“ card          | Select, text area, „Bemerkung speichern“, „zur Abrechnung freigeben“ / „Freigabe zurücknehmen“, message alert | Read-only lines only: the same read lines plus „Kostenpflicht-Variante:“ (label as in the list, e.g. „ja mit Anfahrtspauschale“, or „—“) and „Bemerkung Kasse:“ (text or „—“). No buttons, no messages |
| Club billing run line      | Link to the run page                               | Plain text                                                                     |
| „In der Liste anzeigen“    | Goes to `/treasurer/trainings?…`                   | Goes to `/board/trainings?…`                                                   |
| Back arrow                 | `/treasurer/trainings`                             | `/board/trainings`                                                             |

## Behaviour the layout must keep

- The Kostenpflicht-Variante saves immediately on change; there is no separate save button
  for it, unlike „Bemerkung Kasse“.
- The release button and the documentation warning belong together; the warning is
  advisory and must not look like an error or a blocker.
- Locked states (released, in a run, billed) disable the controls in place rather than
  hiding them; the help text under the select explains the released lock.

## Observations on the current layout (input for layout proposals)

- The summary card is a plain list of bold label + value lines; on desktop it uses about a
  third of the width and leaves the rest empty.
- In the „Abrechnung“ card the read lines (status, Eigenrechnung, Fahrtkosten, group
  training) and the editable fields are stacked with no separation, and the select and text
  area span the full width (about 1,050 px).
- The documentation warning looks like an empty text input (outlined box, grey text).
- „Gruppentraining · 3 Teams In der Liste anzeigen“ reads as one run-on line.
- The Vorstand's page is short and sparse: three cards of label lines with large empty
  areas to the right; the two pages look identical apart from the form controls.
- There is no visual cue of the billing state (open / released / in run / billed) beyond a
  small grey badge.
