import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kwalitaria Voice Agent Demo",
  description: "Demo applicatie voor de Kwalitaria AI-bestelassistent Lisa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
