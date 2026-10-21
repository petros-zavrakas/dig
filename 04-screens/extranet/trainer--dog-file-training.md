# Training (read from the dog's history)

|                 |                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                                         |
| **Role**        | Trainer:in                                                                                                       |
| **Menu item**   | None. Reached from a colleague's training in a dog's history („‹Rufname› — Trainings“); back arrow returns there |
| **Page title**  | „Training“                                                                                                       |
| **URL**         | `/trainer/dogs/:dogId/trainings/:id`                                                                             |
| **Screenshots** | None. Inventory taken from the code only                                                                         |

## Purpose

A **read-only** view of a training another Trainer:in conducted, opened from a dog's
history. It shows fewer facts than her own training detail: no start and end time, no
kilometres or ticket costs, no remarks, no „entered by“ and no „Abrechnungsstatus“. It has no
form, no buttons and no delete, because it is not hers to correct; the closing sentence says
where a correction must come from.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** occasional; a few times a week at most, while preparing a session with a dog.
- **Mode:** reading one record, then back.
- **Typical volume:** one record of nine facts.
- **Device:** mostly the phone.

## Inventory (fixed — every element must stay)

### States

| Element      | Text                                                                                        | When                                                    |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Loading text | „Lade ...“                                                                                  | Before the first answer                                 |
| Error alert  | „Für dieses Training fehlt die Berechtigung. Bitte an die Trainingskoordination wenden.“    | Not allowed                                             |
| Error alert  | „Dieses Training gibt es nicht (mehr).“                                                     | Unknown id, the training does not belong to this dog, or a malformed URL |
| Error alert  | „Training konnte nicht geladen werden. Bitte später erneut versuchen.“                      | Load failed otherwise                                   |

### Facts (one card, label–value list, in this order)

| Label                          | Value                                                                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Hund                           | Call name as a link to this dog's history; „(ohne Rufname)“ when unresolved                                                         |
| Datum                          | dd.mm.yyyy                                                                                                                          |
| Dauer                          | h:mm                                                                                                                                |
| Trainer:in                     | Name of the colleague who conducted it                                                                                             |
| Trainingspartner:in zur Zeit   | The dog's keeper at the time                                                                                                        |
| Trainingsart                   | Label, or „—“                                                                                                                       |
| Inhalt                         | Outline chips, or „—“                                                                                                               |
| Ort / Adresse                  | Free text, or „—“                                                                                                                   |
| Dokumentation                  | „fertig dokumentiert“ or „in Bearbeitung“; underneath, in grey, the date and time of the last change and, when known, „ · ‹Name›“ of who changed it |

### Closing note (always shown, below the facts)

„Sie lesen dieses Training aus der Akte des Hundes. Korrekturen nimmt die Trainer:in dieses
Trainings vor.“

## Behaviour the layout must keep

- No controls at all: no edit fields, no disabled versions of them, no action row.
- The missing facts (times, kilometres, ticket costs, remarks, entered by, billing status)
  must **not** appear as empty rows or „—“: they exist but are not hers to read.
- The documentation state stays visible; it tells her whether the record may still change.
- The back arrow leads to this dog's history, not to „Meine Trainings“.

## Observations on the current layout (input for layout proposals)

No screenshot exists; these follow from the code.

- The facts sit in a single card, at most about 450 px wide and centred, with a top margin;
  on desktop most of the width stays empty. On the phone the card fills the width.
- The label column is as wide as „Trainingspartner:in zur Zeit“, so on a phone the values
  get little more than half the card.
- The page looks like the Trainer:in's own training detail without its controls, so the only
  cue that she cannot edit is the grey closing sentence at the very bottom. A clearer
  read-only signal (for example placing that note at the top) is a layout choice, not a new
  element.
