# Training — detail and correction (Trainingskoordinator:in)

|                 |                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **Context**     | Intranet                                                                                          |
| **Role**        | Trainingskoordinator:in (Training coordinator)                                                    |
| **Menu item**   | none — reached from the date link in „Trainings“ (and from a dog's file); back arrow in the header returns to „Trainings“ |
| **Page title**  | „Training“                                                                                        |
| **URL**         | `/training-coordinator/trainings/:id`                                                             |
| **Screenshots** | `screenshots/intranet/training-coordinator/11-training-detail--desktop.png`, `…--mobile.png` (a group-training member, not yet released)<br>**States:** `screenshots/intranet/training-coordinator/states/01-training-delete-dialog--desktop.png` (each also `--mobile.png`) |
## Purpose

One training record, for the person who owns its correctness. She reads who recorded it
and its billing state, corrects any operative field (date, times, team, Trainer:in, group
training, kind, content, place, travel cost, remarks), deletes a wrong record, classifies
it for billing (Kostenpflicht-Variante, Bemerkung Kasse) and releases it for billing. Every
correction is kept in the „Korrektur-Verlauf“.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** several times a week, usually one record at a time after spotting
  something in the list.
- **Mode:** reading first, then a targeted edit of one or two fields; occasionally a delete.
- **Device:** desktop.

## Inventory (fixed — every element must stay)

Four cards, top to bottom: summary, „Korrigieren“, „Abrechnung“, „Korrektur-Verlauf“.

### Page states and messages above the cards

| Element      | Text                                                                                      | When                                                   |
| ------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Loading text | „Lade …“                                                                                  | Before the first answer                                |
| Alert        | „Dieses Training gibt es nicht (mehr).“                                                    | Unknown or deleted id (replaces the page)              |
| Alert        | „Das Training konnte nicht geladen werden.“                                                | Load failed (replaces the page)                        |
| Alert        | „Löschung wird übernommen …“                                                               | After the delete was accepted, while waiting; then the page navigates to „Trainings“ |
| Alert        | „Die Löschung konnte nicht bestätigt werden — das Training besteht weiter.“                | Delete not confirmed within 15 seconds                 |

### Summary card

- Title „Training vom ‹Datum› · ‹Hund›“
- „Trainer:in:“ ‹name›
- „Trainingspartner:in zur Zeit:“ ‹name›
- „Erfasst von:“ ‹name› or „—“
- „Abrechnungsstatus:“ grey badge („noch nicht freigegeben“ / „zur Abrechnung freigegeben“
  / „im Abrechnungs-Lauf“ / „abgerechnet“)
- Badge „Als fertig dokumentiert markiert“ — only when the documentation is finished

### Card „Korrigieren“ (correction form)

Shown when she may correct. Otherwise the card is replaced by the muted line „Korrekturen
nimmt die Trainingskoordinator:in vor.“ (and there is then no „korrigieren“ link in
„Abrechnung“). All fields are disabled while a correction or delete is being confirmed.
No field carries a required mark; validation is on submit.

| Field                                       | Type                                    | Help text / states                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| „Datum“                                     | Date                                    |                                                                                                                                                                          |
| „Beginn“                                    | Time                                    | Disabled while joining another group training                                                                                                                            |
| „Ende“                                      | Time                                    | Same                                                                                                                                                                     |
| „Dauer (Minuten)“                           | Number                                  | Same                                                                                                                                                                     |
| „Hund“                                      | Select (call names); „Aktueller Hund“ until the list loads | „Die Hunde konnten nicht geladen werden.“ on failure                                                                                                  |
| „Trainingspartner:in (Halter:innen-Phase)“  | Select of keeper phases „‹Name›, ‹von› – ‹bis›“ (open end: „offen“); „Bitte Phase wählen …“ when none matches | Help text changes: „Die Phase bestimmt, wer als Trainingspartner:in am Datum des Trainings geführt wird.“ / „Diese Phase umfasst das Datum des Trainings.“ / „Achtung: Diese Phase umfasst das Datum des Trainings nicht.“ |
| „Trainer:in“                                | Select; archived names end in „(archiviert)“; „Aktuelle Trainer:in“ until the list loads | „Die Trainer:innen konnten nicht geladen werden.“ on failure                                                                                    |
| „Gruppentraining“                           | Select: „Kein Gruppentraining“, „Neues Gruppentraining“, „Bisheriges Gruppentraining (‹n› Teams)“ (member only), „Gruppentraining mit ‹Team›, ‹Team›“ (one per joinable group training of the same Trainer:in and date) | Always: „Setzt die Trainingsart mit: ein Gruppentraining ist „Gruppentraining“, „Kein Gruppentraining“ macht aus einem Gruppentraining ein „Einzeltraining“.“ While joining: „Zeiten, Dauer, Inhalt, Ort und Fahrtkosten werden vom gewählten Gruppentraining übernommen.“ After changing date or Trainer:in: „Bei geändertem Datum oder geänderter Trainer:in stehen keine anderen Gruppentrainings zur Wahl.“ |
| „Trainingsart“                              | Select: „— keine Angabe —“ + the six kinds („Gruppentraining“ itself is not selectable) | Disabled while a group training is chosen, with „Folgt dem Gruppentraining — für eine andere Trainingsart zuerst „Kein Gruppentraining“ wählen.“ |
| „Inhalt“                                    | Six checkboxes („Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“) | Disabled while joining                                                                                                            |
| „Ort / Adresse“                             | Text                                    | Disabled while joining                                                                                                                                                   |
| „Fahrtkosten“                               | Radio group: „keine Anfahrt“, „Pauschale“, „Kilometer“, „Fahrkarte“, „nicht deklariert“ | „Kilometer“ reveals „gefahrene km“ (number); „Fahrkarte“ reveals „Ticketkosten (€)“; „nicht deklariert“ reveals both. Errors: „Bitte die gefahrenen Kilometer angeben.“, „Bitte die Ticketkosten angeben.“ Disabled while joining |
| „Bemerkung Trainer:in“                      | Text area                               |                                                                                                                                                                          |
| „Bemerkung Trainingspartner:in“             | Text area                               |                                                                                                                                                                          |
| „Fertig dokumentiert“                       | Checkbox                                | Can only be unticked. Help: „Die Markierung kann zurückgenommen werden, damit die dokumentierende Partei ergänzen kann.“ (when ticked) / „Die Markierung setzt die Trainer:in selbst.“ (when not) |
| „Korrektur-Grund“                           | Text area                               | „Optional. Wird im Korrektur-Verlauf festgehalten.“                                                                                                                      |

Below the fields:

- Status alert: „Korrektur wird übernommen …“ while waiting; then „Korrektur übernommen.“
  or „Die Korrektur konnte nicht bestätigt werden — bitte die Seite neu laden.“
- Error alert (one of):
  - „Bitte eine Halter:innen-Phase wählen.“
  - „Es gab nichts zu korrigieren — der Datensatz ist unverändert.“
  - „Die Korrektur wurde nicht gesendet. Bitte die markierten Felder prüfen.“ (field
    errors then show under each field)
  - „Die Korrektur konnte nicht gesendet werden.“
  - „Der Datensatz wurde geändert. Bitte die Seite neu laden.“
  - Edit conflict: „Der Datensatz wurde inzwischen geändert. Die markierten Felder oben
    wurden nicht übernommen.“ — each conflicting field then shows „Serverwert: ‹Wert›“ with
    a link button „Wert übernehmen“; fields merged silently show „Wert vom Server
    übernommen: ‹Wert›“.
  - In a club billing run: „Dieses Training ist im Vereinsrechnungs-Lauf „‹Lauf›“ (in
    Vorbereitung). Dauer, Fahrtkosten, Team und Gruppe lassen sich erst ändern, wenn die
    Kassenwart:in es aus dem Lauf nimmt.“
  - Billed: „Dieses Training ist mit der Rechnung Nr. ‹Nr.› vom ‹Datum› abgerechnet. Dauer,
    Fahrtkosten, Team und Gruppe lassen sich nicht mehr ändern; einen falschen Betrag
    korrigiert die Kassenwart:in mit einer Gutschrift in der Vereinssoftware.“
  - In the Trainer:in's own billing run: „Dieses Training ist im Eigenrechnungs-Lauf der
    Trainer:in. Dauer, Fahrtkosten, Trainingsart, Gruppe und Trainer:in lassen sich nicht
    ändern, solange es darin ist; bitte die Trainer:in fragen.“
  - Group training locked: „Nicht gesendet — Dauer, Fahrtkosten und Trainer:in gelten für
    das ganze Gruppentraining und sind gesperrt, solange ein Training davon in einer
    Abrechnung ist – Datum, Zeiten, Ort und Inhalt nicht.“ + the blocking siblings („‹Hund›
    (‹Datum›) ist in einem Abrechnungslauf.“ / „… ist abgerechnet.“) + „Um sie zu ändern,
    zuerst diesen Lauf / diese Läufe verwerfen.“ or, when billed, „Dauer, Fahrtkosten und
    Trainer:in eines abgerechneten Gruppentrainings lassen sich nicht mehr korrigieren;
    Datum, Zeiten, Ort und Inhalt schon.“
  - Membership locked: „Nicht gesendet — solange ein Training des Gruppentrainings
    abgerechnet wird, lässt sich die Zugehörigkeit nicht ändern.“ + siblings + remedy (or
    „Die Zusammensetzung eines abgerechneten Gruppentrainings lässt sich nicht mehr
    ändern.“)
  - Join refused: „Nicht gesendet — das gewählte Gruppentraining hat eine andere Trainer:in
    oder ein anderes Datum.“ / „Nicht gesendet — das gewählte Gruppentraining gibt es nicht
    mehr. Bitte die Seite neu laden.“ / „Nicht gesendet — dieser Hund ist schon in diesem
    Gruppentraining. Ein Hund kann nur einmal in einem Gruppentraining sein.“
- Button „Korrektur senden“ (primary). Under it, for a group training of several teams
  when a shared field was changed: „Diese Änderung gilt für alle ‹n› Trainings des
  Gruppentrainings.“
- Button „Training löschen“ (destructive), or instead a muted sentence:
  „Das Training gehört zu einem abgeschlossenen Abrechnungs-Lauf und kann nicht gelöscht
  werden.“ / „Ein anderes Team dieses Gruppentrainings ist in einem Abrechnungs-Lauf.
  Solange der Lauf besteht, kann kein Team das Gruppentraining verlassen.“ / „Das Training
  kann derzeit nicht gelöscht werden.“

### Dialog „Training löschen“

- Title „Training löschen“
- Text „Das Training vom ‹Datum› mit ‹Hund› wird endgültig gelöscht. Der Korrektur-Verlauf
  bleibt erhalten.“
- Field „Korrektur-Grund“ (text area), help „Optional. Wird im Korrektur-Verlauf
  festgehalten.“
- Error alert inside the dialog: „Der Datensatz wurde inzwischen geändert. Bitte die Seite
  neu laden.“ / „Die Löschung konnte nicht gesendet werden.“ / „Dieses Training ist im
  Vereinsrechnungs-Lauf „‹Lauf›“ (in Vorbereitung) und lässt sich erst löschen, wenn die
  Kassenwart:in es aus dem Lauf nimmt.“ / „Dieses Training ist im Eigenrechnungs-Lauf der
  Trainer:in und lässt sich nicht löschen, solange es darin ist; bitte die Trainer:in
  fragen.“
- Buttons „Abbrechen“ (outline) and „Endgültig löschen“ (destructive)

### Card „Abrechnung“

Its writes take effect immediately and are never blocked by a pending correction.

Read lines:

- „Abrechnungsstatus:“ grey badge
- Club billing run line (when in a run): „im Vereinsrechnungs-Lauf „‹Lauf›“ (in
  Vorbereitung)“ or „abgerechnet (Rechnungsnummer ‹Nr.› vom ‹Datum›)“ — plain text for her
- Stamp (muted, when the Billable mark was ever set): „freigegeben am ‹Datum› von ‹Name›“
  or „Freigabe zurückgenommen am ‹Datum› von ‹Name›“
- „Eigenrechnung:“ „offen“ / „im Eigenrechnungs-Lauf“ / „abgerechnet (Rechnung Nr. ‹Nr.›
  vom ‹Datum›)“
- „Fahrtkosten:“ „‹n› km“ / „Kilometer“ / „Fahrkarte ‹€›“ / „Fahrkarte“ / „Pauschale“ /
  „keine Anfahrt“ / „nicht deklariert“, followed by the link „korrigieren“ (jumps to the
  correction card)
- For a group-training member: „Gruppentraining · ‹n› Teams“ + link „In der Liste
  anzeigen“ (the list narrowed to this group training)

Message alert (one at a time, after a write): „Auf ‹n› Trainings des Gruppentrainings
angewendet“, or a refusal: „Das Training ist zur Abrechnung freigegeben; die
Kostenpflicht-Variante ist gesperrt. Freigabe zurücknehmen, ändern, neu freigeben.“ /
„Das Training ist abgerechnet; Abrechnungsfelder sind gesperrt.“ / „Das Training ist in
einem Abrechnungs-Lauf; die Kostenpflicht-Variante ist gesperrt.“ / „Ein freigegebenes
Training braucht eine Kostenpflicht-Variante.“ / „Nicht geändert — die Variante passt nicht
zur Gruppentraining-Zugehörigkeit des Trainings.“ / the group-locked sentence (see the list
screen) / „Das Training ist inzwischen in einem Abrechnungs-Lauf und kann nicht
zurückgenommen werden.“ / „Nicht möglich (‹Grund›)“ / „Die Freigabe konnte nicht erteilt
werden.“ / „Die Abrechnungsangaben konnten nicht gespeichert werden.“

Fields:

| Field                    | Type       | Help text / states                                                                                                                                                                         |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| „Kostenpflicht-Variante“ | Select, saves on change | Options „— nicht gesetzt —“, „ja“ (outside a group training), „Gruppentraining mit Pauschale“ / „Gruppentraining ohne Pauschale“ (member), „nein“; a non-fitting stored value as disabled „ungültig: ‹Variante›“. Always: „Die Fahrtkosten-Art gibt die Trainer:in bei der Erfassung an.“ When released: „Freigabe zurücknehmen, ändern, neu freigeben“. When not fitting: „Die gespeicherte Variante passt nicht zur Gruppentraining-Zugehörigkeit und gilt als nicht gesetzt.“ Disabled once released, in a run or billed |
| „Bemerkung Kasse“        | Text area + button „Bemerkung speichern“ (secondary) | Disabled once billed                                                                                                                                       |

Then, while the release decision is still open:

- Soft warning alert „Doku ist noch nicht abgeschlossen — Sach-Felder können sich noch
  ändern“ when the documentation is not finished (never blocks)
- Button „zur Abrechnung freigeben“ (primary) when not yet released, or „Freigabe
  zurücknehmen“ (secondary) when released. Neither appears in a run or billed.

### Card „Korrektur-Verlauf“

A list, newest first, each entry: muted „‹Datum Uhrzeit› · ‹Name›“, then „**‹Feld›**: ‹alt› →
‹neu›“ (empty values read „leer“; group membership reads „kein Gruppentraining“, „neues
Gruppentraining“, „Gruppentraining ohne weitere Teams“, „Gruppentraining mit ‹Teams›“), or
„Training gelöscht: ‹…›“; optional muted „Grund: ‹Text›“.
Empty: „Für dieses Training wurde noch keine Korrektur festgehalten.“

## Behaviour the layout must keep

- The correction and the „Abrechnung“ card are separate writes with separate buttons;
  „Abrechnung“ stays usable while a correction is being confirmed.
- The „korrigieren“ link next to „Fahrtkosten“ jumps to the correction card, so the card
  needs a stable anchor.
- The help text under „Gruppentraining“ and „Trainingsart“ explains why a field is
  disabled; it must stay next to that field.
- „Training löschen“ is destructive and must stay visibly separated from „Korrektur
  senden“; it always goes through the dialog.
- Conflict messages („Serverwert …“ / „Wert übernehmen“) appear under the affected field.

## Observations on the current layout (input for layout proposals)

- Everything is one long single column; on desktop the page is about 2,800 px tall, on
  mobile about 6,100 px. The billing card and the history are far below the fold.
- Every input spans the full card width (about 1,100 px) even for a time, a duration or a
  date, so short values sit in huge boxes and the eye has to travel far.
- The form has no grouping: time fields, team, group training, kind, content, travel cost
  and remarks follow each other with identical spacing. Natural groups (when, who, what,
  travel cost, remarks, correction reason) are not visible.
- The summary card at the top repeats nothing of what the form shows, but on the
  Kassenwart:in's and Vorstand's pages the summary lists the factual fields; here one has to
  read them out of the form inputs.
- „Training löschen“ is a full-width pale red bar directly under „Korrektur senden“, which
  makes it the widest and most noticeable control on the page.
- The radio group „Fahrtkosten“ has faint, almost invisible unselected circles.
- The documentation warning in „Abrechnung“ looks like an empty text input (outlined box
  with grey text).
- The billing state appears twice (summary card and „Abrechnung“ card).
