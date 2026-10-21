# Neues Training (Trainingspartner:in)

|                 |                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| **Context**     | Extranet                                                                                                     |
| **Role**        | Trainingspartner:in                                                                                          |
| **Menu item**   | „Neues Training“ in the „Trainingspartner:in“ section; also the primary button on „Startseite“ and on „Meine Trainings“ |
| **Page title**  | „Neues Training“ (header shows a back arrow to „Meine Trainings“)                                            |
| **URL**         | `/training-partner/trainings/new`                                                                            |
| **Screenshots** | `screenshots/extranet/training-partner/04-training-capture--desktop.png`, `…--mobile.png` (empty form only) |

## Purpose

The Trainingspartner:in records a training of one of her teams (her dog) that a
Trainer:in gave — for example when the Trainer:in has not recorded it yet. She chooses
the Trainer:in. She never declares travel costs and never starts a group training; with
„Gruppentraining“ she **joins** a group training the Trainer:in already recorded for that
day, and then the session values come from the group.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** occasional — a few times a month at most; most trainings are recorded
  by the Trainer:in.
- **Mode:** data entry, short: date, duration, team, Trainer:in, perhaps a remark.
- **Typical volume:** one team; most Trainingspartner:innen keep one dog (the team is then
  preselected).
- **Device:** mainly the phone.

## Inventory (fixed — every element must stay)

### Above the fields

| Element      | Text                                                          | When   |
| ------------ | ------------------------------------------------------------- | ------ |
| Context line | „Erfasst als: Trainingspartner:in“ (role bold)                | Always |
| Legend       | „Mit * markierte Felder sind Pflichtfelder.“ (red asterisk)   | Always |

### Fields (current order; * = required, red asterisk after the label)

| Field | Type | Notes / help text | Validation messages |
| --- | --- | --- | --- |
| „Datum“ * | Date | Prefilled with today. Changing it clears a chosen group training | „Bitte ein Datum angeben.“ |
| „Dauer (Minuten)“ * | Number, minimum 1 | While joined: disabled, shows the group's value, not required, help text „Gilt für das ganze Gruppentraining – nur die Trainer:in ändert es.“ | „Bitte eine Dauer in Minuten angeben.“ |
| „Hund / Team“ * | Searchable picker: trigger „Team wählen“, search „Hund oder Trainingspartner:in suchen“, options call name (bold) over Trainingspartner:in (grey); chosen „‹Rufname› · ‹Trainingspartner:in›“; „Keine passenden Teams gefunden.“; „(ohne Rufname)“ for an unresolved dog | Preselected when she keeps exactly one team. Changing it clears a chosen group training | „Bitte ein Team auswählen.“ |
| „Trainer:in“ * | Searchable picker: trigger „Trainer:in wählen“, search „Name suchen“, „Keine passenden Trainer:innen gefunden.“ | While joined: disabled, set to the group's Trainer:in, help text „Vom gewählten Gruppentraining übernommen.“ | „Bitte eine:n Trainer:in wählen.“ |
| „Trainingsart“ | Native select: „Keine Angabe“ (default), „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“, „Spezialtraining“, „Nachsorge“ | Optional. „Gruppentraining“ reveals the next field | Server errors only |
| „Gruppentraining“ * | Appears only with „Gruppentraining“. Native select: placeholder „Gruppentraining wählen“, options „‹Datum› · ‹Trainer:in›“ plus „ · ‹Ort›“ when known. Instead of the select, a grey notice: | | „Bitte ein Gruppentraining wählen.“ |
| | – „Bitte zuerst Datum und Team wählen, dann erscheinen die Gruppentrainings des Tages.“ | Date or team missing | |
| | – „Gruppentrainings werden geladen …“ | Loading | |
| | – „Die Gruppentrainings konnten gerade nicht geladen werden. Bitte später erneut versuchen.“ | Load failed | |
| | – „Am ‹Datum› gibt es kein Gruppentraining, dem Ihr Team beitreten kann. Die Trainer:in muss das Gruppentraining zuerst erfassen – oder wählen Sie eine andere Trainingsart.“ | No group that day | |
| „Inhalt“ | Six checkboxes in two columns: „Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“ | Optional. While joined: disabled with the group's values + the group hint | — |
| „Beginn“ | Time | Optional. While joined: disabled + group hint | — |
| „Ende“ | Time | Optional. While joined: disabled + group hint | — |
| „Ort / Adresse“ | Text | Optional. While joined: disabled + group hint | — |
| „Bemerkung“ | Multi-line text | Optional; her own remark, always editable | — |

No „Fahrtkosten“, no km, no ticket costs on this form.

### General error alert (above the buttons)

| Text | When |
| --- | --- |
| „Dieses Gruppentraining kann nicht mehr gewählt werden. Bitte Datum und Gruppentraining erneut wählen.“ | The chosen group is no longer available |
| „Diesem Gruppentraining kann gerade kein Team beitreten: ‹Rufname› (‹Zustand›), …. Bitte an die Trainingskoordination wenden.“ — states: „in einem Abrechnungs-Lauf“, „im Eigenrechnungs-Lauf“, „abgerechnet“, „fertig dokumentiert“ | A record of the group is locked |
| „Das gewählte Team ist nicht mehr verfügbar. Bitte aktualisieren und erneut auswählen.“ | Team gone |
| „Für diese Erfassung fehlt die Berechtigung. Bitte an die Trainingskoordination wenden.“ | Not permitted |
| „Die Angaben konnten nicht gespeichert werden. Bitte die gewählte Trainer:in prüfen.“ | Trainer:in not active / not available |
| „Training konnte gerade nicht gespeichert werden. Bitte später erneut versuchen.“ | Anything else |

Server field errors appear under the matching field.

### Buttons

- „Training speichern“ (primary; „Speichern ...“ while saving, then disabled)
- „Abbrechen“ (outline; goes to „Startseite“)

No dialogs. After saving: „Training gespeichert“ (see `shared--training-saved.md`).

## Behaviour the layout must keep

- The group-training field sits right after „Trainingsart“ and appears only for
  „Gruppentraining“; it depends on date and team, so those must come before it (or the
  notice must explain the dependency, as now).
- Changing date, team or kind clears the chosen group — she never joins a session of
  another day by mistake.
- While joined, the session fields are visibly locked and each carries the hint; her own
  entries come back if she leaves the group.
- Required marks come from the field's required state.

## Observations on the current layout (input for layout proposals)

- Same visual frame as the Trainer:in's form: one narrow card (about 448 px) centred on
  desktop with empty space around it; on the phone about 1090 CSS px tall (2184 px at 2x),
  save button only after all optional fields.
- The four required fields come first, which works; the optional block (Trainingsart,
  Inhalt, Beginn, Ende, Ort / Adresse, Bemerkung) is long for a person who usually only
  adds a remark.
- „Beginn“ and „Ende“ each take a full row.
- Inhalt checkboxes in two columns are tight on the phone („Reaktionsschulung“ runs into the
  second column's checkbox); targets are small.
- The two pickers look like text inputs with grey placeholder text, so it is not obvious
  they open a searchable list.
- Joined-group states, the group picker notices and errors are not in the screenshots.
