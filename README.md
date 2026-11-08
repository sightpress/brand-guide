# SightPress brand guide

The SightPress brand: logo, favicons, icons, colours, typography, design
tokens, social images and a sound identity. SightPress is a powerful CMS for everyone, designed with blind and
low-vision creators and audiences in mind, and its brand is built the same way:
every colour pair is contrast-checked, every icon is paired with words, and the
fonts were chosen for legibility as well as character.

Open **`guide/index.html`** for the visual brand guide (see
[Viewing the guide](#viewing-the-guide)).

## What's here

```
brand-guide/
  logo/              Logo and mark, SVG (generated) + PNG previews
    wordmark.json    Outlined "SightPress" wordmark (source for the logo SVGs)
  favicons/          favicon.svg, favicon.ico, Apple touch icon, PWA icons, web manifest
  icons/
    src/*.svg        One file per icon (source; edit these)
    sprite.svg       Every icon as a <symbol> (generated)
  tokens/
    tokens.json      Colours, type, spacing, radii, shadows, motion (source; edit this)
    tokens.css       The same as CSS custom properties, light and dark (generated)
  fonts/             Self-hosted WOFF2 subsets, fonts.css, OFL licences, src/ originals
  social/
    social.json      Text, sizes, safe areas and alt text of every social image (source; edit this)
    outlines.json    That text outlined to paths (from scripts/outline-text.py)
    *.png            Share cards (headline and motto), GitHub previews, profile covers, avatar (generated)
  sound/
    sound.json       Voices, notes and rules for every sound (source; edit this)
    *.wav            Sound logo and interface sounds (generated)
  guide/             The brand guide page (index.html, guide.css)
  scripts/
    build.mjs        Checks the rules and regenerates everything marked "generated"
    sound.mjs        Synthesises the sounds (used by build.mjs)
    outline-text.py  Outlines the social-image text from the fonts
    build-fonts.py   Rebuilds the WOFF2 subsets from fonts/src
    outline-wordmark.py  Re-outlines the wordmark from the font
```

## The brand in brief

**The motto** is **"Beyond sight."**, in sentence case with its full stop. It
says what SightPress is for: publishing that reaches people however they take
it in, by eye, by ear or by touch. The full stop stands for the amber dot: on
dark backgrounds it may be drawn in lumen; on light ones it takes the text
colour. Set the motto in the display face under or after the wordmark, never
inside the logo files, and keep it in English in every locale, like the name
(add a translation as a separate line with its own `lang` when meaning needs
it). It leads the motto share cards (`sightpress-share-card-motto.png` and
`sightpress-github-preview-motto.png`).

**The mark** is one continuous "S" stroke on a rounded iris tile, with an amber
dot resting in its upper curve like a pupil: the point where content is
perceived, by eye, by ear through a screen reader, or by touch on a braille
display. The wordmark is set in Atkinson Hyperlegible Next, "Sight" in ink and
"Press" in iris.

**Colour**

| Name | Role | Key value |
|---|---|---|
| Iris | Brand, links, primary buttons | `#3D2FC4` (iris 700), 8.38 to 1 on paper |
| Lumen | Accent: the dot, highlights, the focus halo. Never text on light backgrounds | `#FFB938` (lumen 400) |
| Lagoon | Supporting colour: illustration, charts, visited links | `#0B6B63` (lagoon 700) |
| Ink | Text and dark backgrounds | `#101430` (ink 950) |
| Paper | Light background | `#FBFAF7` (ink 50) |

Each family has a full ramp (50 to 950). Body text, links, help text and
status messages reach **AAA (at least 7 to 1)** in both light and dark mode;
form borders and the focus ring reach at least 3 to 1. The guide lists every
checked pair with its ratio.

**Type**

| Use | Family | Notes |
|---|---|---|
| Display and headings (28 px and up) | Fraunces | Weight 640, "soft" cut (SOFT 50, WONK 0) |
| Body and interface | Atkinson Hyperlegible Next | Designed with the Braille Institute for low-vision readers |
| Code and identifiers | Atkinson Hyperlegible Mono | |

The brand fonts cover Latin scripts. For Arabic and Hebrew pages
(including the `ar-SA` and `he-IL` RTL test locales), each role has a self-hosted companion that sits right
after the brand font in the stack:

| Use | Arabic | Hebrew |
|---|---|---|
| Display and headings | Noto Naskh Arabic | Frank Ruhl Libre |
| Body, interface and code | Noto Sans Arabic | Noto Sans Hebrew |

Each companion's `unicode-range` holds only its own script, so Latin pages never
download it, and an Arabic or Hebrew page loads at most two files for that
script (about 170 KB for Arabic, 25 KB for Hebrew). Their weight axes are cut
to 400 to 700, the weights the tokens use. Neither script has italics, so the
upright file is also declared as the italic face and browsers never draw a
fake slant.

All seven are under the SIL Open Font License 1.1 and are self-hosted: no
third-party font requests. The body size is 18 px on a major-third scale, set in
`rem` so readers' browser settings always win. Every stack ends with Noto and
system fallbacks for CJK and Devanagari (and for Arabic and Hebrew, if the
self-hosted files fail to load).

In Arabic and Hebrew text:

- mark every passage with `lang` and `dir`, so the right font, direction and
  screen-reader voice are used;
- set `letter-spacing: normal` on Arabic, since tracking breaks the joins
  between letters, and give Arabic headings `--sp-line-height-snug` rather than
  `tight`, so the dots and marks don't collide;
- use bold or quotation marks for emphasis, never italics.

**Icons**: 54 icons on a 24 px grid with a 2 px round stroke in `currentColor`.
They cover content (page, article, media, captions, transcripts), workflow
(edit, review, schedule, publish, archive), accessibility (alt text, screen
reader, keyboard, braille), status (success, warning, error, info) and the
admin (sites, users, modules, settings, move up and down).

**Social images**: share cards for link previews (1200 by 630), one with the
headline and one with the motto "Beyond sight.", GitHub social previews (also
in both versions), profile covers for X, Mastodon and Bluesky, LinkedIn, Facebook
and YouTube, and a profile picture. The dark logo and the headline "Publish for
every reader." sit on a deep ink-to-violet background, with the S of the mark
drawn large at the inline end. The headline's full stop is amber, a small echo
of the dot.

**Sound**: a sound logo (3.6 seconds, ending in a one-second fade-out) and
five interface sounds (success, error, warning,
notification, published), all built from `sound/sound.json` in D major
pentatonic. Mallet notes trace the S and a warm bell stands for the amber dot.

## Official addresses

The only official SightPress addresses are:

- Website: <https://sightpress.org>
- Email: <team@sightpress.org>

## Using the brand

### In HTML

```html
<!-- Fonts and tokens first, then your own styles -->
<link rel="preload" href="/brand/fonts/atkinson-hyperlegible-next-latin.woff2" as="font" type="font/woff2" crossorigin>
<!-- On ar-SA pages, also preload the Arabic text font; on he-IL, noto-sans-hebrew-hebrew.woff2 -->
<link rel="preload" href="/brand/fonts/noto-sans-arabic-arabic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/brand/fonts/fonts.css">
<link rel="stylesheet" href="/brand/tokens/tokens.css">

<!-- Favicons -->
<link rel="icon" href="/brand/favicons/favicon.ico" sizes="48x48">
<link rel="icon" href="/brand/favicons/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/brand/favicons/apple-touch-icon.png">
<link rel="manifest" href="/brand/favicons/site.webmanifest">
<meta name="theme-color" content="#3D2FC4">
```

### Logo

Use the files; never retype the wordmark. Every logo SVG has `role="img"`,
`aria-label="SightPress"` and a `<title>`. When the logo is a link, name the
link after its destination:

```html
<a href="/">
  <picture>
    <source srcset="/brand/logo/sightpress-logo-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="/brand/logo/sightpress-logo.svg" width="200" height="42" alt="SightPress home">
  </picture>
</a>
```

| File | Use it on |
|---|---|
| `sightpress-logo.svg` | Paper, white and light backgrounds |
| `sightpress-logo-dark.svg` | Ink and dark-mode backgrounds |
| `sightpress-logo-stacked.svg`, `-stacked-dark.svg` | Square spaces |
| `sightpress-logo-mono.svg`, `sightpress-mark-mono.svg` | One colour: print, embossing, forced colours. Inline them and they take `currentColor` |
| `sightpress-mark.svg` | App icons, avatars, anywhere under 120 px wide |

Clear space is a quarter of the mark's height on every side. The smallest
horizontal logo is 120 CSS px (30 mm in print); below that, use the mark alone,
which works down to 16 px.

### Tokens

Use the **semantic** tokens, not palette values. They switch for dark mode,
"increase contrast" and forced colours on their own:

```css
.card {
  background: var(--sp-color-surface);
  color: var(--sp-color-text);
  border: 1px solid var(--sp-color-border);
  border-radius: var(--sp-radius-lg);
  padding: var(--sp-space-5);
  padding-inline: var(--sp-space-6);   /* logical properties only, never left/right */
}
.card :focus-visible {
  outline: var(--sp-focus-width) solid var(--sp-color-focus);
  outline-offset: var(--sp-focus-offset);
  box-shadow: 0 0 0 var(--sp-focus-offset) var(--sp-color-focus-halo);
}
```

| Group | Tokens |
|---|---|
| Colour | `--sp-color-{bg, surface, surface-sunken, text, text-muted, border, border-strong, accent, accent-hover, accent-subtle, on-accent, link, link-visited, highlight, on-highlight, focus, focus-halo}` and `--sp-color-{success, warning, danger, info}` with `-subtle` backgrounds |
| Palette | `--sp-{iris, lumen, lagoon, ink, green, red}-{step}` |
| Type | `--sp-font-{display, text, mono}`, `--sp-font-size-{n1, 0…6}`, `--sp-font-weight-*`, `--sp-line-height-{tight, snug, body}`, `--sp-measure` |
| Layout | `--sp-space-{1…9}`, `--sp-radius-{sm, md, lg, xl, pill}`, `--sp-shadow-{1…3}`, `--sp-target-min` (44 px) |
| Motion | `--sp-motion-{fast, base, ease}`; both durations become 0 under `prefers-reduced-motion` |

The page follows the system colour scheme. To force one, set
`data-color-scheme="light"` or `"dark"` on `<html>`.

### Icons

Reference the sprite and keep a visible label next to the icon:

```html
<button type="submit" class="button">
  <svg class="icon" aria-hidden="true" focusable="false"><use href="/brand/icons/sprite.svg#sp-icon-publish"/></svg>
  Publish "About us"
</button>
```

- Icons are decoration next to words, so they are always `aria-hidden="true"`.
  Status is never shown by icon or colour alone: write "Error:", "Passed" and
  so on in the text.
- If an icon-only control can't be avoided, give it a full accessible name
  ("Move 'Opening hours' up in Main menu") and a tooltip that shows on focus as
  well as hover.
- `chevron-back`, `chevron-forward`, `sign-out`, `external-link`, `publish` and
  `transcript` point along the reading direction. Add the `icon-mirror` class
  with `[dir="rtl"] .icon-mirror { transform: scaleX(-1); }`.
- Inside SightPress itself, icons and other assets are served through
  AssetMapper from `core`, so they follow the strict CSP.

### Social images

Each image in `social/` has alt text in `social/social.json` that repeats every
word drawn in it. Always publish that alt text with the image:

```html
<meta property="og:image" content="https://sightpress.org/brand/social/sightpress-share-card-motto.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="SightPress logo. Beyond sight. A powerful CMS for everyone, designed with blind and low-vision creators and audiences in mind.">
<meta name="twitter:card" content="summary_large_image">
```

When you upload a cover or a picture to a network, paste its alt text into the
network's description field. Put dates, links and calls to action in the post
text, never only in an image. These images are for SightPress itself; sites
made with SightPress use their own branding.

### Sound

| File | Use | Length, peak |
|---|---|---|
| `sightpress-sound-logo.wav` | Opening or closing videos, podcasts and talks. Caption it `[SightPress sound logo]` | 3.6 s with a 1 s fade-out, −3 dBFS |
| `ui-success.wav` | Saved, published, sent. Two notes going up | 0.55 s, −12 dBFS |
| `ui-error.wav` | Something couldn't be done. Two soft notes going down | 0.6 s, −12 dBFS |
| `ui-warning.wav` | Worth checking, not blocking. One note tapped twice | 0.55 s, −12 dBFS |
| `ui-notification.wav` | Something new arrived. A single bell | 0.9 s, −14 dBFS |
| `ui-publish.wav` | A page or article went live. A short form of the sound logo | 0.95 s, −12 dBFS |

- Sound adds to words; it never replaces them. Every interface sound plays
  with a visible message and the same message in a live region.
- Interface sounds are a personal admin setting, **off by default**. Public
  pages never play sound, and nothing plays by itself.
- Interface sounds stay short (1 second at most) and quiet (−12 dBFS or lower),
  so they never cover a screen reader's voice. They are told apart by shape
  (rising, falling, repeated, single bell), not just by pitch, and every note
  is between 140 and 1,200 Hz.
- The files are 48 kHz, 16-bit mono WAV masters. Where size matters, `core`
  can ship Opus or MP3 copies made from them.

## Viewing the guide

The guide loads the sprite from a separate file, which browsers block on
`file://` URLs, so serve the folder over HTTP:

```bash
cd brand-guide
python3 -m http.server 8000      # or: npx serve .
# open http://localhost:8000/guide/
```

## Changing the brand

Edit the **sources** only: `tokens/tokens.json`, `icons/src/*.svg`,
`social/social.json`, `sound/sound.json` and, rarely, `logo/wordmark.json` or
the fonts. Then rebuild and commit the generated files.

```bash
npm install          # once: installs the SVG renderer used for PNG and ICO output
npm run build        # checks every rule, then regenerates the derived files
npm run check        # checks only; exits 1 if a rule fails or a generated file is stale (for CI)
```

The build reports in words ("Step 2 of 4", "Passed", "Failed") and **fails** if:

- any colour pair in `tokens.json` → `contrast` is below its minimum, in light
  or dark mode, including the logo colours;
- an icon doesn't use the 24 × 24 grid, a 2 px stroke and `currentColor`, lacks
  `aria-hidden="true"`, contains scripts, styles, images or text, or has
  "left" or "right" in its name;
- a social image's text doesn't fit its safe area, runs into the decoration,
  or is missing from its alt text, or the outlined text is out of date;
- a sound is longer or louder than its kind allows, uses a note outside 140 to
  1,200 Hz, or has no name, use or description (and, for the sound logo,
  no caption).

Never lower a minimum or remove a pair to get the build passing; pick a
different colour instead.

### Adding an icon

1. Copy an existing file in `icons/src/` and name it in kebab-case after what
   it means (`move-up`), not what it shows (`arrow-up`).
2. Draw on the 24 px grid with a 2 px stroke, keeping 2 px of padding. Use only
   `fill="none"` or `fill="currentColor"`.
3. If it points along the reading direction, add it to `MIRRORED` in
   `scripts/build.mjs`.
4. Run `npm run build` and check it in the guide at 24 px and at 200% zoom.

### Changing the social-image text

The text in the images is outlined to paths, so the PNGs never depend on
installed fonts. After changing a string or a font in `social/social.json`:

```bash
.venv/bin/pip install fonttools uharfbuzz            # once, in the venv below
.venv/bin/python scripts/outline-text.py > social/outlines.json
npm run build
```

### Fonts and the wordmark

These need Python with fontTools:

```bash
python3 -m venv .venv
.venv/bin/pip install fonttools brotli
.venv/bin/python scripts/build-fonts.py              # rebuild fonts/*.woff2 and fonts.css
.venv/bin/python scripts/outline-wordmark.py "fonts/src/AtkinsonHyperlegibleNext[wght].ttf" > logo/wordmark.json
npm run build                                        # regenerate the logo SVGs from the new outlines
```

## Where it goes next

This folder is the brand's single source. The pieces that ship land in their
own repositories:

- **`core`**: the admin's tokens, fonts, icon sprite and favicons through
  AssetMapper; `themes/default` can offer the brand palette as a preset.
  Product UI text still goes through translations, never hard-coded strings.
- **Sites made with SightPress** use their own logo and favicons (`SiteBranding`).
  The SightPress logo appears only in the admin and on the project's own
  website.
- **Modules** use the same token custom properties, never their own colours.
- **Interface sounds** would ship from `core` behind a per-user "Play sounds"
  setting that is off by default. That setting, and how it shows in the admin,
  still needs to be specified in `PLAN.md`. The social images belong to the
  project's own website and accounts.

## Licences

- Fonts: SIL Open Font License 1.1. See `fonts/OFL-*.txt`. Atkinson Hyperlegible
  is by the Braille Institute of America; Fraunces is by Undercase Type; Noto
  Sans Arabic, Noto Naskh Arabic and Noto Sans Hebrew are by the Noto Project
  Authors; Frank Ruhl Libre is by the Frank Ruhl Libre Project Authors.
- Everything else in this folder: GPL-2.0-or-later, like the rest of SightPress.
  The SightPress name and logo identify the project; a trademark policy for
  their use by others hasn't been decided yet.
