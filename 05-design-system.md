# Current design system

What is implemented today, and what the redesign must map to. Everything lives in
`frontend/shared/` (shared by both apps) unless noted.

## Stack

- React + Tailwind CSS v4 (CSS-first config, `@theme inline`) + shadcn/ui on Radix
  primitives. shadcn style **„radix-nova“**, base colour **neutral**, CSS variables on
  (`frontend/shared/components.json`).
- Icons: **lucide-react**, 16 px (`size-4`) by default, 12–14 px inside badges and markers.
- Font: **Geist Variable** (via `@fontsource-variable/geist`), one family for body and
  headings (`--font-heading` = `--font-sans`). No monospace or numeric font set; amounts
  use the body font.
- Animation: `tw-animate-css` (Radix open/close fades and zooms only).

## Tokens (`frontend/shared/src/styles/tokens.css`)

The palette is **pure greyscale** (chroma 0) plus two semantic colours. Light mode values:

| Token | Value | Role |
|---|---|---|
| `--background` / `--card` / `--popover` | `oklch(1 0 0)` | White surfaces |
| `--foreground` (and `*-foreground` of the above) | `oklch(0.145 0 0)` | Near-black text |
| `--primary` | `oklch(0.205 0 0)` | Primary buttons: near-black |
| `--primary-foreground` | `oklch(0.985 0 0)` | |
| `--secondary` / `--muted` / `--accent` | `oklch(0.97 0 0)` | Light grey fills, hover, active nav entry |
| `--muted-foreground` | `oklch(0.556 0 0)` | Secondary text, section headings, em dashes |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Red: errors, destructive buttons, required-field asterisk |
| `--warning` | `oklch(0.52 0.13 70)` | Amber, project-added. Used only for a few alert texts (e.g. concurrent-edit notice) |
| `--border` / `--input` | `oklch(0.922 0 0)` | Hairlines and input borders |
| `--ring` | `oklch(0.708 0 0)` | Focus ring (used at 50 % opacity) |
| `--chart-1…5` | greys | Unused today |
| `--sidebar-*` | greys | Unused today (no sidebar component; navigation is a sheet) |

Radius: `--radius: 0.625rem` (10 px); derived `--radius-sm` 6 px, `-md` 8 px, `-lg` 10 px,
`-xl` 14 px, `-2xl` 18 px, `-3xl` 22 px, `-4xl` 26 px. Buttons use `rounded-lg`, cards
`rounded-xl`, badges `rounded-4xl` (pill), inputs `rounded-md`.

**Colours outside the tokens.** The status markers use the raw Tailwind palette, not
tokens: amber (`border-amber-500 bg-amber-50 text-amber-800`), orange
(`border-orange-500 bg-orange-50 text-orange-800`), green (`border-green-600 bg-green-50
text-green-800`, `text-green-700`). The redesign should turn these into tokens (for
example `--success`, `--warning-subtle`, `--attention`).

**Per-app theme files** exist but are empty: `frontend/intranet/src/styles/theme.css`
and `frontend/extranet/src/styles/theme.css` (`:root {}` overrides, intended for
„desktop-dense“ and „mobile-touch“). This is where a per-app density, radius or accent
would go.

**Global base rules.** Every element gets `border-border` and `outline-ring/50`. A red
„*“ is appended by CSS to the label of every required field (opt-out per form with
`data-required-marker="off"`, used on the sign-in forms).

## Dark mode

**Not in use.** `tokens.css` ships the full shadcn dark palette under a `.dark` class,
and the primitives carry `dark:` variants, but nothing ever sets the class: there is no
toggle and no `prefers-color-scheme` hook. A dark theme is therefore optional; if
proposed, it only needs token values for `.dark`.

## Layout primitives

- **Page column** (`PageContainer`): `<main>` centred, `max-w-6xl` (1152 px), `px-8`,
  `mt-8`. The header bar's content uses the same column, so it lines up. Forms and small
  pages narrow themselves inside it (`max-w-md`, `max-w-2xl`; the Extranet start page and
  sign-in cards are `max-w-sm`). There is no wider layout for the wide Intranet tables,
  which therefore overflow horizontally at 1440 px.
- **Application header** (`AppHeader`): sticky, white, bottom border, one row: menu
  button („Navigation öffnen“, ghost icon button) → optional back arrow („Zurück“) →
  page title as the page's only `<h1>` (16 px, semibold) → right slot with the user menu
  (display name + chevron; dropdown with the email and „Abmelden“). Pages do not render
  their own top-level heading.
- **Navigation drawer**: a left `Sheet`, 288 px wide, title „Navigation“, close button
  „Navigation schließen“. Sections with an uppercase 12 px muted heading; entries are
  icon + label, 14 px medium, active entry on `muted` fill. Closes on selection. Used at
  every width in both apps; no persistent sidebar.
- **Responsive**: few breakpoints are used. The Extranet lists switch from a table to a
  stacked card list below `md` (768 px). The Intranet has no mobile layout beyond the
  table scrolling horizontally.

## shadcn/ui primitives (`frontend/shared/src/components/ui/`)

CLI-managed; never hand-edited. Restyle through tokens, or through new variants added by
composition outside `ui/`.

| Primitive | Used for |
|---|---|
| `button` | All actions. Variants: `default` (near-black), `outline` (white with border; most secondary actions), `secondary`, `ghost` (icon buttons, header), `destructive` (red text on a 10 % red tint, not a solid red), `link`. Sizes: `xs` 24 px, `sm` 28 px, `default` 32 px, `lg` 36 px, `icon-xs/sm/icon/lg` 24–36 px. |
| `badge` | Status pills: `secondary` (grey fill: „Aktiv“, „zur Abrechnung freigegeben“, run status, „Als fertig dokumentiert markiert“), `outline` (content tags, „Wartet auf Erstpasswort“, run chips), `destructive` („Gesperrt“). 20 px high. |
| `alert` | Messages above content: `default` (card style) and `destructive` (red text). Load failures, refusals, warnings („Die Tarife sind noch nicht gepflegt …“). The amber variant is a class override using `text-warning`. |
| `card` | Every detail page is a stack of cards (e.g. a training's facts, its „Abrechnung“ card, a person's linked account card); also the start page and sign-in. `rounded-xl`, 1 px ring instead of a border, 16 px vertical padding. |
| `table` | Base of `DataTable`. 14 px text, row hover, horizontal scroll container. |
| `checkbox` | Row and group selection in tables; boolean fields. |
| `input`, `textarea`, `label`, `field` | Form controls. `field` provides label, description and error layout; 36 px controls. |
| `radio-group` | Single choice with visible options, e.g. the travel-cost choice in the correction form. |
| `toggle-group` (`toggle`) | Segmented choice (trainer creation form). |
| `combobox`, `command`, `popover`, `input-group` | Typeahead pickers (person, team, trainer, account pickers; „Keine Treffer.“) and the faceted filter's option list. |
| `dropdown-menu` | User menu and the „Spalten“ column menu. |
| `dialog` | Confirmations (delete a training, discard a run, take out the last training, close a run) and small forms (assign or end a keeper, link an account). |
| `sheet` | The navigation drawer only. |
| `tooltip` | Explanations: inverted (near-black, white 12 px text), max 320 px wide. |
| `separator` | Dividers inside the filter button. |
| `select` | Installed but **unused**: selects are native `<select>` elements (see below). |

## Project compositions (`frontend/shared/src/components/`)

Editable, data-neutral building blocks.

- **`DataTable`** (TanStack Table): the table on every list page. Opt-in features:
  - sorting per column (header button with up, down or both-ways arrow);
  - a text filter on one column; external filter bars are page-specific;
  - **grouping**: rows partitioned under group header rows the page fills (label,
    description such as „n Trainings“, per-column sums, an action button); groups
    collapse and expand (`DataTableGroupsToggle`: „Alle zuklappen“ / „Alle aufklappen“);
  - **selection**: leading checkbox column, plus a tri-state checkbox per group; rows can
    be disabled with a reason in a tooltip; selection can be limited to one group;
  - **summary row** (footer) for totals;
  - an **empty state** slot (message plus button) replacing the table;
  - a toolbar slot.
  Container: 1 px border, `rounded-md`. Cells do not wrap by default, which widens
  columns rather than breaking rows.
- **`DataTableFacetedFilter`**: outline `sm` button with a dashed border opening a
  popover with a searchable checklist; chosen values show as small grey badges on the
  button.
- **`DataTableViewOptions`**: „Spalten“ button with a checklist of hideable columns.
- **`AppHeader`**, **`PageContainer`**: see Layout.
- **`TooltipButton`**: a small round, bordered button whose only job is to show a
  tooltip; it opens on tap on touch screens. The base of every marker below.

## Recurring app patterns

- **Abrechnungsstatus badge**: grey `secondary` badge with the full state text
  („noch nicht freigegeben“, „zur Abrechnung freigegeben“, …).
- **„freigegeben“ cell state**: on the training lists' billing column, a green check icon
  plus the word „freigegeben“ (12 px, `text-green-700`), the full wording on hover. The
  only green in that table. Beside the „Freigeben“ button, small round amber icon-only
  hint badges warn about a missing input (e.g. undeclared travel); they never block.
- **Amber „nicht berechenbar“ marker**: in amount columns, an amber pill with a triangle
  warning icon and the words „nicht berechenbar“ (or an icon-only round version where
  space is tight), standing in place of a missing amount; tooltip gives the reason. A
  sibling marker „uneinheitlich“ (group siblings disagree) looks the same.
- **Amber count badge** next to a sum: a small round amber badge with the number of
  amounts missing from that sum (tooltip „n nicht berechenbar“).
- **Neutral „Hinweis“ marker**: a 20 px round grey info icon after an amount or in a
  column header, explaining a rule (provisional amounts, flat rate as floor, group
  journey divided by teams).
- **Documentation badge**: a 24 px round icon badge before the „Trainingsart“: green with
  a document icon („Dokumentation fertig“) or orange with a pen-on-document icon
  („Dokumentation offen — Sach-Felder können sich noch ändern“).
- **Native selects**: forms and filter bars use native `<select>`, styled by one class
  string kept per app in `src/lib/selectStyles.ts` (`NATIVE_SELECT_CLASS_NAME`) to match
  the shadcn input: 36 px, `rounded-md`, `border-input`, transparent fill, `shadow-xs`.
- **Filter bars**: a row of labelled fields (typeahead picker, „Von“/„Bis“ dates,
  „Quartal“ select, faceted filters) with „Filter zurücksetzen“ appearing only while a
  filter is set.
- **Detail pages**: a vertical stack of cards, each with a title and a definition-list
  of label/value pairs; edit mode turns a card into a form with a save button (e.g.
  „Änderungen speichern“) and „Abbrechen“; refusals and conflicts appear as alerts at the top of the card.
- **Destructive actions**: a `destructive` button opens a confirmation `dialog` whose
  confirm button is again `destructive` (e.g. „Lauf verwerfen“). Locked or disabled
  actions stay visible, disabled, with the reason in a tooltip.
- **Read-only values**: em dash „—“ in muted grey for empty fields.
- **Loading**: plain text „Lade ...“; no skeletons or spinners.
- **Chips strip**: outline badges as links (runs „In Vorbereitung:“ on the billing page).

## Constraints for the redesign

- **Map everything to shadcn/ui + Tailwind v4 tokens.** The design must be expressible as
  values of the CSS variables above (plus any new semantic tokens you define, with
  values), Tailwind utility classes, and the existing primitives. No other component
  library.
- **Primitives in `components/ui/` are CLI-managed.** They are restyled through theme
  tokens and through variants or wrappers composed in `components/`, not rewritten. If a
  primitive needs a new look (e.g. a „success“ badge, a „warning“ alert), specify it as a
  new variant with its classes or token values.
- **Two apps, one kit.** Shared components stay neutral; per-app differences (density,
  accent, radius, type scale) go into each app's `theme.css` as token overrides.
- **Dark mode does not exist today.** Optional; if proposed, deliver `.dark` token values.
- **Accessibility**: WCAG 2.2 AA contrast for every token pair, a visible focus ring,
  targets of at least 24 px (44 px recommended in the Extranet), state never shown by
  colour alone (every marker has an icon or text and a tooltip).
- **Deliver, to be implementable:**
  1. Token values (oklch preferred) for every colour token, including new semantic ones
     (success, warning, info, attention) and their foregrounds; radius; font family and a
     type scale (sizes, weights, line heights); spacing and density rules.
  2. Component variants: buttons (each variant × size, states: hover, focus, disabled),
     badges and markers (status, documentation, „nicht berechenbar“, „Hinweis“, count),
     alerts, cards, inputs and native selects, table (header, row, group header, summary
     row, selected and disabled rows), dialogs, tooltip, navigation drawer or sidebar.
  3. Layout specs per breakpoint (at least 390 px, 768 px, 1440 px; for the Intranet also
     wider): app shell, page column width, filter bar, wide tables (which columns stick,
     how overflow is handled), detail pages.
  4. Per screen, the arrangement of the fixed inventory listed in `04-screens/`.
