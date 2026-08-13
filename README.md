# Blinds & Drapery

Website for Exline Labs' Blinds & Drapery product line, built with Next.js. This README is a living doc — sections marked **TBD** will get filled in as we build (API endpoints, environment variables, deployment target, etc.).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI library | React 19 |
| Styling | Tailwind CSS 4 |
| Package manager | npm |
| Hosting | TBD — being decided (candidates: Vercel, Hostinger VPS) |

> **Heads up on Next.js version:** this project is on Next.js 16, which has real breaking changes vs. older Next.js docs/tutorials/AI training data. When in doubt about an API or convention, check `node_modules/next/dist/docs/` before assuming how something works — see `AGENTS.md` for details.

## Getting started

Requires Node.js (version pin coming via `.nvmrc` — see Phase 0 in project tracking) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. The homepage lives at `src/app/page.tsx` and hot-reloads on save.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

## Project structure

```
src/
  app/          # routes, layouts (App Router)
```

This will grow as we build out the content-decoupling pattern required for this project (see `CLAUDE.md` / project instructions):

```
src/
  app/          # routes, layouts (App Router) — server-first, content resolved here
  components/   # UI components, consume typed content via useContent()
  content/      # mock.ts (and later, real data) — conforms to types/content.ts
  hooks/        # useContent() typed accessor
  types/        # PageContent and per-section content interfaces
```

No UI strings, image/video URLs, or links should be hardcoded directly in JSX — everything routes through the typed content layer above, so swapping mock data for a real API later touches `useContent()` only, not the components.

## Design & project tracking

- Figma: [Blinds & Drapery UI](https://www.figma.com/design/32WupxUVnM8fZGjTlI6EzG/Blinds-Drapery?node-id=1-14&p=f&m=dev)
- Jira board: [BLIN](https://exlinelabs-team.atlassian.net/jira/software/projects/BLIN/boards/372/backlog)

## API / data sources

**TBD** — no external API integrated yet. This section will document endpoints, auth, and env vars once they're wired in.

## Environment variables

**TBD** — none required yet.

## Deployment

**TBD** — hosting target not finalized. Whatever we pick, production builds should keep working via the standard `npm run build && npm run start` flow so the choice stays swappable.
