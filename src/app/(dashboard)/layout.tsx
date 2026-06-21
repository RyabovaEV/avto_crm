import { ReactNode } from "react";

export default function LayoutDashboard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <h1>Layout</h1>
      {children}
    </div>
  );
}
