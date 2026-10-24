---
name: shadcn
description: Add and customize shadcn/ui components in this portfolio (radix-nova, Vite+, Tailwind v4).
user-invocable: false
---

# shadcn/ui (this project)

Use **`vp dlx shadcn@latest`** for all CLI commands (not npx/pnpm dlx).

Project config: `components.json` — style `radix-nova`, icons `lucide`, CSS `src/index.css`, aliases `@/components/ui`.

## Principles

1. Check installed components in `src/components/ui/` before adding.
2. Compose existing primitives; don't build custom UI from scratch.
3. Use built-in variants (`variant`, `size`) and semantic colors (`bg-primary`, `text-muted-foreground`).

## Critical Rules

Each links to Incorrect/Correct examples:

- [styling.md](./rules/styling.md) — `gap-*` not `space-*`, `size-*`, semantic tokens, `cn()`, no manual `dark:` overrides
- [forms.md](./rules/forms.md) — `FieldGroup` + `Field`, `InputGroup`, `ToggleGroup`, validation via `data-invalid` / `aria-invalid`
- [composition.md](./rules/composition.md) — items inside Groups, Card/Dialog/Sheet structure, `Alert`/`Empty`/`Separator`/`Skeleton`/`Badge`
- [icons.md](./rules/icons.md) — `data-icon` on icons in buttons, no manual icon sizing
- [base-vs-radix.md](./rules/base-vs-radix.md) — `asChild` (radix) vs `render` (base); this project uses **radix**

## Workflow

1. **Add:** `vp dlx shadcn@latest add <component>`
2. **Docs:** `vp dlx shadcn@latest docs <component>` — fetch returned URLs before implementing
3. **Search:** `vp dlx shadcn@latest search -q "<query>"`
4. **Update preview:** `vp dlx shadcn@latest add <component> --dry-run` / `--diff <file>` — never `--overwrite` without user approval

After adding from a community registry, fix hardcoded `@/components/ui/...` imports to match project aliases.

## Component Selection

| Need     | Use                                                          |
| -------- | ------------------------------------------------------------ |
| Actions  | `Button`                                                     |
| Forms    | `Input`, `Select`, `Checkbox`, `Switch`, `Textarea`, `Field` |
| Layout   | `Card`, `Separator`, `Tabs`, `ScrollArea`                    |
| Overlays | `Dialog`, `Sheet`, `Drawer`, `AlertDialog`                   |
| Feedback | `sonner`, `Alert`, `Skeleton`, `Spinner`, `Badge`            |
| Menus    | `DropdownMenu`, `Tooltip`, `Popover`                         |
