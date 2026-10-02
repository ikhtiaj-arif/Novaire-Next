import type { HTMLAttributes, ReactNode } from 'react';

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'footer';
  id?: string;
  /** Narrow reading-measure container (FAQ, policy accordion). */
  narrow?: boolean;
  labelledBy?: string;
};

/**
 * Vertical rhythm owner: a section contributes ONLY its top padding, so
 * adjacent sections never stack padding and every gap between them is
 * exactly `--spacing-rhythm` (64px) / `--spacing-rhythm-lg` (96px).
 *
 * Content below a heading block sits at `mt-8 md:mt-12`.
 */
export function Section({
  as: Tag = 'section',
  id,
  narrow = false,
  labelledBy,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={[
        'container-page scroll-mt-24 pt-rhythm md:pt-rhythm-lg',
        narrow ? 'max-w-2xl' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  titleId?: string;
  lede?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  /** `page` for the h1 of an inner page, `section` for in-page h2s. */
  size?: 'page' | 'section';
  align?: 'start' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  lede,
  as: Tag = 'h2',
  size = 'section',
  align = 'start',
  className,
}: SectionHeadingProps) {
  const titleSize =
    size === 'page'
      ? 'mt-2 text-3xl font-bold text-foreground sm:text-4xl'
      : 'mt-2 text-2xl font-bold text-foreground sm:text-3xl';

  return (
    <div
      className={[align === 'center' ? 'text-center' : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </span>
      )}

      <Tag id={titleId} className={`font-heading ${titleSize}`}>
        {title}
      </Tag>

      {lede && (
        <p
          className={`mt-2 text-sm font-light leading-relaxed text-muted-foreground sm:mt-3 sm:text-base${
            align === 'center' ? ' mx-auto max-w-xl' : ''
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}