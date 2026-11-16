# Worklog — building the ShelfKit documentation site

Date: 2026-11-17 (session date). Site root: this directory (`shelfkit-docs/`).
Result: a VitePress static site (69 pages, ~11 MB `dist/`) combining the reverse-engineering
journey of the SES-Imagotag Vusion 2.6" BWR (UU340, Axsem AX8052) with the ShelfKit project
that came out of it. **No edits or pushes were made to any BeatSkip repository** — all repos
were shallow-cloned read-only into a temp dir.

## 1. Sources

### Repo discovery
- Queried the GitHub API: `GET /users/BeatSkip/repos?per_page=100` → 45 public repos, no orgs,
  no gists. Filtered to the 11 repos related to ESL/Imagotag/Axsem work (the other 34 are
  unrelated: HP Prime, telescopes, Synology drivers, etc.).
- Default branch of every repo checked via API: all `main`.

### Repos used (all cloned with `git clone --depth 1` into `%TEMP%/shelfkit-repos` = Git Bash `/tmp/shelfkit-repos`)

| Repo | URL | What was taken |
|---|---|---|
| ShelfKit-Vusion | https://github.com/BeatSkip/ShelfKit-Vusion | Main source: `README.md`, all of `Documentation/*.md` (17 files) + `plans/`, `ShelfKit-Server/README.md` + `docs/`, `ShelfKit-Firmware/{README,Bootloader,Tooling,Vusion,Vusion-Hub}/README.md`, `build-log.md`, `.agents/skills/**` (2 skills + references, vendor txt excluded), `Data/flashdump.py` docstring, screenshots, board/x-ray images |
| ESL-Modding | https://github.com/BeatSkip/ESL-Modding | The chronicles: `blog/2025-01-20-reverse-vusion-part-1` (story, images), `part-2`, `2025-07-11-back-on-the-project`, `docs/about.md` (affiliation/intent), `docs/reverse-engineering/vusion-26/*`, `docs/tooling-development/01-tooling/axsem/*` |
| SES-Imagotag-UU340 | https://github.com/BeatSkip/SES-Imagotag-UU340 | README (component list, AX8052 pin table), `archive/signal-list.md`, `bootloader/` (Code::Blocks project, AND9331), board image |
| Axsem-sdcc-helloworld | https://github.com/BeatSkip/Axsem-sdcc-helloworld | README (SDCC status, flash-dump tool, quirks), `GDEW026Z39-init-reference.md` (3-driver cross-check), SDCC-MDF/PowerShell workaround |
| Vusion-Bootloader | https://github.com/BeatSkip/Vusion-Bootloader | Empty repo — noted as such on the repo map |
| ImagoTag-Vusion-custom-firmware | https://github.com/BeatSkip/ImagoTag-Vusion-custom-firmware | IAR/CMake scaffold README, `tools/axsem-flasher.py` |
| ImagoTag-Vusion-project-scaffold | https://github.com/BeatSkip/ImagoTag-Vusion-project-scaffold | Scaffold README (near-identical to the above) |
| ImagoTagESL | https://github.com/BeatSkip/ImagoTagESL | Same scaffold + changelog (expanded to TI CC2510 G1 4.4) |
| axsem-sdcc-template | https://github.com/BeatSkip/axsem-sdcc-template | SDCC + Docker dev-container toolchain description |
| imagotag-g1-4.4-fw | https://github.com/BeatSkip/imagotag-g1-4.4-fw | CC2510 firmware README (PlatformIO, ESP_CC_Flasher, source: andrei-tatar/imagotag-hack) |
| Solum-Flasher | https://github.com/BeatSkip/Solum-Flasher | RP2040 port of ATC1441's ZBS_Flasher, README pinout table + 2 images |

Skipped as empty stubs: ESL-Modding `docs/tooling-development/01-tooling/ti-cc/*` and
`02-vusion/*`, `03-g1/*` (frontmatter-only). Duplicate: `Axsem-sdcc-helloworld/GDEW026Z39-init-reference.md`
is the same content as ShelfKit-Vusion's `Documentation/` copy — imported once.
Datasheets/PDFs (AX8052, AX5043, FM11NT0X1D, GDEW*, IL0373, AND9331/9347/9349, Vusion) were **not**
copied into the site; pages link to the GitHub blob pages in the repos that contain them.

### External references cited by the sources (not fetched, linked only)
Dmitry Grinberg & Aaron Christopher ESL posts, OpenEPaperLink (Aaron Christopher),
atc1441/ZBS_Flasher, andrei-tatar/imagotag-hack, angrymew/firmware-cc2510,
michaelkamprath/ePaperDriverLib, section77/ESP_CC_Flasher, beatskip.github.io/ESL-Modding.

## 2. Working process

1. **Discovery & clone** — GitHub API listing (above), shallow clones to temp, tree survey of
   each repo (`find` + `du`), README/docs reads to extract facts and the author's writing style.
2. **Style analysis** — the blog/READMEs use a first-person, lowercase-"i", punchy, dry-humour
   voice (e.g. the "chinesium" glossary); technical docs use a denser register with Gotchas/
   Status/Open-questions sections. New narrative pages were written in that voice with
   grammar/typos fixed (style guide shared with sub-agents at `%TEMP%/shelfkit-style.md`).
3. **Platform evaluation** — compared Docusaurus 3, VitePress, Astro Starlight, MkDocs Material,
   Hugo, hand-rolled HTML in a weighted choice matrix (workflow fit, markdown-corpus handling,
   design, search, Windows/Node-26 build reliability, assets, effort). **User chose VitePress**
   and a multi-chapter structure (RE story separated from the end product), rejecting the old
   beatskip.github.io/ESL-Modding Docusaurus styling.
4. **Scaffold** — `package.json` + `npm i -D vitepress` (installed 1.6.4; esbuild verified working
   despite a blocked postinstall, via the `@esbuild/win32-x64` optional dep), `.vitepress/config.mts`
   (nav + 5 sidebar groups, local search, cleanUrls, sitemap), custom theme
   `.vitepress/theme/{index.ts,style.css}` — an e-ink BWR look: paper `#f6f3ec`, ink black, one red
   accent, sharp corners, panel-framed images, `.timeline` and `.repo-grid` components.
5. **Assets** — 33 images copied from the repos into `public/assets/img/` with stable names, then
   downscaled with Pillow (max width 1800 px, big photos → progressive JPEG q86): 100+ MB of source
   PNGs became 5.6 MB total. Final name list recorded in `%TEMP%/shelfkit-assets-final.txt`.
6. **Verbatim doc import** — python script (`%TEMP%/import_docs.py`) copied 51 markdown files from
   the repos into `journey/ hardware/ wireless/ shelfkit/ reference/`, stripping Docusaurus
   frontmatter, prepending a provenance `::: info` block, and rewriting links: images →
   `/assets/img/…`, imported `.md` links → clean site routes, all other repo files →
   `github.com/BeatSkip/<repo>/blob/main/<path>`.
7. **Narrative pages via sub-agents** (to parallelise writing; reviewed afterwards for consistency):
   - `journey-writer` → `journey/index.md` + `01…07` chapters + `hardware/index.md` (9 files).
   - `product-writer` → `index.md` (home), `about.md`, `repos.md`, `shelfkit/index.md`,
     `shelfkit/start.md`, `shelfkit/roadmap.md`, `reference/index.md` (7 files).
   Both were briefed with the style guide, file lists, asset names and link conventions.
8. **Fixes during bring-up** — (a) a `/c/...` vs `C:\` path mix-up initially wrote files into a
   literal `C:\c\...` tree; moved into place and removed. (b) `/wireless/index` links normalised to
   `/wireless/`. (c) `reference/early-scaffolds.md` was in the sidebar but not written by the agents —
   written manually. (d) Four raw `<...>` placeholders (`<tag>`, `<project_dir>`, `<base64 or URL>`,
   `<TAG_ID>`) broke the Vue compiler — wrapped in code spans. (e) Home-page `<title>` picked up the
   first h1 — demoted it to h2.
9. **Build & verify** — `npx vitepress build` → **69 HTML pages, no dead-link warnings, ~11 MB dist**
   (5.6 MB images + JS/CSS). Spot-checked rendered HTML: titles, timeline markup, image references,
   cross-links all present. Dead-link check: none reported by VitePress.

## 3. Site structure

```
shelfkit-docs/
├── index.md            landing (hero + 6 feature cards + timeline)
├── about.md            hobby/MIT/affiliation-intent note
├── repos.md            map of all 11 related repos + how they evolved into ShelfKit
├── journey/            8 pages: chronological RE story (haul → PCB → programmer →
│                       toolchain → bootloader/flasher → SDCC flash dump → side quests)
├── hardware/           7 pages: overview, pinout, GDEW026Z39 display, PA2/PA5, NFC, gotchas, errata
├── wireless/           7 pages: 868 MHz link, OTA, identity/flash map, power ×3, deep sleep
├── shelfkit/           12 pages: overview, quickstart, server, InkServices, InkLayout, plan,
│                       firmware, bootloader, tooling, tag fw, hub fw, roadmap
├── reference/          31 pages: verbatim docs from all repos (READMEs, skills, notes, build log)
├── public/assets/img/  33 optimised images
├── .vitepress/         config.mts + custom e-ink theme
└── worklog.md          this file
```

## 4. Reproduce / iterate

```bash
cd shelfkit-docs
npm install          # once
npm run dev          # dev server
npm run build        # static output in .vitepress/dist (deployable anywhere, e.g. GitHub Pages)
npm run preview      # serve the built site locally
```

To re-import docs after upstream repo changes: re-clone the repos into `%TEMP%/shelfkit-repos`
(read-only), re-run `%TEMP%/copy_assets.py`, `%TEMP%/optimize_assets.py` and `%TEMP%/import_docs.py`
(scripts kept in the session temp dir), then `npm run build`.

## 5. GitHub Pages deployment (2026-11-17)

- Repo `BeatSkip/shelfkit-docs` (public, was empty, default branch `main`) was used as-is.
- `.vitepress/config.mts` sets `base: '/shelfkit-docs/'` for production builds
  (`PAGES_BASE` env or `NODE_ENV=production`), so local `npm run dev` stays at `/` while the
  Pages build links under `/shelfkit-docs/`. Verified in local `dist/`: asset and page URLs
  carry the prefix.
- `.github/workflows/deploy.yml` mirrors the existing `ESL-Modding` deploy workflow pattern:
  on push to `main` (or manual dispatch) it runs `npm ci` → `npm run build` (Node 22) →
  `actions/upload-pages-artifact@v3` (`.vitepress/dist`) → `actions/deploy-pages@v4` into the
  `github-pages` environment with `pages: write` + `id-token: write`.
- Pages enabled via API: `POST /repos/BeatSkip/shelfkit-docs/pages {"build_type":"workflow"}` →
  site URL **https://beatskip.github.io/shelfkit-docs/**.
- First push of `main` triggered workflow run 43915979322 → **completed: success**.
  Verified live with HTTP 200 on `/`, `/journey/`, `/shelfkit/`, `/repos`, `/about`,
  leaf pages without trailing slash (`/journey/02-cracking-open`, `/hardware/pinout`,
  `/reference/uu340-readme`, …), an image, and `/sitemap.xml`. Note: GitHub Pages serves
  `foo.html` at `/foo`, but a trailing slash on a leaf (`/repos/`) 404s — that is normal
  Pages behaviour with `cleanUrls`.
- Subsequent edits: change files in this directory, `git commit`, `git push` — the workflow
  rebuilds and redeploys automatically (~1–2 min).

## 6. Assumptions & notes

- "One nice static web page" was implemented as one static *site* with a single landing page plus
  chapters (user explicitly approved subpages/chapters over a single scroll).
- Writing style: kept the author's voice, fixed spelling/grammar only (user request).
- No emoji anywhere (house rule), even though the topic is playful.
- `Vusion-Bootloader` is an empty GitHub repo; shown as a placeholder on the repo map.
- Screenshots in ShelfKit-Vusion are the real app UI with simulated serial data (per its README
  note) — mentioned as such on the ShelfKit pages.
- The temp clones in `%TEMP%/shelfkit-repos` can be deleted freely; nothing in this site dir
  depends on them at build time.
