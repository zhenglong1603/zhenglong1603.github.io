import { cn } from '@/lib/utils';

/** Frosted liquid-glass surface — backdrop blur, specular edge, soft depth. */
export const glass = cn(
  'relative isolate overflow-hidden',
  'border border-white/55 bg-white/45 text-card-foreground',
  'shadow-[0_4px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(255,255,255,0.08)]',
  'dark:border-white/12 dark:bg-white/6',
  'dark:shadow-[0_8px_32px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(255,255,255,0.03)]',
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150',
  'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-linear-to-br after:from-white/25 after:via-transparent after:to-white/5',
  'dark:after:from-white/10 dark:after:to-white/[0.02]',
  'supports-[not(backdrop-filter:blur(1px))]:bg-card supports-[not(backdrop-filter:blur(1px))]:before:content-none',
);

/** Lighter glass for large panels and map containers. */
export const glassSubtle = cn(
  glass,
  'border-white/40 bg-white/30 dark:border-white/10 dark:bg-white/4',
  'shadow-[0_2px_20px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.45)]',
  'dark:shadow-[0_4px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.1)]',
);
