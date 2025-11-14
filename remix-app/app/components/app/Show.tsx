import type { ReactNode } from 'react';

interface ShowComponentProps {
  /** Condición booleana que determina si se renderiza el contenido */
  when: boolean;
  /** Contenido JSX a renderizar cuando test es true */
  children: ReactNode;
  /** Contenido opcional a renderizar cuando test es false */
  fallback?: ReactNode;
}

/**
 * Componente que renderiza condicionalmente su contenido.
 * Si `test` es true → muestra `children`.
 * Si `test` es false → muestra `fallback` (si se define) o nada.
 */
export default function Show({ when, children, fallback = null }: ShowComponentProps) {
  return <>{when ? children : fallback}</>;
}
