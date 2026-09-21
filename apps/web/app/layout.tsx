import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnovateProcure",
  description: "SIH 2026 — PS 26136 — government-startup procurement platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
