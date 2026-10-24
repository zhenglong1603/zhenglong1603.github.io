import { Fragment, type ReactNode } from 'react';

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders `[label](href)` segments in i18n strings as inline links. */
export const renderRichText = (text: string): ReactNode => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [full, label, href] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    nodes.push(
      <a
        className="underline underline-offset-2 transition-colors hover:text-foreground"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>,
    );
    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>);
};
