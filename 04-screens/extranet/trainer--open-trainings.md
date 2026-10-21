# Rechnung — Offene Trainings für die Eigenrechnung

|                 |                                                                                        |
| --------------- | -------------------------------------------------------------------------------------- |
| **Context**     | Extranet                                                                               |
| **Role**        | Trainer:in                                                                             |
| **Menu item**   | „Rechnung“ in the „Trainer:in“ section                                                 |
| **Page title**  | „Offene Trainings für die Eigenrechnung“                                               |
| **URL**         | `/trainer/open-trainings` (period filter in the URL: `?from=…&to=…`)                   |
| **Screenshots** | `screenshots/extranet/trainer/08-open-trainings--desktop.png`, `…--mobile.png`<br>**States:** `screenshots/extranet/trainer/states/05-open-trainings-row-ticked--desktop.png`, `screenshots/extranet/trainer/states/08-open-trainings-with-run-notice--desktop.png` (each also `--mobile.png`) |
## Purpose

The Trainer:in's work queue for her **self-invoice** to the association: every session she
conducted that is not yet in one of her „Eigenrechnungs-Läufe“. She ticks sessions and
bundles them into an „Eigenrechnungs-Lauf“ (or adds them to the one already in
preparation); on the run page she enters her hourly rate and later her invoice number. This
is her own billing track, independent of the club's billing („Abrechnungsstatus“) — her
screens never use the bare word „Abrechnung“. A group training counts as **one** session
here, however many teams took part.

## Usage

> Draft: estimated from the domain docs and the seed data. Petros to confirm.

- **Frequency:** once a month or once a quarter, when she writes her invoice.
- **Mode:** checking and selecting. She checks that each session has its travel declared,
  narrows to a period (often a quarter), ticks sessions and creates the run. No data entry
  on this page; a missing travel declaration is fixed through the session's date link.
- **Typical volume:** 10–40 open sessions per quarter; if she has not invoiced for a long
  time, close to 100 (the seed shows 89).
- **Device:** desktop and phone both; on the phone this page is very long.

## Inventory (fixed — every element must stay)

### Above the content (each appears only in some states)

| Element        | Text                                                                                                                                                                                       | When                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Loading text   | „Lade ...“                                                                                                                                                                                 | Before the first answer                    |
| Error alert    | „Trainings konnten nicht geladen werden. Bitte später erneut versuchen.“                                                                                                                   | Load failed                                |
| Notice (warning icon, not an error, no link) | „Die Erstattungssätze für Fahrtkosten sind noch nicht hinterlegt — die Fahrtkosten können noch nicht berechnet werden. Der Verein pflegt sie im Intranet.“ | The association has not saved its reimbursement rates. The „Fahrtkosten“ column, card line and sum box then disappear, and every checkbox is disabled |

### Sum boxes (four boxes; a row on desktop, 2 × 2 on the phone)

Totals over the rows the period filter leaves. Each label is the column it adds.

| Box            | Value                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Trainings“    | Number of rows                                                                                                                                     |
| „Dauer“        | Sum in h:mm (can exceed 24 hours, e.g. „111:55“)                                                                                                   |
| „gefahrene km“ | Sum of kilometres, or „—“ when no row has any                                                                                                      |
| „Fahrtkosten“  | Sum in euro; under it in amber „+ n nicht berechenbar“ when some amounts are missing, or „—“ over „n nicht berechenbar“ when none is known. Hidden while the rates are not maintained |

### Filters

| Filter                | Type                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| „Von“                 | Date (session date)                                                                                          |
| „Bis“                 | Date                                                                                                         |
| „Quartal“             | Native select of the quarters that contain rows, newest first, e.g. „Q3 2026“; choosing one fills „Von“/„Bis“; disabled when there are no rows |
| „Filter zurücksetzen“ | Button, only while a date is set                                                                             |

The filters stay visible over the empty states too.

### Toolbar

- „Spalten“: column visibility menu (offers „Hund“, „Trainingspartner:in zur Zeit“,
  „Ticketkosten“).

### Selection and action (under the filters, above the rows)

- Count, announced to screen readers: „0 Trainings ausgewählt“ / „1 Training ausgewählt“ /
  „n Trainings ausgewählt“.
- Primary button:
  - „Eigenrechnungs-Lauf erstellen“ (while she has no run in preparation); while sending
    „Wird erstellt ...“
  - „Zum Rechnungslauf hinzufügen“ (while she has a run in preparation); while sending
    „Wird hinzugefügt ...“
  - Disabled while nothing is ticked. On success she is taken to the run page.
  - No confirmation dialog.
- Error alert under the button when the action is refused or fails. Every refusal starts
  „Nichts wurde übernommen:“ followed by one of:
  - „Die Erstattungssätze für Fahrtkosten sind noch nicht hinterlegt, ein
    Eigenrechnungs-Lauf kann noch nicht erstellt werden. Der Verein pflegt sie im Intranet.“
  - „Nicht mehr in Ihren offenen Trainings: ‹Training vom dd.mm.yyyy, …›. Die Liste ist
    aktualisiert.“
  - „Bereits in einem Eigenrechnungs-Lauf: ‹…›. Die Liste ist aktualisiert.“
  - „Nicht berechenbar: ‹Training vom dd.mm.yyyy (Fahrtkosten nicht angegeben)› / ‹Gruppentraining
    vom dd.mm.yyyy (unterschiedliche Fahrtangaben der Teams)›.“
  - Other failures: „Der Eigenrechnungs-Lauf konnte gerade nicht erstellt werden. Bitte
    später erneut versuchen.“ / „Die Trainings konnten gerade nicht hinzugefügt werden. Bitte
    später erneut versuchen.“
- Notice (only while a run is in preparation, right above the rows; also over the empty
  states): „Sie haben einen Eigenrechnungs-Lauf in Vorbereitung (‹Zeitraum›, n Trainings).“ +
  link „Eigenrechnungs-Lauf öffnen“.

### Table (desktop, from the `md` breakpoint)

Rows in the server's order (by date); **no column sorts**. A leading checkbox column (header
„Auswahl“, visually hidden; there is no „select all“). Row checkbox: „Training vom ‹Datum›
auswählen“ / „Gruppentraining vom ‹Datum› auswählen“. It is disabled, with a tooltip giving
the reason, when the session's travel cost cannot be computed or the rates are not
maintained („Die Erstattungssätze für Fahrtkosten sind noch nicht hinterlegt — ein
Eigenrechnungs-Lauf kann noch nicht erstellt werden.“).

| Column                       | Shown by default | Can be hidden | Notes                                                                                                         |
| ---------------------------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| Datum                        | yes              | no            | Link to her training detail (back arrow returns to this filtered view); **plain text** for a group training  |
| Dauer                        | yes              | no            | h:mm                                                                                                          |
| Hund                         | yes              | yes           | Call names, comma-separated for a group training                                                              |
| Trainingspartner:in zur Zeit | no               | yes           | Comma-separated for a group training                                                                          |
| Trainingsart                 | yes              | no            | Preceded by the **documentation badge**. A group training reads „Gruppentraining · n Teams“ („· 1 Team“) as a link to „Meine Trainings“ narrowed to that group training |
| gefahrene km                 | yes              | no            | „—“ when empty; amber „uneinheitlich“ marker for a group training whose teams disagree                         |
| Ticketkosten                 | yes              | yes           | Euro or „—“; amber „uneinheitlich“ as above                                                                    |
| Fahrtkosten                  | yes              | no            | Header carries a grey info marker („Hinweis“) with the rule (below). Hidden while the rates are not maintained |

Header hint on „Fahrtkosten“: „Fahrtkosten: Ihre Erstattung je Training — Pauschale, gefahrene
km × km-Satz oder Fahrkarte, mindestens die Pauschale; ohne Anfahrt 0,00 €. Vorläufig zu den
aktuellen Sätzen: verbindlich werden sie erst in Ihrem Eigenrechnungs-Lauf.“

### Cards (phone, below the `md` breakpoint; replace the table)

One card per row, in the same order:

- header: checkbox, the date (link or plain text as in the table), and on the right the
  documentation badge
- label–value list: „Dauer“, „Hund“, „Trainingsart“, „gefahrene km“, „Ticketkosten“,
  „Fahrtkosten“ (with the same info marker after the label; hidden while the rates are not
  maintained). „Trainingspartner:in zur Zeit“ is not on the card.
- A disabled card checkbox gives its reason only to screen readers (no tooltip).

### Markers and badges

- **Documentation badge** (round 24 px icon button, tooltip opens on tap): green
  „Dokumentation fertig“; orange „Dokumentation offen — Sach-Felder können sich noch ändern“;
  for a group training not finished by all teams „Dokumentation offen — nicht bei allen Teams
  fertig. Sach-Felder können sich noch ändern.“ Each state has its own icon.
- **Amber „nicht berechenbar“** pill (warning icon + text) in place of a missing travel
  amount; tooltip: „Die Fahrtkosten sind nicht angegeben. Ergänzen Sie sie im Training — ist es
  fertig dokumentiert, nehmen Sie „fertig“ zuvor zurück. Ist es vom Verein abgerechnet,
  korrigiert die Trainingskoordinator:in.“ or, for a group training, „Die Teams dieses
  Gruppentrainings haben unterschiedliche Fahrtangaben. Korrektur durch die
  Trainingskoordinator:in.“
- **Amber „uneinheitlich“** pill in „gefahrene km“ and „Ticketkosten“ (group training whose
  teams disagree), same group tooltip.
- **Neutral „Hinweis“** (small round grey info icon) after a 0,00 € travel amount: „Keine
  Anfahrt: Sie haben angegeben, nicht angereist zu sein.“

### Empty states (in place of sum boxes and list; filters and run notice stay above)

- No period set: „Keine offenen Trainings.“
- A period set: „Keine Treffer für diese Filter.“ + button „Filter zurücksetzen“

## Behaviour the layout must keep

- Sum boxes, table and cards always show the same rows (the filtered ones).
- A session filtered out is unticked, so she never sends sessions she cannot see.
- The button posts exactly the ticked sessions, with no dialog; the hourly rate is not asked
  here (it is entered on the run page).
- At most one run in preparation: while one exists, the button adds to it and the notice
  links to it.
- The Fahrtkosten rule is said once, at the column header (and the card label), never per row.
- Unfinished documentation does not block selection; only a missing travel amount does.

## Observations on the current layout (input for layout proposals)

- **Desktop: the table is cut off.** Long dog names in a group training (test data with three
  long „E2E“ names in one cell) make „Hund“ so wide that „Trainingsart“ is cut at the right
  edge, and „gefahrene km“, „Ticketkosten“ and „Fahrtkosten“ are entirely off-screen at
  1,440 px. Real group trainings with several dogs also produce long comma lists.
- **Phone: the page is extremely long** (89 cards, about 40,000 px at phone resolution). The
  count and the action button sit at the top, so after ticking cards further down she must
  scroll all the way back up to act. A sticky action bar is a layout choice, not a new element.
- **Phone: the top of the page is crowded before the first card:** four sum boxes, the date
  filters on two rows, „Spalten“ alone on its row, the count, the button and the run notice.
  „Spalten“ has no visible effect on the phone (the cards ignore column visibility).
- The disabled button is a flat grey block; with nothing ticked it reads as broken rather
  than waiting.
- The run-in-preparation notice is a plain bordered box that looks like the sum boxes; it is
  the most important fact when it appears.
- The checkboxes are very faint (light grey border); disabled ones barely differ from
  enabled ones, and on the phone the reason is not visible at all — only the amber
  „nicht berechenbar“ on the same card hints at it.
- Each card repeats six labels; „—“ fills many lines („gefahrene km“, „Ticketkosten“), which
  adds height without information.
- The „Quartal“ select is empty (no placeholder text) until a quarter is chosen.
- The amber „+ 24 nicht berechenbar“ under the Fahrtkosten total is small; it is the main
  thing she has to fix before invoicing.
