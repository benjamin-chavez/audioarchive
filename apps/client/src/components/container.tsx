// apps/client/src/components/container.tsx

import React, { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
