import { ReactNode } from "react";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: PublicLayoutProps) {
  return <>{children}</>;
}
