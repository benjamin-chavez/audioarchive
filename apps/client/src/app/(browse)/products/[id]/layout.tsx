// apps/client/src/app/(browse)/layout.tsx

// apps/client/src/app/(browse2)/layout.tsx
'use client';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Browse2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full">
      {/* <Container> */}
      <div className="">{children}</div>
      {/* </Container> */}
    </section>
  );
}
