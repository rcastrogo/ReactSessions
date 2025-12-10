import type { ReactNode } from 'react';

interface ShowComponentProps {
  /** Boolean condition that determines whether to render the content */
  when: boolean;
  /** JSX content to render when `when` is true */
  children: ReactNode;
  /** Optional content to render when `when` is false */
  fallback?: ReactNode;
}

/**
 * Conditionally renders JSX content based on a boolean condition.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.when - Determines whether the content should be rendered.
 * @param {ReactNode} props.children - Content to render when `when` is true.
 * @param {ReactNode} [props.fallback=null] - Optional content to render when `when` is false.
 * @returns {JSX.Element | null} The rendered JSX content or null.
 */
export default function Show({ when, children, fallback = null }: ShowComponentProps) {
  return <>{when ? children : fallback}</>;
}
