import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import { ClientShell } from "@/components/ClientShell";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Saif Salmani | Developer & Video Editor",
  description:
    "Full-stack developer and video editor based in Mumbai — portfolio, projects, and contact.",
  metadataBase: new URL("https://saifsalmani.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable} h-full scroll-smooth`}>
      <body className="min-h-full text-zinc-100 antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
