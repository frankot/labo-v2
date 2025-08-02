import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
});

export const metadata: Metadata = {
  title: "labo2",
  description: "labo2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={michroma.variable}>{children}</body>
    </html>
  );
}
