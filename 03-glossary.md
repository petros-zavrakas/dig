# Glossary

Terms a designer meets on screen. German UI label first (verbatim), then the English name
used in this brief and in code, then what it means. Derived from the project glossary
(`CONTEXT.md`); only terms that appear in the UI.

## Apps and people

| German UI label | English name | Meaning |
|---|---|---|
| „Intranet“ | Intranet | The office app (coordination, treasury, board, administration). Desktop, VPN only. |
| „Extranet“ | Extranet | The field app for trainers and Trainingspartner:innen. Internet, phone and desktop. |
| „Trainer:in“ | Trainer | A (usually freelance) dog trainer who conducts and records trainings and invoices the association. |
| „Trainingspartner:in“ | Training partner | The person who keeps a dog in training (foster family, self-trainer, later client). |
| „Trainingskoordinator:in“ | Training coordinator | Office role: maintains master data, corrects trainings, releases them for billing. |
| „Kassenwart:in“ | Treasurer | Office role: classifies trainings, runs club billing, checks trainer invoices. |
| „Vorstand“ | Board | Read-only office role. |
| „Administrator:in“ | Administrator | Manages logins and roles. |
| „Rolle“ | Role | What a login may do; decides the menu sections. Several per login are normal. |
| „Person“ / „Personen“ | Person | The master record of a human or organisation (contact data). Can be linked to one login. |
| „Konto“ / „Konten“ | Account | A login: email, display name, roles, status. |
| „Aktiv“ / „Gesperrt“ | Account status | Whether a login can sign in. „Gesperrt“ means locked. |
| „Wartet auf Erstpasswort“ / „Passwort gesetzt“ | (derived from the account) | The account was created but its owner has not set a first password yet / has. |
| „Passwort-Reset“ | Reset token | A mailed one-time link to set a new password; the old one stays valid until then. |

## Dogs and teams

| German UI label | English name | Meaning |
|---|---|---|
| „Hund“ / „Hunde“ | Dog | A dog in training or in service. Master data lives in the Intranet. |
| „Team“ | Team | A dog together with its current Trainingspartner:in. Not a record of its own. Shown as „‹Trainingspartner:in› · ‹Hund›“. |
| „Hund-Kontakt“ | Dog contact | A dated link between a dog and a person; the keeper rows form the keeper history. |
| „Eigentümer (am Hund)“ | Ownership | Who owns the dog: the association or the self-trainer. |
| „Wurf“ | Litter | A free-text label for a generation of foster dogs, e.g. „Wurf 2023-A“. |
| „Hund-Status“ (values „aktiv“ / „archiviert“) | Dog status | Whether the dog appears in the default list. |
| „Phase“ | Dog phase | Training stage: „Welpe“, „Patenzeit“, „Grundausbildung“, „Spezialausbildung“, „Teamphase“, „Nachbetreuung“, „Rente“, „Archiv“. |
| „Ausbildungsart“ | Training track | On the dog: club training or self-training. Not the same as „Trainingsart“. |
| „Geschlecht“ („Rüde“ / „Hündin“) | Sex | Male / female dog. |
| „Trainer:in-Status“ | Trainer profile status | Whether a trainer is active or archived. |

## Trainings

| German UI label | English name | Meaning |
|---|---|---|
| „Training“ / „Trainings“ | Training | One recorded session of one team: date, times, duration, kind, content, location, travel. |
| „Trainingsart“ | Training type | Kind of session: „Patentraining“, „Einzeltraining“, „Gruppentraining“, „Stadtgang“, „Spezialtraining“, „Nachsorge“. |
| „Gruppentraining“ | Group training | One session with several teams, recorded as one training per team that share their session fields. Shown e.g. as „Gruppentraining (n Teams)“. |
| „Inhalt“ | Training content | Multi-select focus areas: „Sozialisierung“, „Basisausbildung“, „Einarbeitung“, „Spezialausbildung“, „Reaktionsschulung“, „Verhalten“. |
| „Fahrtkosten“ | Travel-cost mode / travel amount | As a field: how the trainer travelled: „keine Anfahrt“, „Pauschale“ (flat rate), kilometres, „Fahrkarte“ (ticket). Undeclared means the travel amount cannot be computed. As an amount column: the travel charge or reimbursement (once per group training on the trainer track). |
| „gefahrene km“ / „Ticketkosten“ | Kilometres / ticket cost | The operands of the travel-cost mode. |
| „fertig dokumentiert“ (badge „Als fertig dokumentiert markiert“) | Finished documentation | A party has declared the facts complete; the factual fields are then frozen. |
| „Dokumentation fertig“ / „Dokumentation offen“ | Documentation badge | Small green / orange icon badge in lists showing the same fact. |
| „Erfasst von“ | Entered by party | Which party (trainer or Trainingspartner:in) created the record. |
| „Bemerkung“ (of the Trainer:in / of the Trainingspartner:in) | Party remark | Each party's own free-text note on a training. |
| „Korrektur“ / „Korrektur-Grund“ | Correction | The coordinator's change to a training, with an optional reason; logged. |
| „Änderungshistorie“ | Audit log | The list of logged changes (e.g. on „Tarife“). |
| „Neues Training“ / „Training gespeichert“ | Training capture | The entry form in the Extranet and its confirmation. |

## Club billing (the association bills the team)

| German UI label | English name | Meaning |
|---|---|---|
| „Kostenpflicht-Variante“ | Chargeability variant | Whether and how a training is charged: „ja“ (with travel shown, e.g. „ja mit Anfahrtspauschale“, „ja (Fahrtkosten nicht deklariert)“), group with flat rate, group without flat rate, „nein“. Locked once released. |
| „zur Abrechnung freigeben“ / „Freigabe zurücknehmen“ (short: „Freigeben“; state „freigegeben“) | Billable mark | Releasing a classified training into club billing, and withdrawing that. |
| „Abrechnungsstatus“ | Lock state | The training's position in club billing: „noch nicht freigegeben“ → „zur Abrechnung freigegeben“ → in a run → „abgerechnet“. |
| „Bemerkung Kasse“ | Treasurer remark | Internal billing note; editable in every state. Intranet only. |
| „Abrechnungs-Lauf“ | Club billing run | One team's released trainings bundled for one invoice. „In Vorbereitung“ (in preparation) until closed, then billed and frozen. |
| „Lauf verwerfen“ / „Lauf verworfen.“ | Discard | Deleting a run in preparation; its trainings return to released. |
| „Rechnungen“ / „Abgeschlossene Rechnungen“ | (menu labels) | Open billable trainings / closed club billing runs, one per invoice. |
| „Rechnungsnummer“ / „Rechnungsdatum“ | External invoice number / date | Taken from the association's accounting software when a run is closed. |
| „Anlage zur Rechnung“ | Invoice attachment | The PDF listing the trainings of a closed run, attached to the club's invoice. |
| „Tarif“ / „Tarife“ | Tariff | The seven association-wide rates charged to the team (hourly rates per kind, standard and reduced; travel flats; kilometre rate). |
| „Erstattung Trainer:in“ | Trainer reimbursement | The two rates the association pays a trainer for travel (flat rate and kilometre rate). On the „Tarife“ screen. |
| „Trainingsgebühr“ | Fee | The charge for the training time (duration × hourly rate). |
| „Vorläufige Beträge“ | Provisional amount | Amounts on open lists computed at the standard rate; final only in a run. |
| „nicht berechenbar“ | Not computable | An amount that cannot be computed because an input is missing (shown amber, never as zero). |
| „Hinweis“ | Hint | Neutral info icon explaining a rule that applied to an amount. |

## Trainer self-invoice (the trainer bills the association)

| German UI label | English name | Meaning |
|---|---|---|
| „Eigenrechnung“ | Trainer self-invoice | The trainer's own invoice to the association for the sessions she conducted. |
| „Eigenrechnungs-Lauf“ | Trainer billing run | Her sessions bundled for one self-invoice, with her own hourly rate. Only she sees it. |
| „Eigenrechnungs-Status“ | Trainer billing state | The training's position in her track: open → in a run → billed. Distinct from „Abrechnungsstatus“. |
| „Offene Trainings für die Eigenrechnung“ (menu „Rechnung“) | (page title) | Her sessions not yet in any run. |
| „Abgeschlossene Eigenrechnungen“ | (page title) | Her closed runs, newest first. |
| „Anlage zur Eigenrechnung“ | Trainer invoice attachment | The PDF she attaches to her invoice; made anew on each download. |
| „Trainer-Abrechnung“ / „Offene Trainings je Trainer:in“ | (Intranet menu label / page title) | The treasurer's view of each trainer's open sessions, to check an incoming invoice. |
