// apps/client/src/components/ui/badge.tsx

import { ReactElement } from 'react';

function Badge({
  variant = 'warn',
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}): ReactElement {
  if (variant === 'warn') {
    return (
      <>
        <span className="inline-flex items-center rounded-md text-yellow-800 bg-yellow-50 dark:bg-yellow-400/10 px-2 py-1 text-xs font-medium dark:text-yellow-500 ring-1 ring-inset dark:ring-yellow-400/20 ring-yellow-600/20">
          {children}
        </span>
      </>
    );
  }
}

export { Badge };
