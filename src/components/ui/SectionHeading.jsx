import { createElement } from 'react';

export default function SectionHeading({ as = 'h2', children, className = '', id, ...rest }) {
  const headingClass =
    `font-heading mb-4 text-lg font-bold tracking-tight text-ink sm:mb-6 sm:text-xl md:text-2xl ${className}`.trim();

  return createElement(
    as,
    {
      id,
      className: headingClass,
      ...rest,
    },
    children
  );
}
