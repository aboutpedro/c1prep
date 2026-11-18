# C1 Prep design system

Calm and focused: a quiet study tool where the exam text and the task are the
only things competing for attention. One navy accent, plain surfaces, no
decoration. Shared by every level and the site-wide pages through `style.css`.
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
- **Header level buttons** (theme.js, every page): the six level logos (A1, A2,
  B1, B2, C1, C2) right after the brand; the current level has a border. With a
  mouse, hovering or keyboard focus slides the level's name out (A1 Beginner, A2
  Elementary, B1 Intermediate, B2 First, C1 Advanced, C2 Proficiency) and tilts the
  logo. Under 700px they move to their own row as 44px targets 12px apart, with no
  animation; under 380px the six buttons spread across the row (at least 4px apart).
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
- **Tabs** (writing; Exercises / Grammar guide on grammar pages at every level; Exercises / How to tackle it on every
  Use of English and Reading page at B2, C1 and C2, written by generator/tips.py):
  underline tabs that scroll sideways on phones. Arrow keys move between tabs.
- **Callout**: instructions in `--surface-2` with a navy left rule.
- **Sentence sets** (A1/A2/B1 grammar and vocabulary, `type: "sentences"`): one
  numbered sentence per row with an inline gap. Typed gaps use the normal inline
  input; choices are pill-shaped radio chips under the sentence, and the chosen
  word fills the gap. An optional word bank sits above in its own card.
  Contractions are accepted either way (don't = do not).
- **Short texts** (A2/B1 Reading Part 1, `type: "mc-texts"`): each notice or
  message in its own box beside its options (stacked on phones). Notices are
  centred with a dark border; messages have a grey left rule and a From/To line.

- **Grammar guide** (A1/A2/B1 grammar pages, second tab): a short intro, then one
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
- **Move my progress** (`progress.html` at every level, `move.js`): three cards.
  "Send your progress" says what this device holds and has the main button
  (Send to my other device, using the phone's share sheet, where there is one)
  and Copy link. "Paste a link" takes a pasted link or code. A card with a navy
  border at the top appears only when the page is opened from a link: what the
  link holds, and Add to this device. Results show under the button in green or
  red. The page loads neither log.js nor progress.js, so no name dialog opens
  before the progress (and the name) arrive. The link is `progress.html#code=` +
  `C1P1.` + base64url of the deflate-raw JSON of every `c1p:` key and the name
  (`C1P1j.` = not compressed). Adding merges and never deletes: the newer attempt
  per set, the larger counts per question, and the same link twice changes
  nothing. Nothing leaves the browser.

- **Site footer** (every page, written by generator/sitewide.py): after a 1px rule,
  the page's own note if it has one, then four links (All levels → the front
  page, Search, Level test, Privacy) and the Cambridge trademark disclaimer in 13px muted text.
- **Button links** (`a.btn`, `a.btn.secondary`): links that look like the primary
  and secondary buttons, for actions that go to another page.
- **Front page** (`index.html`, written by generator/sitepages.py): kicker, title
  and lead, then a card for the level test (text left, button right; stacked on
  phones), then "Choose your level": six level cards (logo 48px, level name, one
  line on what the level has, chevron), two per row from 640px. From this
  browser's data it adds a "Continue" row (`a.continue`) to the level used last,
  and after a level test the card says the result and that level's card gets a
  navy border and a "Your result" pill. It loads neither log.js nor progress.js.
- **Level test** (`placement.html`, `placement.js`): six parts of 8 questions, one
  per level, as sentence sets with option chips. Above each part: "Part 2 of 6"
  and a row of six small bars (done = navy, current = soft with a navy edge).
  Under it: "5 of 8 answered" and Next part (full width on phones); trying to go
  on with gaps turns the count red and scrolls to the first gap. 6 of 8 opens the
  next part; the test stops at the first part with fewer. The result card says
  "Start with B1 Intermediate", why, a button to that level and Take the test
  again, a list of parts with scores (✓ green for passed, "Not needed" in grey),
  then every answer marked with its explanation. The result is kept in this
  browser (`c1prep-placement`) and is never sent.
- **Search** (`search.html`, `search.js`, index `search-index.js` written by
  generator/search_index.js): the grammar and vocabulary pages at every level.
  A 46px search field with a magnifier inside, then two rows of filter pills
  (Level: All, A1…C2; Type: All, Grammar, Vocabulary; the chosen one in navy,
  the label on its own line on phones). Results come as you type and the address
  keeps the search (`?q=…&level=…&kind=…`). "Topics" are level cards with a 36px
  logo, "B1 · Grammar 3", the name and description; "In the exercises" has one
  card per topic with up to 3 sentences (Show all…), the answer underlined in
  grey, matches in `<mark>` (soft navy, semibold), and "Set 2 ›" linking to
  `page.html#set-2`; 15 topics at a time. With no search, a row of suggestion
  buttons. A search of several words looks for them as a phrase first; words of
  4 letters or more also match longer words (rule out → ruled out).
  The same field, with a Search button, sits under the intro on the front page
  and every level home (it opens search.html with that level chosen).
- **Privacy, 404**: plain prose pages with the same header and footer. 404.html
  uses addresses from the site root (`/style.css`), because GitHub Pages shows it
  at any address.

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
| `icon-192.png`, `icon-512.png` | Web app (manifest.webmanifest) | The C1 mark as in favicon.svg |
| `icon-maskable-512.png` | Android home screen | Full-bleed navy, the mark at 78% so it survives any mask |
| `og-image.png` | Share preview (Open Graph), 1200×630 | Page background, brand, "English practice, from A1 to C2", the six marks; generator/ogimage.py |

C1 lives at the root (its home page is `c1.html`; `index.html` is the site's front
page), A1 in `a1/`, A2 in `a2/`, B1 in `b1/`, B2 in `b2/`, C2 in `c2/`. Site-wide
pages (front page, level test, privacy, 404) carry `data-site` on `<html>`, so no
level button is marked as current. The A1
mark is the A2 mark's A with the B1 mark's 1 (same 0.34 gap as in B1). In the A2
mark the gap is wider at the baseline (about 1) because the A's diagonal leaves
the top open; B1 keeps the same 1.4 closest gap as B2. Icon links carry `?v=2`;
bump it whenever the icons change.
