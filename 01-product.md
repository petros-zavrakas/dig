# Product

## The organisation

**Hunde für Handicaps e. V.** is a non-profit association in Berlin. Since 1991 it has
trained assistance dogs for people with a physical disability or chronic illness: dogs
that pick things up, open doors, press light switches. It is accredited by Assistance
Dogs International and must prove the quality of its training every year (German
assistance-dog regulation) and every five years (re-accreditation). That proof is
documentation: which dog was trained when, by whom, on what.

Before the portal, this lived in an Access database, shared Excel workbooks and a network
drive. The portal replaces them step by step. What exists today covers people, dogs,
trainings and billing. Training progress, the health diary, work logs and reports are
planned for later and are **not** part of this brief.

The people involved:

- **Trainer:innen** — mostly freelance dog trainers paid by the association per hour.
- **Trainingspartner:innen** — the person who keeps a dog in training: a foster family,
  someone training their own dog, or a later client. One person with one dog is a „Team“.
- **Office staff** — a training coordinator and a treasurer, both employed.
- **The board** („Vorstand“) — volunteers who want to see the state of things.
- **An administrator** who manages logins (usually one of the office staff as well).

## The two apps

| | Intranet | Extranet |
|---|---|---|
| Who | Office staff, board, administrator | Trainer:innen and Trainingspartner:innen |
| Where | Office desktop, reachable only through the association's VPN | Public internet, on phones in the field and on desktop |
| Character | Dense, table-heavy back office: lists of 100+ rows, filters, bulk actions, money | Few records, quick entry right after a training, large touch targets |
| Address | `intranet.localhost` | `extranet.localhost` |

**Why they look alike but are separate.** They are two independent applications, each
with its own server and its own database, kept in step by a background synchronisation.
The split is a security decision: the Extranet faces the internet, so it never holds
data it does not need (no rates the club charges, no internal billing notes, no other
people's contact data), and it cannot reach the Intranet's database at all.

Both are built from one shared kit of neutral UI components (shadcn/ui + Tailwind), so
today they look the same. Each has its own theme file that can override the design tokens
(empty today), so the redesign may give each app its own density or accent while sharing
the components. Nothing domain-specific is shared between them.

A person can hold several roles. The menu then shows one section per role (see
`02-roles.md`).

## The core flow, end to end

**1. A training is recorded (Extranet).** After a session, the Trainer:in opens
„Meine Trainings“ → „Neues Training“ on her phone and records date, time, duration, the
team (dog), the kind of training („Trainingsart“), its content („Inhalt“), the location
and how she travelled („Fahrtkosten“: none, flat rate, kilometres or a ticket). A
„Gruppentraining“ records one session with several teams at once. The
Trainingspartner:in can record a training from her side too, or add to one, and each of
them has a private remark field. When the facts are complete, a party ticks
„fertig dokumentiert“, which freezes the factual fields.

**2. It appears in the Intranet.** Seconds later the training shows up in the
„Trainings“ list of the coordinator, the treasurer and the board, each with its own
view and rights. A documentation badge shows whether it is documented yet.

**3. The coordinator corrects.** The Trainingskoordinator:in checks the records and can
correct any field (with an optional reason), fill in a missing one from a paper note,
or delete a record. Every change is logged.

**4. The treasurer classifies and releases it for billing.** On the training list, the
coordinator or the treasurer sets the „Kostenpflicht-Variante“ (whether and how the
training is charged to the Trainingspartner:in: „ja“, group with flat rate, group without
flat rate, „nein“) and then releases the training: „zur Abrechnung freigeben“ (short in a
table: „Freigeben“; afterwards „freigegeben“). A note for the cash office
(„Bemerkung Kasse“) can be added at any time.

**5. The club bills the team.** Under „Rechnungen“ the Kassenwart:in sees every released
training not yet invoiced, grouped by team, with amounts computed from the association's
rates („Tarife“). She bundles one team's trainings into an „Abrechnungs-Lauf“, checks it,
chooses the standard or reduced hourly rate, writes the actual invoice in the
association's separate accounting software, then closes the run with that invoice's
number and date. The portal then produces the „Anlage zur Rechnung“ (a PDF listing the
trainings, attached to the invoice) and the run moves to „Abgeschlossene Rechnungen“.
The run and its trainings are now frozen.

**6. The trainer invoices the association („Eigenrechnung“).** Independently of the club
track, the Trainer:in sees under „Rechnung“ all her sessions not yet invoiced, with her
travel reimbursement computed. She bundles them into an „Eigenrechnungs-Lauf“, enters her
own hourly rate, writes her invoice to the association in her own software, and closes
the run with her invoice number and date. She downloads the
„Anlage zur Eigenrechnung“ (PDF) to attach to it. Closed runs are listed under
„Abgeschlossene Rechnungen“. In the Intranet the treasurer checks an incoming trainer
invoice against „Trainer-Abrechnung“ (open trainings per Trainer:in).

The two billing tracks are separate: one training can be in the club's run and in the
trainer's run at the same time, and each track locks the fields that move its amounts.
This is why many screens show two different statuses („Abrechnungsstatus“ for the club,
„Eigenrechnungs-Status“ for the trainer) and why fields are often read-only with a
reason in a tooltip.

## Supporting data

- **Hunde** — the dog master record (call name, breed, sex, date of birth, training
  track, phase, litter, status) and, per dog, who keeps it (the keeper history).
- **Personen** — everyone the association holds data on: trainers, Trainingspartner:innen
  and pure contacts. A person can be linked to a login.
- **Konten** — logins with roles, status (active, locked, waiting for the first password)
  and password reset.
- **Tarife** — the seven rates the club charges and the two rates it reimburses trainers
  for travel, with a change history.

## What matters for the design

- The UI is German; labels are long and gender-inclusive („Trainingspartner:in“).
- Many screens are wide tables with filters, grouping, sums and markers. Scanning and
  finding rows is the main effort in the Intranet.
- Status and locks are everywhere, explained in tooltips. They must be legible without
  being loud.
- Money: amounts in euro with German formatting („1.234,50 €“), provisional amounts
  marked as such, and missing amounts flagged rather than shown as zero.
- The Extranet must be comfortable one-handed on a phone.
