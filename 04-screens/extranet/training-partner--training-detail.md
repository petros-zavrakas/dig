# Training — detail and edit (Trainingspartner:in)

|                 |                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **Context**     | Extranet                                                                                               |
| **Role**        | Trainingspartner:in (trainings of the teams she keeps)                                                 |
| **Menu item**   | None — opened from the date in „Meine Trainings“, in her dog's training history, or „Training ansehen“ after saving |
| **Page title**  | „Training“ (header back arrow to „Meine Trainings“)                                                    |
| **URL**         | `/training-partner/trainings/:id`                                                                      |
| **Screenshots** | `screenshots/extranet/training-partner/05-training-detail--desktop.png`, `…--mobile.png` (a group-training record: session fields locked, only her remark editable) |

## Purpose

The Trainingspartner:in reads one training of her dog and adds or corrects her part: above
all her remark („Bemerkung Trainingspartner:in“), and the facts she entered herself while
the training is still open. Which fields she may edit is decided by the server per field;
the page shows everything and explains each lock. She cannot mark documentation as done
(that is the Trainer:in's) and never sees travel costs.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** occasional — after a training, to read the Trainer:in's remark or add her
  own.
- **Mode:** mainly reading; typing one remark.
- **Device:** mainly the phone.

## Inventory (fixed — every element must stay)

### Status banners (top of the card, each only in its state)

| Banner | Text | When |
| --- | --- | --- |
| Red | „Abgerechnet — Korrekturen über die Trainingskoordinator:in“ | Billed by the club or in the Trainer:in's closed self-invoice |
| Neutral | „Im Abrechnungs-Lauf: Dauer und Fahrtkosten sind gesperrt. Die Kassenwart:in kann das Training aus dem Lauf nehmen.“ | In a club billing run in preparation |
| Neutral | „Im Eigenrechnungs-Lauf der Trainer:in: Dauer und Trainingsart sind gesperrt. Die Trainer:in kann das Training aus dem Eigenrechnungs-Lauf nehmen.“ | In the Trainer:in's billing run in preparation |
| Neutral | „Als fertig dokumentiert markiert — Änderungen an den Angaben zum Training nur noch über die Trainer:in“ (no button) | Marked documented, not billed |

### Facts (read-only label/value list)

„Hund“ (call name as link to her dog's training history), „Trainingspartner:in zur Zeit“,
„Trainer:in“, „Erfasst von“ („‹Name› · ‹Rolle›“), „Abrechnungsstatus“ („noch nicht
freigegeben“ / „zur Abrechnung freigegeben“ / „im Abrechnungs-Lauf“ / „abgerechnet“),
„Dokumentation“ („fertig dokumentiert“ / „in Bearbeitung“, with „‹Zeitpunkt› · ‹Name›“ in
grey below when known).

### Form fields (each disabled unless the server allows editing)

| Field | Type | Validation messages |
| --- | --- | --- |
| „Datum“ | Date | „Bitte ein Datum angeben.“ |
| „Dauer (Minuten)“ | Number | „Bitte eine Dauer in Minuten angeben.“ |
| „Trainingsart“ | Native select „Keine Angabe“ + five kinds; „Gruppentraining“ appears only on a group-training record | „Bitte eine Trainingsart wählen.“ (only on a record the Trainer:in entered) |
| „Inhalt“ | Six checkboxes, two columns | — |
| „Beginn“ | Time | — |
| „Ende“ | Time | — |
| „Ort / Adresse“ | Text | — |
| „Bemerkung Trainer:in“ | Multi-line, always disabled (read only) | — |
| „Bemerkung Trainingspartner:in“ | Multi-line, her own; editable unless the record is billed | — |

No „Fahrtkosten“, no km, no ticket costs.

**Hints under a locked field** (grey, only while other fields are editable):

- On a group-training record, under each session field (Datum, Dauer, Trainingsart,
  Inhalt, Beginn, Ende, Ort / Adresse): „Gilt für das ganze Gruppentraining – nur die
  Trainer:in ändert es.“
- Otherwise the ownership hints: „Von der Trainer:in ergänzt“, „Von der
  Trainingspartner:in ergänzt“, „Von der Trainingskoordinator:in korrigiert“.

### Messages under the form

| Element | Text | When |
| --- | --- | --- |
| Amber alert | „Dieses Training wurde inzwischen von der Trainer:in geändert.“ / „… von der Trainingspartner:in geändert.“ / „Dieses Training wurde inzwischen von der Trainingskoordinator:in korrigiert.“ / „Dieses Training wurde inzwischen geändert.“ + „Ihre Änderungen wurden **nicht** gespeichert und das Formular wurde neu geladen. Bitte prüfen und erneut speichern.“ | The record changed while she edited |
| Red alert | „Änderungen konnten nicht gespeichert werden. Bitte später erneut versuchen.“ | Save failed |
| Server field errors | under the field | e.g. the training entered a billing run meanwhile |
| Status text | „Änderungen gespeichert.“ | After a successful save |

### Buttons

- „Änderungen speichern“ (primary; „Speichern ...“) — only when at least one field is
  editable.
- Below a separator, only when she may delete: „Training löschen“ (outline), and
  „Bitte zuerst speichern.“ while there are unsaved changes (button disabled).

### Dialog „Training löschen“

Same dialog as for the Trainer:in: „Das Training vom **‹Datum›** mit **‹Rufname›** wird
endgültig gelöscht. Das kann nicht rückgängig gemacht werden.“, button „Endgültig löschen“
(„Löschen ...“). Errors: „Das Training wurde inzwischen zur Abrechnung freigegeben und kann
nicht mehr gelöscht werden.“ (+ „Außerdem ist ein anderes Team dieses Gruppentrainings in
einem Abrechnungs-Lauf: ‹…›.“); „Das Training kann nicht gelöscht werden, solange ein
anderes Team dieses Gruppentrainings in einem Abrechnungs-Lauf ist: ‹…›. Bitte an die
Trainingskoordination wenden.“ and/or „Bitte die Trainer:in bitten, das Training aus ihrem
Eigenrechnungs-Lauf zu nehmen.“; „Training konnte gerade nicht gelöscht werden. Bitte
später erneut versuchen.“ On success: back to her „Meine Trainings“.

### Page-level states

„Lade ...“; „Für dieses Training fehlt die Berechtigung. Bitte an die
Trainingskoordination wenden.“; „Dieses Training gibt es nicht (mehr).“; „Training konnte
nicht geladen werden. Bitte später erneut versuchen.“

## States (summary for the designer)

1. **Her own open record:** most fields editable, delete available.
2. **Recorded by the Trainer:in / group-training member:** facts locked with hints, only her
   remark editable (the screenshot).
3. **Documented:** neutral banner; only her remark editable.
4. **In a billing run:** neutral run note; Dauer (and Trainingsart or travel costs) locked.
5. **Billed:** red banner, all read-only, no save button.

## Behaviour the layout must keep

- All fields remain visible in every state; locked fields must stay readable and clearly
  look locked; each lock is explained (banner or hint).
- Both remarks are always shown; only hers can ever be edited here.
- Delete is disabled while the form has unsaved changes.

## Observations on the current layout (input for layout proposals)

- In the most common state for her (a training the Trainer:in recorded, or a group
  training) the page is a long column of seven disabled fields, each followed by the same
  two-line hint „Gilt für das ganze Gruppentraining – nur die Trainer:in ändert es.“ —
  seven repetitions. On the phone the page is about 1520 CSS px tall, and the one field she
  can edit (her remark) plus the save button are at the very bottom.
- A read-only record would read much faster as a summary of facts, with only her remark as
  an input (layout proposal; the fields and hints themselves stay in the inventory — e.g.
  the hint could be shown once for the group of session fields, if accessibility of each
  field's description is kept).
- The page has no heading naming the training (date and dog are not in the title).
  _A heading derived from existing data would be an optional addition._
- The facts list wraps on the phone („Erfasst von“, „Abrechnungsstatus“) because the label
  column is sized for „Trainingspartner:in zur Zeit“.
- The Trainer:in's remark is shown in a disabled textarea — an empty grey box when there is
  none, which looks like an input she cannot use rather than text to read.
- Desktop: narrow centred card (about 448 px) with wide empty margins.
