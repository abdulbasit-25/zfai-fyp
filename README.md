# AI FYP Catalog 2026

A browsable catalog of **11 AI final-year project ideas** for Software Engineering / AI students — and, more importantly, a **workspace** for planning and tracking whichever one you commit to.

## Why this exists

A document can tell you what the projects are. It can't seed a kanban board from a roadmap, track which stack pieces you've installed, or hand you a Markdown status report five minutes before a supervisor meeting. That's the part this app adds.

## Features

### Catalog (`/`)

- Featured hero card for **AI Co-Founder** plus a grid of the remaining ten ideas.
- Live search across titles, hooks, domains, descriptions, keywords and every tech-stack entry.
- Filters: domain chips (colour-coded, consistent everywhere), difficulty, timeline band, team size.
- Sort by featured, difficulty or timeline length.
- "Compare" toggle on every card (max 3) and a **Random pick** button for decision paralysis.

### Project detail (`/projects/$projectId`)

- Full spec: description, numbered core features, stack grouped into Frontend / Backend / AI-ML / Infra.
- Roadmap rendered as a vertical timeline with per-phase goals.
- Collapsible "raw roadmap as checklist" preview.
- **Start working on this** → seeds the workspace.
- Print-friendly CSS: `Print spec` produces a clean single-project PDF for supervisor meetings.

### Workspace (`/workspace`)

- **Board** — kanban with To Do / In Progress / Blocked / Done, auto-seeded from the roadmap phases. Drag cards between columns (or use the quick-move buttons on touch devices), add and delete cards freely.
- **Progress** — tickable roadmap checklist, a % progress bar, and a planned-vs-earned phase-weeks chart against the suggested timeline.
- **Notes** — timestamped decision log for supervisor feedback, scope cuts and pivots.
- **Stack** — every listed tool as an "installed / set up" checkbox.
- **Risks** — the project's Key Challenges tracked as open / mitigated / resolved with a note field each.
- **Export** — Markdown status report download, plus browser Print → PDF.
- Multiple projects can be started; switch between them from the workspace header.

### Compare (`/compare`)

Side-by-side table of 2–3 projects: domain, difficulty, timeline, team size, roadmap length, total goals, full stacks with **shared tools highlighted**, and each project's challenges.

## Persistence

**Browser `localStorage`** under the key `fyp-catalog-2026.v1` — no backend, no auth, no accounts. Everything (workspace state, compare selection, theme) is per-browser and stays on your machine. If you later want multi-device sync, enabling Lovable Cloud and mirroring the same store shape into a table is the natural upgrade path.

## Editing the content

All catalog content lives in **`src/data/projects.ts`** — one typed `Project[]` array. Add, edit or remove ideas there and every view updates; no component changes needed. The `Project` type documents the required shape (hook, domain, difficulty, timeline, team size, features, four-part stack, roadmap phases with week ranges and goals, data notes, challenges, trend rationale, search keywords).

To add a new domain: extend `DOMAINS`, then add a matching colour token in `DOMAIN_COLOR` and the `--domain-*` CSS variables in `src/styles.css` (light and dark).

## Design system

Dark by default with a light toggle. Tokens live in `src/styles.css` (oklch): teal primary, warm off-white paper in light mode, `Fraunces` for display type, `Inter` for body, `IBM Plex Mono` for metadata and tags. No colours are hardcoded in components — everything goes through semantic tokens.

## Stack

React 19 · TanStack Start / Router · TypeScript · Tailwind CSS v4 · Recharts · lucide-react

## Project layout

```
src/
  data/projects.ts        # all catalog content (edit here)
  lib/workspace.ts        # localStorage store, actions, report builder
  components/             # site chrome, project cards, badges
  routes/                 # index, projects.$projectId, workspace, compare
  styles.css              # design tokens, utilities, print CSS
```

## Freshness

Compiled July 2026. AI tooling moves fast — re-verify model names, library versions and dataset licences against current docs before quoting a stack in a proposal.
