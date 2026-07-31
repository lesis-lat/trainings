<p align="center">
  <p align="center"><b>trainings.lesis.lat</b></p>
  <p align="center">LESIS Trainings - applied security education</p>
</p>

---

### About

This repository contains the source code of **LESIS Trainings** (trainings.lesis.lat), the
education arm of [LESIS](https://lesis.lat).

It is a Jekyll site that inherits the LESIS identity primitives — IBM Plex Sans / IBM Plex Mono,
pure black on white, 1px hairlines, monospace metadata — but uses its own layout system, designed
around the education flow rather than the main site's 50/50 split. See **Identity** below before
changing any styling.

### Running Locally

```bash
# Install dependencies (requires Ruby >= 2.7 and Bundler)
bundle install

# Run the development server
bundle exec jekyll serve

# Access at http://localhost:4000
```

### Project Structure

```
├── _data/i18n/      # Translation strings, one file per locale (en.yml, pt.yml)
├── _includes/       # header, footer, catalog, course-card, next-cohort,
│                    # schedule-table, urls + i18n bootstrap
├── _layouts/        # default (shell), course (syllabus + sticky rail)
├── _courses/        # Course pages, one file per course per locale
├── assets/          # CSS, JavaScript, fonts and images
├── pt/              # Portuguese entry points
├── index.html       # Home / catalog (English)
├── courses.html     # Course index (English)
├── schedule.html    # Chronological session table (English)
└── README.md        # This file
```

### Internationalization

i18n is plugin-free so the site keeps building on GitHub Pages.

- English lives at `/`, Portuguese at `/pt/`.
- Every page declares `lang: en` or `lang: pt` in its front matter.
- `_includes/i18n.html` resolves `lang` and exposes `t`, the matching
  `_data/i18n/<lang>.yml` tree. **Include it at the top of every page and layout that renders
  translated strings** — Jekyll renders page content before the layout wraps it, so an `assign`
  in a layout is not visible to the page it wraps.
- Pages point at their counterpart with `alt_url`, `alt_lang` and `alt_lang_key`. That drives
  both the `EN`/`PT` switcher in the navigation and the `hreflang` tags.

To add a locale: drop a new `_data/i18n/<code>.yml`, add the entry points under `/<code>/`, and
cross-link them with `alt_url`.

### Adding a course

Each course is one file per locale in `_courses/`, both sharing the same `ref`. The
`course` layout renders everything from front matter, so translating a course means
translating values, never markup:

- `status` — `open`, `closed` or `soon` (drives the badge and its label)
- `meta` — rows of `{ key, value }`; `key` resolves against `meta:` in the locale file
- `sessions` — sessions, each with `modules` (`title`, `duration`, `topics`); modules are
  numbered continuously across sessions
- `audience`, `methodology`, `materials`, `prerequisites`, `requirements` — plain lists
- `instructor`, `pricing`, `location_note`, `registration_*`

The body of the file holds only prose sections (objective, overview).

**Always state the language a training is delivered in.** The `course` layout prints
`course.language_notice_html` on every course page, and the `LANGUAGE` meta row should be filled
in on both locales.

### Identity

This site shares the LESIS **identity primitives** but not the main site's layout. The primitives
are inherited and must not drift:

- **Type** — IBM Plex Sans (300 body, 400 headings); IBM Plex Mono for every piece of metadata:
  labels, dates, durations, status flags, buttons, table columns. **IBM Plex is self-hosted** from
  `assets/fonts` (woff2, ttf fallback) — there is no Google Fonts request, so type never falls
  back to a system face if a CDN is blocked. Only weights 300 and 400 are declared; add an
  `@font-face` before using a new weight.
- **Alignment** — running text is justified with `hyphens: auto`. Headings and all chrome (nav,
  labels, mono metadata, tables, buttons) stay left-aligned: justifying a display heading stretches
  its first line edge to edge. Drop the `hyphens` declaration on `body` if you prefer gaps to
  hyphens.
- **Color** — `#000` on `#fff`. `#555` secondary text, `#8a8a8a` muted metadata, `#dcdcdc`
  hairlines, `#f4f4f2` inset blocks. **No accent color** — status is carried by a black fill,
  never by hue.
- **Rules** — 1px. No border radius, no shadows, no gradients.
- **Buttons** — black block, white monospace label, trailing `→`.

Everything else is specific to trainings and built around the education flow:

- **Catalog shell** — sticky full-width top bar (symbol + `LESIS TRAININGS`, nav, language
  switcher) over a 1180px content canvas. No archival photography: the main site's photo panel is
  deliberately absent here, and the type system carries the whole design.
- **Section labels** — mono caps followed by a hairline that fills the row (`.label`).
- **Course page** — content column plus a **sticky enrollment rail** carrying the meta table and
  the apply button, so the decision stays one click away through a long syllabus. The rail
  unsticks and becomes a horizontal band under 1000px.
- **Syllabus** — modules numbered continuously across sessions, duration right-aligned in mono.
- **Base font size is 15px**, not the main site's 13px. Deliberate: this site is read, not
  skimmed, and syllabus pages are long.

### Voice

The site's positioning is **practical training for people already working in the field, on niche
and specialised subjects: short programs held to a high technical bar, delivered by practitioners**.
The copy states what the training *is* — it never attacks certifications, other providers, or any
other format. Keep it that way when adding copy.

Recurring themes, all carried in `_data/i18n/*.yml` under `home`:

- learning is active — investigating, testing, failing, exploring, building
- courses are a deliberate choice, not an hour count to fill
- instructors have authority in their fields, from academia and industry

Course pages carry this voice only in shared chrome (enrollment steps, section labels). The factual body of a course — objective, syllabus, prerequisites, instructor bio — is
authored by whoever teaches it and is not rewritten into marketing voice.

Brand assets and usage rules: <https://lesis.lat/press.html>

### License

This work is licensed under [MIT License.](/LICENSE.md)
