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
- **Header level buttons** (theme.js, every page): the five level logos (A2, B1,
  B2, C1, C2) right after the brand; the current level has a border. With a mouse,
  hovering or keyboard focus slides the level's name out (A2 Elementary, B1
  Intermediate, B2 First, C1 Advanced, C2 Proficiency) and tilts the logo. Under
  700px they move to their own row as 44px targets 12px apart, with no animation.
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
- **Tabs** (writing, and Exercises / Grammar guide on A2/B1 grammar pages):
  underline tabs that scroll sideways on phones. Arrow keys move between tabs.
- **Callout**: instructions in `--surface-2` with a navy left rule.
- **Sentence sets** (A2/B1 grammar and vocabulary, `type: "sentences"`): one
  numbered sentence per row with an inline gap. Typed gaps use the normal inline
  input; choices are pill-shaped radio chips under the sentence, and the chosen
  word fills the gap. An optional word bank sits above in its own card.
  Contractions are accepted either way (don't = do not).
- **Short texts** (A2/B1 Reading Part 1, `type: "mc-texts"`): each notice or
  message in its own box beside its options (stacked on phones). Notices are
  centred with a dark border; messages have a grey left rule and a From/To line.

- **Grammar guide** (A2/B1 grammar pages, second tab): a short intro, then one
  card per point. Example lists are serif with the target form in navy bold,
  under small caps labels "The basics" and "You might also see"; an optional
  grey note line explains an example. Form tables are plain rows with hairline
  dividers. "Careful" notes use the `--surface-2` box.
- **Diagrams** (grammar guides): inline SVG on a 360-wide canvas, max 440px on
  screen, coloured only through theme tokens (`--primary` for the main form,
  `--warn` for the contrasting one, `--border-strong` for time lines), so they
  work in light and dark. Timelines run left to right with a dashed NOW marker.

- **Saved progress** (home pages, `progress.js`): a tile whose part has finished
  sets gets a line under its description with a small meter, "5 of 18 sets
  done" and the share of right answers; it turns green with a ✓ when every set
  is done. A "Continue" row in `--primary-soft` under the name banner links to
  the set left unfinished (or the next set, or a paper in progress). In the set
  menu, finished sets show their last score, with a ✓ for full marks.
- **Skill rows** (My weak spots, `weak.js`): name, one line saying what the
  skill covers, then a meter with the percentage and "7 of 11 right"; on the
  right a small secondary button ("Practise") or, for reading skills, a link to
  the next set. Up to three focus areas sit in a card at the top with the main
  button. Practice sets use the sentence-set layout with a grey instruction
  line above each question; the explanation ends with the skill and a link to
  the set the question comes from.
- **Exam mode** (`exam.js`): underline tabs, one per part, each with a count
  under it (answered/questions, then marks after the end). The action bar shows
  the clock (red in the last five minutes), the answered count, Previous part
  (an icon on phones), Next part and Finish. Finishing asks first, in a dialog
  with the look of the name dialog. The student never sees marks: the page is
  replaced by a card saying the paper is handed in, with the time used and a
  link back to the exercises. Marks go to the teacher's sheet only.

## Motion

Hover and focus transitions of 120–150ms; a 150ms fade when a set changes.
Confetti on a perfect score is the only celebration. Everything is switched off
under `prefers-reduced-motion`.

## Imagery and icons

No illustrations or photos (the grammar diagrams above are the only drawings). Icons are simple 1.75px-stroke line icons drawn
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

C1 lives at the root, A2 in `a2/`, B1 in `b1/`, B2 in `b2/`, C2 in `c2/`. In the A2
mark the gap is wider at the baseline (about 1) because the A's diagonal leaves
the top open; B1 keeps the same 1.4 closest gap as B2. Icon links carry `?v=2`;
bump it whenever the icons change.
