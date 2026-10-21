# Training — detail and edit (Trainer:in)

|                 |                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                              |
| **Role**        | Trainer:in (her own trainings)                                                                        |
| **Menu item**   | None — opened from the date in „Meine Trainings“, „Training gespeichert“ („Training ansehen“), her open trainings and billing run pages |
| **Page title**  | „Training“ (header back arrow to „Meine Trainings“, or to the page she came from)                     |
| **URL**         | `/trainer/trainings/:id`                                                                              |
| **Screenshots** | `screenshots/extranet/trainer/05-training-detail--desktop.png`, `…--mobile.png` (editable state, a group-training record)<br>**States:** `screenshots/extranet/trainer/states/04-training-delete-dialog--desktop.png` (each also `--mobile.png`) |
## Purpose

One page that is both the detail view and the edit form of one of her trainings. She
supplements or corrects what she recorded, adds her remark, declares travel costs, marks
the training as „fertig dokumentiert“ (which freezes the facts for both parties), takes
that mark back, or deletes the training. **Which fields are editable is decided by the
server per field** — so the same page appears fully editable, partially frozen (for
example only her own remark is open), or fully read-only, and must explain why.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** a few times a week — mostly to add a forgotten detail, check the
  Trainingspartner:in's remark, or mark documentation done before invoicing.
- **Mode:** mostly reading the facts at the top and changing one or two fields.
- **Device:** phone and desktop.

## Inventory (fixed — every element must stay)

### Status banners (top of the card, each only in its state)

| Banner | Text | When |
| --- | --- | --- |
| Red | „Abgerechnet — Korrekturen über die Trainingskoordinator:in“ | Billed by the club (Abrechnungsstatus „abgerechnet“) — everything read-only |
| Red (same banner, line below or alone) | „Eigenrechnung abgerechnet (Rechnung Nr. ‹Nr.› vom ‹Datum›)“ — the part in brackets is a link to her billing run; alone it ends „ — Korrekturen über die Trainingskoordinator:in“ | In one of her closed self-invoices — everything read-only |
| Neutral | „Im Abrechnungs-Lauf: Dauer und Fahrtkosten sind gesperrt. Die Kassenwart:in kann das Training aus dem Lauf nehmen.“ | In a club billing run in preparation |
| Neutral | „Im Eigenrechnungs-Lauf: Dauer, Trainingsart und Fahrtkosten sind gesperrt. Um sie zu ändern, das Training zuerst aus dem Eigenrechnungs-Lauf nehmen.“ | In her own billing run in preparation |
| Neutral | „Als fertig dokumentiert markiert“ + outline button „Fertig-Markierung zurücknehmen“ („Markierung wird zurückgenommen ...“ while working) + „Bitte zuerst speichern.“ when there are unsaved changes (button then disabled) | Marked documented and not billed |

### Facts (read-only label/value list)

| Label | Value |
| --- | --- |
| „Hund“ | Call name as a link to the dog's training history („(ohne Rufname)“ if unresolved) |
| „Trainingspartner:in zur Zeit“ | Name |
| „Trainer:in“ | Name |
| „Erfasst von“ | „‹Name› · Trainer:in“ / „‹Name› · Trainingspartner:in“, or only the role |
| „Abrechnungsstatus“ | „noch nicht freigegeben“, „zur Abrechnung freigegeben“, „im Abrechnungs-Lauf“, „abgerechnet“ |
| „Dokumentation“ | „fertig dokumentiert“ or „in Bearbeitung“; below in grey „‹TT.MM.JJJJ, HH:MM› · ‹Name›“ of the last change, when known |

### Form fields (each disabled unless the server allows editing it)

| Field | Type | Hints | Validation messages |
| --- | --- | --- | --- |
| „Datum“ | Date | Ownership hint | „Bitte ein Datum angeben.“ |
| „Dauer (Minuten)“ | Number | Ownership hint | „Bitte eine Dauer in Minuten angeben.“ |
| „Trainingsart“ | Native select: „Keine Angabe“, the six kinds („Gruppentraining“ only on a group-training record) | Always disabled on a group-training record, with „Teil eines Gruppentrainings — Änderungen der Trainingsart und Zusammenführen über die Trainingskoordination.“; otherwise, when editable, „Gruppentraining: Zusammenführen über die Trainingskoordination.“ | „Bitte eine Trainingsart wählen.“ (only on a record she entered); server: „Dieses Training gehört zu einem Gruppentraining — die Trainingsart ändert nur die Trainingskoordination.“, „„Gruppentraining“ entsteht nur bei der Erfassung — Zusammenführen über die Trainingskoordination.“ |
| „Inhalt“ | Six checkboxes in two columns | Ownership hint under the group | — |
| „Beginn“ | Time | Ownership hint | — |
| „Ende“ | Time | Ownership hint | — |
| „Ort / Adresse“ | Text | Ownership hint | — |
| „Fahrtkosten“ * | Radio group „keine Anfahrt“ / „Pauschale (‹Betrag›)“ / „Kilometer“ / „Fahrkarte“, with „gefahrene km“ * or „Ticketkosten (€)“ * under the chosen option and the flat-rate hint „Die Pauschale (…) wäre höher als … — Pauschale wählen?“ | Same component as on „Neues Training“ | „Bitte die Fahrtkosten angeben.“, „Bitte die gefahrenen Kilometer angeben.“, „Bitte die Ticketkosten angeben.“ (only when editable) |
| „Bemerkung Trainer:in“ | Multi-line | Her own; stays editable after „fertig dokumentiert“ | — |
| „Bemerkung Trainingspartner:in“ | Multi-line | Always shown; disabled, unless she is also this team's Trainingspartner:in (person with both roles) | — |

**Ownership hints** (grey text under a field someone else filled, only while other fields
are editable): „Von der Trainer:in ergänzt“, „Von der Trainingspartner:in ergänzt“, „Von
der Trainingskoordinator:in korrigiert“. Fields frozen by a billing run point to the run
banner instead.

### Messages under the form

| Element | Text | When |
| --- | --- | --- |
| Amber alert | „Dieses Training wurde inzwischen von der Trainingspartner:in geändert.“ / „… von der Trainer:in geändert.“ / „Dieses Training wurde inzwischen von der Trainingskoordinator:in korrigiert.“ / „Dieses Training wurde inzwischen geändert.“ + „Ihre Änderungen wurden **nicht** gespeichert und das Formular wurde neu geladen. Bitte prüfen und erneut speichern.“ | The record changed while she edited |
| Red alert | „Nur teilweise gespeichert: die Angaben zum Training sind gespeichert, die Bemerkung Trainingspartner:in nicht. Bitte erneut speichern.“ (variant with „— das Training wurde zwischenzeitlich geändert. Bitte prüfen und erneut speichern.“) | Person with both roles: second half of the save failed |
| Red alert | „Änderungen konnten nicht gespeichert werden. Bitte später erneut versuchen.“ | Save failed |
| Red alert | „Das Training ist inzwischen gesperrt — die Dokumentation kann nicht mehr geändert werden.“ / „Aktion gerade nicht möglich. Bitte später erneut versuchen.“ | Mark / take back failed |
| Red alert (group) | „Datum, Zeiten, Dauer, Ort, Inhalt und Fahrt gelten für alle Teams dieses Gruppentrainings. Die Änderungen wurden **nicht** gespeichert, weil diese Teams gesperrt sind:“ + bullet list „‹Rufname› (‹Datum›): ‹Grund›“; reasons: „fertig dokumentiert — dort die Fertig-Markierung zurücknehmen und erneut speichern.“ (the name links to that training), „in einem Abrechnungs-Lauf — die Kassenwart:in bitten, das Training aus dem Lauf zu nehmen.“, „im Eigenrechnungs-Lauf — das Training zuerst aus dem Eigenrechnungs-Lauf nehmen.“, „abgerechnet — nicht mehr änderbar.“ | A session change on a group training is blocked by a sibling |
| Status text | „Änderungen gespeichert.“ | After a successful save |
| Server field errors | under the field | Her billing run started meanwhile, or other refusals |

### Buttons

- „Änderungen speichern“ (primary; „Speichern ...“) — only when at least one field is
  editable. Fully read-only records have no save button.
- Action row, separated by a line (only when she may mark or delete):
  - Hint above, when Trainingsart is empty and she can mark: „Die Trainingsart fehlt noch.
    Nach dem Markieren sind die Angaben zum Training für beide Seiten gesperrt — zum
    Nachtragen musst du die Markierung wieder zurücknehmen.“ (button stays enabled)
  - „Als fertig dokumentiert markieren“ (outline; „Wird markiert ...“)
  - „Training löschen“ (outline; opens the dialog)
  - „Bitte zuerst speichern.“ under the row while there are unsaved changes (both buttons
    disabled)

### Dialog „Training löschen“

- Text: „Das Training vom **‹Datum›** mit **‹Rufname›** wird endgültig gelöscht. Das kann
  nicht rückgängig gemacht werden.“
- Button: „Endgültig löschen“ („Löschen ...“); closing via the dialog's ✕ / Escape.
- Errors in the dialog: „Das Training wurde inzwischen zur Abrechnung freigegeben und kann
  nicht mehr gelöscht werden.“ (+ „Außerdem ist ein anderes Team dieses Gruppentrainings in
  einem Abrechnungs-Lauf: ‹Rufname› (‹Zustand›), ….“); „Das Training kann nicht gelöscht
  werden, solange ein anderes Team dieses Gruppentrainings in einem Abrechnungs-Lauf ist:
  ‹…›. Bitte die Kassenwart:in bitten, das Training aus dem Lauf zu nehmen.“ and/or „Bitte
  das Training zuerst aus dem Eigenrechnungs-Lauf nehmen.“; „Training konnte gerade nicht
  gelöscht werden. Bitte später erneut versuchen.“
- On success: back to „Meine Trainings“.

### Page-level states

- „Lade ...“ while loading.
- „Für dieses Training fehlt die Berechtigung. Bitte an die Trainingskoordination wenden.“
- „Dieses Training gibt es nicht (mehr).“
- „Training konnte nicht geladen werden. Bitte später erneut versuchen.“

## States (summary for the designer)

1. **Editable:** banners none, most fields enabled, save + mark + delete.
2. **Partially frozen — documented:** „Als fertig dokumentiert markiert“ banner with the
   take-back button; only „Bemerkung Trainer:in“ editable; save stays for the remark.
3. **Partially frozen — in a billing run:** neutral run note(s); Dauer and Fahrtkosten (club
   run) or Dauer, Trainingsart and Fahrtkosten (her run) disabled; the rest editable.
4. **Read-only — billed:** red banner; all fields disabled; no save, no action row.
5. **Group-training record:** Trainingsart locked with its hint; a session change may be
   refused with the group alert.

## Behaviour the layout must keep

- Every field stays visible in every state (read-only is shown, not hidden); disabled
  state must be clearly distinguishable from editable and still readable.
- The reason for a lock is always stated in a banner at the top (or a hint under the
  field); never a silent grey field.
- Mark, take back and delete are separate actions from saving and are disabled while the
  form has unsaved changes, with „Bitte zuerst speichern.“
- The warning about the missing Trainingsart sits directly above the mark button.
- „Fahrtkosten“ is required whenever editable.

## Observations on the current layout (input for layout proposals)

- The page has no heading naming the training: the header says only „Training“; date and
  dog appear as an input and a fact row. On a phone she cannot see at a glance which
  training she is on. _A heading such as „‹Datum› · ‹Rufname›“ would be derived from
  existing data — propose as an optional addition._
- The facts block is a small two-column grey list; on the phone „Erfasst von“ and
  „Abrechnungsstatus“ values wrap to two lines because the label column is wide
  („Trainingspartner:in zur Zeit“). Status values are plain text, not badges.
- Everything is one narrow column (about 448 px card on desktop, large empty margins);
  on the phone the page is about 1490 CSS px tall and the save button sits at the bottom.
- Disabled fields (Trainingsart on a group record, the partner's remark) are only slightly
  greyer than enabled ones — hard to tell apart outdoors.
- Three buttons of equal outline weight at the bottom: „Als fertig dokumentiert
  markieren“ (important workflow step) and „Training löschen“ (destructive) look the same;
  on the phone they stack under the save button.
- Inhalt checkboxes are tight on the phone („Reaktionsschulung“ touches the second column).
- The screenshots show only the editable state; documented, run-locked, billed, error and
  dialog states are not captured.
