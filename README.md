# Sue Zheng Long — Portfolio

Personal portfolio site built with React, TypeScript, Tailwind CSS, and shadcn/ui. Features bilingual support (EN/ZH)

**Live site:** https://zhenglong1603.github.io

## Prerequisites

- [Vite+ CLI](https://viteplus.dev/) (`vp`) — global toolchain for dev, lint, format, test, and build
- Node.js (managed via `vp env` if needed)

## Quick Start

```bash
vp install
vp dev
```

Open the URL printed in the terminal (default Vite dev server).

## Quality Gates

Pre-commit runs `vp staged` → `vp check --fix` on staged files (format + lint). After `vp install`, Vite+ enables the hook via `vp config`.

CI and PRs still run the full suite:

```bash
vp check    # format, lint, and TypeScript checks
vp test     # unit tests (Vitest via Vite+)
vp build    # production build to dist/
```

## Project Structure

| Path                                                    | Purpose                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------- |
| `src/pages/home-page.tsx`                               | Main portfolio page                                         |
| `src/components/*.tsx`                                  | Single-file section components (header, hero, skills, etc.) |
| `src/components/experience/`, `projects/`, `world-map/` | Multi-file sections                                         |
| `src/components/ui/`                                    | shadcn/ui primitives                                        |
| `src/locale/`                                           | i18n JSON files + `useI18n()` hook                          |
| `src/services/api.ts`                                   | Cloudflare Workers API client                               |
                             |

See [AGENTS.md](./AGENTS.md) for full architecture, conventions, and task recipes — especially useful for AI/agent contributors.

## Agent Skills

Skills from [skills.sh](https://www.skills.sh/) in [`.cursor/skills/`](.cursor/skills/): Tailwind v4, shadcn/ui, and Git workflow. React/TypeScript conventions are in `.cursor/rules/` and `AGENTS.md`.

## Deployment

Pull requests targeting `master` run GitHub Actions CI (`.github/workflows/ci.yml`): `vp check`, `vp test`, and `vp build` (no deploy).

Pushes to `master` trigger GitHub Actions (`.github/workflows/deploy.yml`):

1. `vp check` — lint and type checks
2. `vp test` — unit tests
3. `vp build` — production bundle
4. Deploy `dist/` to GitHub Pages

Manual deploy:

```bash
vp run deploy
```

## Tech Stack

- React 18 + TypeScript
- Vite+ (`vp` CLI)
- Tailwind CSS v4 + shadcn/ui
- Motion (animations)
