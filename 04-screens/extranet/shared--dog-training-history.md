# ‹Rufname› — Trainings (a dog's training history)

|                 |                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                                                                                                                                                      |
| **Role**        | Trainer:in and Trainingspartner:in: two mounts of the same page with different columns                                                                                                                        |
| **Menu item**   | None of its own. Reached from „Hunde“ / „Meine Hunde“ (and from a training detail's dog link); the header shows a back arrow to that list                                                                    |
| **Page title**  | „‹Rufname› — Trainings“, e.g. „Alma — Trainings“. „Trainings“ while loading; „(ohne Rufname) — Trainings“ when the dog record is not resolved                                                                 |
| **URL**         | `/trainer/dogs/:dogId/trainings` / `/training-partner/dogs/:dogId/trainings`                                                                                                                                  |
| **Screenshots** | `screenshots/extranet/trainer/07-dog-training-history--desktop.png`, `…--mobile.png`; `screenshots/extranet/training-partner/07-dog-training-history--desktop.png`, `…--mobile.png`                           |

## Purpose

Every training recorded on one dog, newest first. A Trainer:in sees **all** trainings on the
dog, by every Trainer:in and across every Trainingspartner:in the dog has had, so she can
see what colleagues worked on. A Trainingspartner:in sees only the trainings from the time
the dog was with her, including both remarks. Each date opens the training.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** Trainer:in a few times a week (preparing a session); Trainingspartner:in
  occasionally.
- **Mode:** reading and scanning backwards in time, sometimes narrowing by training type or
  date range. Nothing is entered.
- **Typical volume:** 5–50 trainings per dog, growing over the dog's training years
  (the seed shows 4).
- **Device:** often the phone (cards); also desktop (table).

## Inventory (fixed — every element must stay)

### States

| Element      | Text                                                                                        | When                                                   |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Loading text | „Lade ...“                                                                                  | Before the first answer                                |
| Error alert  | „Für diesen Hund fehlt die Berechtigung. Bitte an die Trainingskoordination wenden.“        | Not allowed to open this dog (Trainingspartner:in whose dog it never was; in principle both) |
| Error alert  | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“                    | Load failed otherwise                                  |
| Empty state  | „‹Rufname› — keine Trainings“                                                               | The dog has no training (in her scope); replaces filters and list |
| Empty rows   | „Keine Einträge.“                                                                           | The filters leave no row (in the table, and in place of the cards) |

### Filters

| Filter         | Type                                                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Trainingsart“ | Multi-select popover with a search field (placeholder „Trainingsart“) and a count per option; only types present in the data; „(keine Angabe)“ option only when a training without type exists; „Keine Treffer.“ when the search matches nothing. The trigger shows the chosen types (desktop) or their count (narrow) |
| „Von“          | Date                                                                                                                                               |
| „Bis“          | Date                                                                                                                                               |

There is no reset button and no column menu („Spalten“) on this page. Filters are not kept
in the URL.

Training types (labels): „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“,
„Spezialtraining“, „Nachsorge“.

### Table (desktop, from the `md` breakpoint)

Sorted by „Datum“ descending at first. Every column header except the two remark columns
is a sort toggle (arrow icon showing the direction).

| Column                          | Trainer:in | Trainingspartner:in | Notes                                                                                       |
| ------------------------------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------- |
| Datum                           | yes        | yes                 | Link into the training (see „Where a date leads“)                                           |
| Trainingsart                    | yes        | yes                 | „—“ when empty                                                                              |
| Trainer:in                      | yes        | yes                 |                                                                                             |
| Trainingspartner:in zur Zeit    | yes        | no                  | The keeper at the time of that training                                                    |
| Dauer                           | yes        | yes                 | h:mm                                                                                        |
| Inhalt                          | yes        | yes                 | One outline chip per content („Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“); „—“ when empty |
| Bemerkung Trainer:in            | no         | yes                 | Free text, cut to one line with the full text on hover; „—“ when empty; not sortable        |
| Bemerkung Trainingspartner:in   | no         | yes                 | Same                                                                                        |

### Cards (phone, below the `md` breakpoint; replace the table)

One card per training, in the table's filtered and sorted order:

- header: the date as a link (left) and the training type as a grey badge (right; „—“ when empty)
- label–value list: „Trainer:in“, „Trainingspartner:in zur Zeit“ (Trainer:in only), „Dauer“,
  „Inhalt“ (chips), „Bemerkung Trainer:in“ and „Bemerkung Trainingspartner:in“
  (Trainingspartner:in only; full text, wrapping)

### Where a date leads

- Trainingspartner:in: always her own training detail (`/training-partner/trainings/:id`);
  its back arrow returns to this history.
- Trainer:in, **her own** training: her editable training detail (`/trainer/trainings/:id`);
  its back arrow returns to this history.
- Trainer:in, **a colleague's** training: the dog file's read-only reading
  (`/trainer/dogs/:dogId/trainings/:id`, see `trainer--dog-file-training.md`).

The two Trainer:in targets look identical in the list; nothing marks which rows are hers.

## Differences per role

| Aspect                        | Trainer:in                                  | Trainingspartner:in                           |
| ----------------------------- | ------------------------------------------- | --------------------------------------------- |
| Rows                          | Every training on the dog                   | Only trainings from her keeper phases         |
| „Trainingspartner:in zur Zeit“ | shown (column and card line)                | not shown (would repeat her name)             |
| The two remark columns        | not shown (her data does not contain them)  | shown (column and card lines)                 |
| Date target                   | Own training or dog-file reading            | Always her own training detail                |
| Back arrow                    | to „Hunde“                                  | to „Meine Hunde“                              |

## Behaviour the layout must keep

- No totals or summary on this page (deliberate: the story asks for none).
- The cards and the table read the same filtered, sorted rows, so the filters work on both.
- A remark is never shown as „—“ for the Trainer:in: the columns are absent, because the
  value exists but is not hers to read. Do not add placeholder remark fields for her.
- The date is the only entry into the detail (no whole-row link today). A whole-card tap
  target would be a layout change, acceptable as long as the date link remains.

## Observations on the current layout (input for layout proposals)

- **Phone: the filters take a third of the first screen.** „Trainingsart“, „Von“ and „Bis“
  wrap onto two rows with labels above the date inputs, before the first card.
- **Phone: there is no way to sort.** The sort toggles live only in the hidden table headers;
  the cards are always newest first.
- **Phone: the card label column is as wide as its longest label.** „Trainingspartner:in zur
  Zeit“ (Trainer:in) and „Bemerkung Trainingspartner:in“ (Trainingspartner:in) take more than
  half the card width, squeezing the values; content chips such as „Reaktionsschulung“ then
  run past the card's right edge.
- **Phone: the header title wraps** („Alma — / Trainings“) and the account name beside it
  wraps too („Anna / Trainer“).
- A thin grey line is left under the last card: the border of the hidden desktop table.
- Desktop: the table is narrow and short (4 rows in the seed) with the rest of the page empty;
  the filters sit in one line above it, the „Trainingsart“ trigger has a dashed border and
  no label above it while „Von“ and „Bis“ do, so the three controls do not line up.
- Desktop (Trainingspartner:in): long remarks are cut to one line („Die Gruppe war groß, das
  war anstren…“), readable only on hover, not on touch.
- The page has no dog context beyond the title: no Trainingspartner:in name, no count of
  trainings. Any such header would be an **optional addition**.
