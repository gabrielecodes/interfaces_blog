import React from "react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <section className="mt-20">{children}</section>;
}
