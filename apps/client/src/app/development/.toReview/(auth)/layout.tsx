// frontend/src/app/(auth)/layout.tsx

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="w-screen h-screen">{children}</div>;
}
