<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

<!-- PROJECT START -->

# Portfolio Project Guide

Personal portfolio site for Sue Zheng Long, deployed to GitHub Pages at https://zhenglong1603.github.io. Pushes to `master` trigger automatic deployment via GitHub Actions.

## Tech Stack

- **React 18** + **TypeScript** — UI framework
- **Vite+** (`vp` CLI) — build, lint, format, test toolchain
- **Tailwind CSS v4** + **shadcn/ui** (`radix-nova` style) — styling and UI primitives
- **Motion** — animations
- **React Three Fiber** + **r3f-globe** — interactive 3D world map
- **react-router-dom** — routing (single-page portfolio)
- **Cloudflare Workers API** — dynamic skills and travel data

## Directory Map

```
src/
├── main.tsx              # Entry: I18nProvider → AppRoot
├── app-root.tsx          # Router wrapper
├── pages/
│   └── home-page.tsx     # Main portfolio page (all sections)
├── components/
│   ├── header.tsx        # Flat files for single-component sections
│   ├── hero.tsx
│   ├── about-me.tsx
│   ├── skills.tsx
│   ├── footer.tsx
│   ├── download-popup.tsx
│   ├── experience/       # Multi-file folders only when needed
│   ├── projects/
│   ├── world-map/        # 3D globe (globe-canvas.tsx, utils.ts, world-map.module.css)
│   └── ui/               # shadcn primitives (Button, Card, Dialog, etc.)
├── locale/
│   ├── en.json           # English strings
│   ├── zh.json           # Chinese strings
│   └── index.tsx         # I18nProvider + useI18n() hook
├── services/
│   └── api.ts            # Cloudflare Workers API client
├── context/
│   └── index.ts          # ThemeContext (dark/light)
├── lib/
│   └── utils.ts          # cn() class-name helper
└── index.css             # Tailwind + shadcn theme tokens
```

## Conventions

- **File/folder naming:** kebab-case only (enforced by oxlint in `vite.config.ts`)
- **Imports:** use `@/` alias → `src/` (e.g. `@/components/header`)
- **i18n:** all user-facing strings go in both `src/locale/en.json` and `src/locale/zh.json`; use `const { t } = useI18n()` and `t('key')`
- **UI:** prefer shadcn components from `@/components/ui/`; use Tailwind utilities and `cn()` for conditional classes. Use CSS modules (`.module.css`) only when Tailwind is impractical — never use SCSS
- **Component files:** single-file components live as `src/components/<name>.tsx`; use a subfolder only when multiple related files are needed (e.g. `world-map/`, `projects/`)
- **shadcn:** add components via `vp dlx shadcn@latest add <component>`; config in `components.json` (style: `radix-nova`, aliases: `@/components/ui`, `@/lib/utils`)
- **3D globe:** keep Three.js logic in `world-map/globe-canvas.tsx` and `world-map/utils.ts`; lazy-load with `React.lazy`
- **Theme:** dark mode toggled via `ThemeContext` on `home-page`; wrap sections in `className={darkMode ? 'dark' : ''}`
- **Pre-commit:** `.vite-hooks/pre-commit` runs `vp staged` → `vp check --fix` on staged files. Enable locally with `vp config` (also run by `prepare` after `vp install`)

## External API

| Endpoint                    | Returns          | Used by           |
| --------------------------- | ---------------- | ----------------- |
| `GET /api/skills:new`       | `Skill[]`        | `skills/` section |
| `GET /api/travel/countries` | `string[]`       | `world-map/`      |
| `GET /api/travel/markers`   | `TravelMarker[]` | `world-map/`      |
| `GET /api/travel/places`    | `string[]`       | `world-map/`      |
| `GET /api/visited`          | `VisitedEntry[]` | `world-map/`      |

Types are defined in `src/services/api.ts`. When changing API shapes, update types and all consuming components together.

## Common Tasks

### Add a homepage section

1. Create `src/components/<section-name>.tsx` (kebab-case flat file)
2. Add i18n keys to both `en.json` and `zh.json`
3. Import and render in `src/pages/home-page.tsx` between `<Separator />` blocks
4. Run `vp check`

### Add a shadcn component

```bash
vp dlx shadcn@latest add <component-name>
```

Component lands in `src/components/ui/`. Import from `@/components/ui/<component>`.

### Add or modify i18n strings

1. Add the same key to `src/locale/en.json` and `src/locale/zh.json`
2. Use `const { t } = useI18n()` in the component
3. Reference with `t('your.key')` — missing keys fall back to the key string

### Change skills or travel data

- **Remote data:** edit the Cloudflare Worker backing `API_BASE_URL` in `src/services/api.ts`
- **Local fallback / static data:** check section-specific files under `src/components/<section>/`

## Deployment

- **PR CI:** pull requests to `master` → `.github/workflows/ci.yml` runs `vp check`, `vp test`, `vp build` (no deploy)
- **Automatic:** push to `master` → `.github/workflows/deploy.yml` runs `vp check`, `vp test`, `vp build`, deploys `dist/` to GitHub Pages
- **Manual:** `vp run deploy` (runs `vp build` then `gh-pages -d dist`)

## Agent Skills

Three focused skills from [skills.sh](https://www.skills.sh/) live in [`.cursor/skills/`](.cursor/skills/):

| Skill                    | Source          | Use when                                        |
| ------------------------ | --------------- | ----------------------------------------------- |
| `tailwind-design-system` | wshobson/agents | Tailwind v4 tokens, theming, component variants |
| `shadcn`                 | shadcn/ui       | Adding/customizing shadcn/ui components         |
| `git-workflow`           | agno-agi/agno   | Commits, branches, PRs (Conventional Commits)   |

React, TypeScript, and Vite+ conventions are in `.cursor/rules/` and this file — avoid installing more skills unless needed.

```bash
npx skills add <owner/repo> --skill <skill-name> --agent cursor --copy -y
cp -r .agents/skills/<name> .cursor/skills/
```

<!-- PROJECT END-->
