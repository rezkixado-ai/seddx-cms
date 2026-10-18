import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeedX CMS — Creative Chaos With a Point",
  description: "SeedX Studio content management workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
