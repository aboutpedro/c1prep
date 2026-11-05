# C1 Prep design system

Calm and focused: a quiet study tool where the exam text and the task are the
only things competing for attention. One navy accent, plain surfaces, no
decoration. Shared by C1 (root), B2 (`b2/`) and C2 (`c2/`) through `style.css`.
Pages use the variable names below, never raw values.

## Color

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#f6f6f3` | `#111316` | Page background |
| `--surface` | `#ffffff` | `#191c20` | Cards, inputs, header |
| `--surface-2` | `#efefeb` | `#22262c` | Callouts, hover fill, example answers |
| `--border` | `#e2e1dc` | `#2d3239` | Card and divider lines |
| `--border-strong` | `#8f8e87` | `#6b737e` | Input and button borders (3:1 against the surface) |
| `--text` | `#17191c` | `#ebecee` | Body text, headings |
| `--muted` | `#5a606a` | `#a3a9b3` | Secondary text, labels |
| `--primary` | `#1f4e79` | `#8fb8e3` | Buttons, links, selected state, focus |
| `--primary-hover` | `#173d60` | `#a9c9eb` | Button and link hover |
| `--primary-soft` | `#e7eef6` | `#1c2938` | Number badges, selected rows |
| `--on-primary` | `#ffffff` | `#0f1720` | Text on primary buttons |
| `--ok` / `--ok-soft` | `#17784b` / `#e5f3ec` | `#62cf95` / `#15291f` | Correct answers, word count in range |
| `--bad` / `--bad-soft` | `#b42318` / `#fcebe9` | `#f08b84` / `#371d1c` | Wrong answers, word count out of range |
| `--warn` / `--warn-soft` | `#8a5300` / `#fdf3e2` | `#f0c46b` / `#33280f` | "Saved offline" notice |

Navy `#1f4e79` and cream come from the favicon, so the brand stays the same.
Right and wrong are never shown by color alone: a ✓ or ✗ goes with them.
Text contrast is at least 4.5:1 in both themes.

## Typography

- **Inter** for the interface: headings, labels, buttons, questions.
- **Source Serif 4** only for exam texts (passages, paragraph banks, writing
  prompts' answer box), so reading feels like reading.

| Name | Size / line height | Weight | Use |
|---|---|---|---|
| Display | 32 / 1.15 (28 on phones) | 700, -0.02em | Page title (h1) |
| Title | 22 / 1.25 | 650 | Section heading (h2) |
| Heading | 18 / 1.35 | 600 | Card heading (h3), text title |
| Reading | 18 / 1.75 (17 on phones) | 400 serif | Exam passages |
| Body | 16 / 1.6 | 400 | Instructions, questions |
| Small | 14 / 1.5 | 400–500 | Descriptions, notes, explanations |
| Label | 12 / 1.3, +0.06em, uppercase | 600 | Kickers, part labels |

## Spacing

4px base: `--s1` 4, `--s2` 8, `--s3` 12, `--s4` 16, `--s5` 24, `--s6` 32,
`--s7` 48, `--s8` 64. Content width 760px for single-column pages; 1240px for
reading parts, which split into text (left) and questions (right) from 1100px.
Side gutter 16px on phones, 24px from 600px.

## Shape and depth

Radius: `--r-sm` 6px (inline gaps, small inputs), `--r-md` 10px (buttons,
options, inputs), `--r-lg` 14px (cards, dialogs), pills 999px (chips only).
Shadows: `--shadow-sm` for cards that can be clicked; `--shadow-lg` for the
sticky action bar, dialog and toast. Everything else is flat with a 1px border.

## Components

- **Header**: sticky, 60px, full-width surface with bottom border. Brand (level
  icon + name) on the left; name chip, back link and theme toggle on the right.
- **Buttons**: primary (navy fill), secondary (surface, strong border, navy
  text), quiet (text only). 44px tall, 10px radius. Hover darkens; focus shows a
  2px navy outline with 2px offset; disabled is 45% opacity.
- **Inputs**: 1px strong border, surface fill, 10px radius (6px inline). Focus:
  navy border + 3px soft ring. Checked: green or red border and fill plus a ✓/✗.
- **Set navigation**: previous button, a dropdown listing every set by number
  and title, next button. Works the same with 5 sets or 19.
- **Action bar**: sticks to the bottom of the screen on exercise pages, solid
  surface. Shows how many answers are filled in, then the score.
- **Part tiles**: list rows with label, name, description and a chevron; the
  whole row is the link.
- **Level buttons** ("Other levels" on each home page): one secondary-style
  button per other level, with that level's logo, the exam name and a chevron.
  Full width on phones.
- **Tabs** (writing): underline tabs that scroll sideways on phones.
- **Callout**: instructions in `--surface-2` with a navy left rule.

## Motion

Hover and focus transitions of 120–150ms; a 150ms fade when a set changes.
Confetti on a perfect score is the only celebration. Everything is switched off
under `prefers-reduced-motion`.

## Imagery and icons

No illustrations or photos. Icons are simple 1.75px-stroke line icons drawn
inline (chevrons, sun/moon, reset), in `currentColor`.

## Logo

One mark per level, same construction: the level in Inter Display Bold,
converted to outlines, on a navy (`#1f4e79`) tile. The letter is cream
(`#f7f5f0`), the number light blue (`#a9c9eb`). 64-unit grid, corner radius
14, letter cap height 30, letter and number almost touching (0.2–0.4 gap),
optically centred.

| File | Use | Notes |
|---|---|---|
| `favicon.svg` | Browser tab, site header (theme.js) | Rounded tile |
| `favicon.ico` | Browsers without SVG icons | 16 and 32 px drawn larger (cap 35, radius 12) so they stay legible; 48 px as the SVG |
| `apple-touch-icon.png` | Phone home screen | 180 px, square and full-bleed (the phone rounds it), cap 27 |

C1 lives at the root, B2 in `b2/`, C2 in `c2/`. Icon links carry `?v=2`;
bump it whenever the icons change.
