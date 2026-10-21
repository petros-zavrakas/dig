# Roles and menus

Six login roles. A role belongs to one app only. An account can hold several roles; the
menu then shows one section per role held.

| German label | English name | App | Role slug (screen files) |
|---|---|---|---|
| „Trainingskoordinator:in“ | Training coordinator | Intranet | `training-coordinator` |
| „Kassenwart:in“ | Treasurer | Intranet | `treasurer` |
| „Vorstand“ | Board | Intranet | `board` |
| „Administrator:in“ | Administrator | Intranet | `admin` |
| „Trainer:in“ | Trainer | Extranet | `trainer` |
| „Trainingspartner:in“ | Training partner | Extranet | `training-partner` |

Screen files: `04-screens/<app>/<role-slug>--<screen-slug>.md`, e.g.
`04-screens/intranet/treasurer--billable-trainings.md`. Screens used by every role of an
app (sign-in, password pages, the start page, the navigation drawer) use `shared`, e.g.
`04-screens/shared/shared--login.md`. The file list in `04-screens/` is authoritative;
the names below follow the pattern and the screenshot slugs.

## What each role does

- **Trainingskoordinator:in** (employed, full access to the training data). Maintains
  dogs, people, trainers and keeper assignments; checks and corrects trainings; sets the
  „Kostenpflicht-Variante“ and releases trainings for billing; maintains the rates.
  Desktop, daily, mostly reading lists and correcting single records.
- **Kassenwart:in** (employed). Classifies and releases trainings for billing, bundles
  released trainings into club billing runs, closes them with the invoice number, checks
  trainers' invoices, maintains the rates. Desktop, in bursts around quarter ends.
- **Vorstand** (volunteers). Reads dogs and trainings; writes nothing.
- **Administrator:in**. Creates logins, assigns roles, locks and unlocks, sends password
  resets. Rare.
- **Trainer:in** (freelance). Records her trainings, sees every active team's dogs and
  their training history, and invoices the association for her own sessions. Phone in the
  field and desktop.
- **Trainingspartner:in** (keeps a dog). Records or complements trainings of her own
  dog(s) from her side and reads their history. Mostly phone.

## Menu trees

The menu is a left-hand drawer opened from the header (at every screen width). Each
section has a small uppercase heading (the German role name); the first section has no
heading. Order is fixed. Icons are lucide-react.

### Intranet

```
(no heading)
  Übersicht                    [LayoutDashboard]  /                       → intranet/shared--dashboard
Trainingskoordinator:in
  Hunde                        [Dog]              /training-coordinator/dogs       → training-coordinator--dogs
  Personen                     [Contact]          /training-coordinator/persons    → training-coordinator--persons
  Trainings                    [ClipboardList]    /training-coordinator/trainings  → training-coordinator--trainings
  Tarife                       [Euro]             /training-coordinator/tariffs    → training-coordinator--tariffs
Kassenwart:in
  Hunde                        [Dog]              /treasurer/dogs                  → treasurer--dogs
  Trainings                    [ClipboardList]    /treasurer/trainings             → treasurer--trainings
  Rechnungen                   [Receipt]          /treasurer/billable-trainings    → treasurer--billable-trainings
  Abgeschlossene Rechnungen    [FileCheck]        /treasurer/billed-club-billing-runs → treasurer--billed-club-billing-runs
  Trainer-Abrechnung           [HandCoins]        /treasurer/trainer-open-trainings   → treasurer--trainer-open-trainings
  Tarife                       [Euro]             /treasurer/tariffs               → treasurer--tariffs
Vorstand
  Hunde                        [Dog]              /board/dogs                      → board--dogs
  Trainings                    [ClipboardList]    /board/trainings                 → board--trainings
Administrator:in
  Konten                       [Users]            /admin/accounts                  → admin--accounts
```

Screens reached from these, not in the menu:

| Role | Screen | URL | File |
|---|---|---|---|
| Training coordinator | „Hund anlegen“ | `/training-coordinator/dogs/new` | `training-coordinator--dog-create` |
| Training coordinator | „Hund“ (detail) | `/training-coordinator/dogs/:id` | `training-coordinator--dog-detail` |
| Training coordinator | „Person anlegen“ | `/training-coordinator/persons/new` | `training-coordinator--person-create` |
| Training coordinator | „Person“ (detail) | `/training-coordinator/persons/:id` | `training-coordinator--person-detail` |
| Training coordinator | „Trainer:in anlegen“ (also the dashboard's „Schnellzugriff“) | `/training-coordinator/trainers/new` | `training-coordinator--trainer-create` |
| Training coordinator | „Trainer:in“ (detail) | `/training-coordinator/trainers/:id` | `training-coordinator--trainer-detail` |
| Training coordinator | „Training“ (detail, correction) | `/training-coordinator/trainings/:id` | `training-coordinator--training-detail` |
| Treasurer | „Hund“ (detail) | `/treasurer/dogs/:id` | `treasurer--dog-detail` |
| Treasurer | „Training“ (detail) | `/treasurer/trainings/:id` | `treasurer--training-detail` |
| Treasurer | „Abrechnungs-Lauf“ (in preparation or billed) | `/treasurer/club-billing-runs/:id` | `treasurer--club-billing-run` |
| Board | „Hund“ / „Training“ (detail, read-only) | `/board/dogs/:id`, `/board/trainings/:id` | `board--dog-detail`, `board--training-detail` |
| Administrator | „Konto anlegen“ / „Konto“ | `/admin/accounts/new`, `/admin/accounts/:id` | `admin--account-create`, `admin--account-detail` |
| All | „Anmelden“, password reset, set password | `/login`, `/reset-password`, `/set-password` | `shared--login`, `shared--reset-password`, `shared--set-password` |

The header's right side holds the user menu (display name; dropdown with the email and
„Abmelden“).

### Extranet

```
(no heading)
  Startseite                   [House]            /                                   → extranet/shared--home
Trainer:in
  Meine Trainings              [ClipboardList]    /trainer/trainings                  → trainer--trainings
  Hunde                        [Dog]              /trainer/dogs                       → trainer--dogs
  Rechnung                     [Receipt]          /trainer/open-trainings             → trainer--open-trainings
  Abgeschlossene Rechnungen    [FileCheck]        /trainer/billed-trainer-billing-runs → trainer--billed-trainer-billing-runs
Trainingspartner:in
  Meine Trainings              [ClipboardList]    /training-partner/trainings         → training-partner--trainings
  Meine Hunde                  [Dog]              /training-partner/dogs              → training-partner--dogs
```

„Neues Training“ is deliberately **not** a menu item: it is the primary button on each
„Meine Trainings“ page and on the start page.

| Role | Screen | URL | File |
|---|---|---|---|
| Trainer | „Neues Training“ (capture) | `/trainer/trainings/new` | `trainer--training-capture` |
| Trainer | „Training gespeichert“ (confirmation) | `/trainer/trainings/saved` | `trainer--training-saved` |
| Trainer | „Training“ (detail, edit) | `/trainer/trainings/:id` | `trainer--training-detail` |
| Trainer | A dog's training history, e.g. „Luna — Trainings“, and its detail | `/trainer/dogs/:dogId/trainings[/:id]` | `trainer--dog-training-history` |
| Trainer | „Eigenrechnungs-Lauf“ | `/trainer/trainer-billing-runs/:id` | `trainer--trainer-billing-run` |
| Training partner | „Neues Training“ / „Training gespeichert“ / „Training“ | `/training-partner/trainings/new`, `…/saved`, `…/:id` | `training-partner--training-capture`, `…--training-saved`, `…--training-detail` |
| Training partner | A dog's training history | `/training-partner/dogs/:dogId/trainings` | `training-partner--dog-training-history` |
| All | Sign-in, password pages, „no access“ | `/login`, `/reset-password`, `/set-password`, `/no-access` | `shared--login`, … `shared--no-access` |

Page titles on the trainer's billing pages differ from the menu labels: „Rechnung“ opens
„Offene Trainings für die Eigenrechnung“, „Abgeschlossene Rechnungen“ opens
„Abgeschlossene Eigenrechnungen“. In the Intranet, „Rechnungen“ opens
„Offene abrechenbare Trainings“ and „Trainer-Abrechnung“ opens
„Offene Trainings je Trainer:in“.

The start page („Startseite“, a single card „Willkommen, ‹Name›“ with „Angemeldet als
‹E-Mail›“) repeats the menu as large stacked buttons per role section, with
„Neues Training“ first as the primary button.

## Dual-role accounts

Holding several roles is normal. The menu does **not** merge entries: each role keeps
its own section, so the same label can appear twice, told apart only by the section
heading. The redesign must keep that grouping visible (and keep each section a named
group for screen readers).

- **Trainer:in + Trainingspartner:in** (Extranet; a trainer who also keeps a dog of her
  own): Startseite, then the Trainer:in section (4 entries), then the
  Trainingspartner:in section (2 entries). „Meine Trainings“ appears twice; the two lead
  to different lists (sessions she conducted versus trainings of the dog she keeps). The
  start page shows both sections. Screenshots:
  `screenshots/extranet/trainer-and-training-partner/`.
- **Trainingskoordinator:in + Kassenwart:in** (Intranet; one office person doing both):
  Übersicht, then 4 coordinator entries, then 6 treasurer entries. „Hunde“,
  „Trainings“ and „Tarife“ each appear twice; each pair is two different screens over the
  same records, with different columns and rights. Screenshots:
  `screenshots/intranet/coordinator-and-treasurer/`.
- The administrator role is usually held by the coordinator or a board member; it adds
  the „Administrator:in“ section with „Konten“ at the end.

The longest real drawer is therefore 11 entries in 3 sections (coordinator + treasurer),
or 12 in 4 with the administrator role.
