# Neues Training (Trainer:in)

|                 |                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                           |
| **Role**        | Trainer:in                                                                                         |
| **Menu item**   | „Neues Training“ in the „Trainer:in“ section; also the primary button on „Startseite“ and on „Meine Trainings“ |
| **Page title**  | „Neues Training“ (header shows a back arrow to „Meine Trainings“)                                  |
| **URL**         | `/trainer/trainings/new`                                                                           |
| **Screenshots** | `screenshots/extranet/trainer/04-training-capture--desktop.png`, `…--mobile.png` (empty form only)<br>**States:** `screenshots/extranet/trainer/states/01-training-capture-validation--desktop.png`, `screenshots/extranet/trainer/states/02-training-capture-group--desktop.png` (each also `--mobile.png`) |
## Purpose

The Trainer:in records a training she has just given — usually on the training ground,
on her phone. One save creates one training per team; for a „Gruppentraining“ she picks
several teams at once (up to twenty) and the save creates one record per team, all
sharing the session (date, times, duration, place, content, travel costs). If she already
recorded a group training on that date, the form offers to add the new teams to it.
She must declare her travel costs („Fahrtkosten“) every time, because they feed her own
invoice („Eigenrechnung“).

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** the most-used screen of the Extranet: several times a week, right after
  each training.
- **Mode:** data entry, quick. Typical entry: date (today, prefilled), duration, kind, one
  team, content ticks, travel-cost choice, save. Times, place and remark are optional.
- **Typical volume:** 1 team per training; 3–8 teams for a group training.
- **Device:** mainly the phone, outdoors, often one-handed.

## Inventory (fixed — every element must stay)

### Above the fields

| Element      | Text                                                                                                                                    | When                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Context line | „Erfasst als: Trainer:in“ (role bold)                                                                                                   | Always — tells a person with both roles which entry she took |
| Legend       | „Mit * markierte Felder sind Pflichtfelder.“ (red asterisk)                                                                             | Always                                            |
| Error alert  | „Kein verknüpftes Personenprofil — Training kann nicht als Trainer:in erfasst werden. Bitte an die Trainingskoordination wenden.“       | Her account has no linked person; save is disabled |

### Fields (in the current order; * = required, shown as a red asterisk after the label)

| Field | Type | Notes / help text | Validation messages |
| --- | --- | --- | --- |
| „Datum“ * | Date | Prefilled with today. Read-only while joined to a group training | „Bitte ein Datum angeben.“ |
| „Dauer (Minuten)“ * | Number, minimum 1 | Read-only while joined | „Bitte eine Dauer in Minuten angeben.“ |
| „Trainingsart“ * | Native select: placeholder „Bitte wählen“, then „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“, „Spezialtraining“, „Nachsorge“ | Comes before the team picker because it decides whether one or several teams may be chosen. Choosing another kind while joined leaves the group | „Bitte eine Trainingsart wählen.“ |
| Group-training offer | Info alert (see below) | Only with „Gruppentraining“ and when she already has a group training on the chosen date | — |
| „Hund / Team“ * (single) | Searchable picker: trigger „Team wählen“, search field „Hund oder Trainingspartner:in suchen“, each option shows the call name (bold) over the Trainingspartner:in (grey); chosen: „‹Rufname› · ‹Trainingspartner:in›“; „(ohne Rufname)“ for an unresolved dog | Every kind except „Gruppentraining“ | „Bitte ein Team auswählen.“; „Das gewählte Team ist nicht mehr verfügbar. Bitte aktualisieren und erneut auswählen.“ (as a general error, see below) |
| „Hunde / Teams“ * (multiple) | Chip multi-select with an inline search: placeholder „Teams wählen“; each chosen team is a chip „‹Rufname› · ‹Trainingspartner:in›“ with an ✕ (accessible name „‹…› entfernen“); chip list named „Gewählte Teams“; after 20 teams the input reads „Höchstens 20 Teams“ and further options are disabled; „Keine passenden Teams gefunden.“ | With „Gruppentraining“, or while several teams are still chosen after she switched away (adding is then disabled, removing is not). While joined, teams of dogs already in the group are not offered | „Bitte ein Team auswählen.“; „Mehrere Teams nur bei Gruppentraining“ (live, as soon as several teams meet another kind); „Schon in diesem Gruppentraining: ‹Rufnamen›. Bitte entfernen.“ (live, while joined); „Ein gewählter Hund ist schon in diesem Gruppentraining. Bitte entfernen.“ (server, after save) |
| „Trainer:in“ | Read-only, disabled text field „Sie · vorbelegt“ | Never editable | — |
| „Inhalt“ | Six checkboxes in two columns: „Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“ | Optional. Disabled while joined | — |
| „Beginn“ | Time | Optional. Read-only while joined | — |
| „Ende“ | Time | Optional. Read-only while joined | — |
| „Ort / Adresse“ | Text | Optional. Read-only while joined | — |
| „Fahrtkosten“ * | Radio group: „keine Anfahrt“, „Pauschale“ (shows the amount when the rates are maintained, e.g. „Pauschale (13,00 €)“), „Kilometer“, „Fahrkarte“. No default | Disabled while joined (the group's choice is shown) | „Bitte die Fahrtkosten angeben.“ |
| „gefahrene km“ * | Number, indented under „Kilometer“ | Only while „Kilometer“ is chosen | „Bitte die gefahrenen Kilometer angeben.“ |
| „Ticketkosten (€)“ * | Number with cents, indented under „Fahrkarte“ | Only while „Fahrkarte“ is chosen | „Bitte die Ticketkosten angeben.“ |
| Flat-rate hint | „Die Pauschale (‹Betrag›) wäre höher als ‹Betrag› — “ + link button „Pauschale wählen?“ (switches to „Pauschale“) | Under the km / ticket field when the claimed amount is below the flat rate (soft, never blocks) | — |
| „Bemerkung“ | Multi-line text | Optional. Disabled as soon as several teams are chosen, with the help text „Bei mehreren Teams pro Team nach dem Speichern ergänzen.“; text typed before stays editable so she can clear it | „Bei mehreren Teams bitte leeren — die Bemerkung wird pro Team nach dem Speichern ergänzt.“ |

### Group-training offer (alert inside the form)

Before joining — one block per group training of hers on that date:

- „Am ‹Datum› haben Sie bereits ein Gruppentraining erfasst (‹Rufname›, ‹Rufname›, …).
  Diese Teams hinzufügen?“ + button „Hinzufügen“ (accessible name „Hinzufügen: ‹Rufnamen›“)
- once at the end: outline button „Neues Gruppentraining“ (hides the offer for that date;
  the save then starts a new group)

After „Hinzufügen“ (joined):

- „Die Teams werden dem Gruppentraining (‹Rufnamen›) hinzugefügt. Datum, Zeiten, Dauer,
  Ort, Inhalt und Fahrtkosten gelten wie dort erfasst.“
- in red, when the group could not be read: „Das Gruppentraining konnte gerade nicht
  geladen werden. Bitte später erneut versuchen oder ein neues Gruppentraining erfassen.“
- button „Neues Gruppentraining“ (leaves the group; its values stay as an editable start)

### General error alert (above the buttons)

| Text | When |
| --- | --- |
| „Das Gruppentraining wurde inzwischen geändert. Die Angaben sind jetzt wie dort erfasst – bitte erneut speichern.“ | Joined group's session changed in the meantime |
| „Dieses Gruppentraining ist nicht mehr verfügbar. Bitte „Neues Gruppentraining“ wählen.“ | Joined group no longer exists |
| „Diesem Gruppentraining können keine Teams mehr hinzugefügt werden: ‹Rufname› (‹Zustand›), …. Bitte die Kassenwart:in bitten, das Training aus dem Lauf zu nehmen, oder ein neues Gruppentraining erfassen.“ — states: „in einem Abrechnungs-Lauf“, „im Eigenrechnungs-Lauf“, „abgerechnet“, „fertig dokumentiert“ | A record of the group is locked |
| „Das gewählte Team ist nicht mehr verfügbar. Bitte aktualisieren und erneut auswählen.“ | Team gone |
| „Für diese Erfassung fehlt die Berechtigung. Bitte an die Trainingskoordination wenden.“ | Not permitted |
| „Die Angaben konnten nicht gespeichert werden. Bitte Trainingsart und Trainer:in prüfen.“ | Other refusal of the data |
| „Training konnte gerade nicht gespeichert werden. Bitte später erneut versuchen.“ | Anything else |

Server-side field errors are shown under the matching field.

### Buttons

- „Training speichern“ (primary; reads „Speichern ...“ while saving; disabled while saving,
  without a linked person, or while a joined group is still loading)
- „Abbrechen“ (outline; goes to „Startseite“)

### Dialog „Gruppentraining mit einem Team?“

Opens on save when „Gruppentraining“ has exactly one team and she has not joined an
existing group.

- Text: „Für dieses Gruppentraining ist nur ein Team gewählt. Weitere Teams lassen sich
  später ergänzen.“
- Buttons: „Weitere Teams wählen“ (outline, closes) and „Als Gruppentraining speichern“
  (primary, saves).

### After saving

Goes to „Training gespeichert“ (see
`shared--training-saved.md`).

## Behaviour the layout must keep

- „Trainingsart“ stays **before** the team picker: the kind switches the picker between
  single and multiple.
- Nothing she chose is cleared behind her back: switching away from „Gruppentraining“
  keeps all chips and shows the live error until she removes them.
- The group-training offer appears between „Trainingsart“ and the team picker and only
  after a date and „Gruppentraining“ are set; joined, the session fields are visibly
  read-only/disabled and show the group's values.
- „Fahrtkosten“ has no default; the km or ticket field appears directly under the chosen
  option, and the flat-rate hint sits under that field.
- Required marks are generated from the field's required state; the legend explains them.
- Validation is on save (except the live team errors); errors appear under each field.

## Observations on the current layout (input for layout proposals)

- One long single column in a narrow card (about 448 px on desktop, centred, lots of
  empty space either side). On the phone the form is about 1000 CSS px tall (2456 px at
  2x) and the save button is only reachable after scrolling past every optional field.
- Required and optional fields are interleaved: „Fahrtkosten“ (required) comes after
  three optional fields (Beginn, Ende, Ort / Adresse). Grouping into "required basics" and
  "optional details" would shorten the path on the phone (layout proposal; inventory stays).
- „Beginn“ and „Ende“ each take a full row; they could share one.
- „Dauer (Minuten)“ is a bare number input; there is no link to Beginn/Ende.
- The read-only „Trainer:in“ field („Sie · vorbelegt“) takes a full input row for
  information that never changes.
- On the phone the Inhalt checkboxes in two columns are tight: „Reaktionsschulung“ touches
  the second column's checkbox. Checkbox and radio targets are small for outdoor use.
- „Erfasst als: Trainer:in“ and the legend are plain small text; for a person with both
  roles the role is easy to overlook.
- Save and cancel sit at the very end; there is no sticky action bar on the phone.
- The screenshots show only the empty form: the multi-team chips, the join offer, the
  km/ticket sub-fields and error states are not captured.
