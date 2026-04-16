import type { Metadata } from "next";
import { Michroma, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/_main/Footer";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Labo Pracownia – Scenografia i elementy przestrzenne",
    template: "%s | Labo Pracownia",
  },
  description:
    "Jesteśmy zespołem projektowo-wykonawczym specjalizującym się w kompleksowej realizacji scenografii oraz elementów przestrzennych na potrzeby eventów, festiwali, targów, wystaw i produkcji multimedialnych – zarówno w Polsce jak i poza jej granicami.",
  keywords: [
    "scenografia",
    "elementy przestrzenne",
    "eventy",
    "festiwale",
    "targi",
    "wystawy",
    "produkcje multimedialne",
    "scenografia eventowa",
    "pracownia scenograficzna",
    "Labo Pracownia",
    "realizacja scenografii",
    "agencje eventowe",
    "studia kreatywne",
    "instytucje kultury",
    "producenci wydarzeń",
    "rozwiązania scenograficzne",
  ],
  authors: [{ name: "Labo Pracownia" }],
  creator: "Labo Pracownia",
  metadataBase: new URL("https://labopracownia.pl"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Labo Pracownia",
    title: "Labo Pracownia – Scenografia i elementy przestrzenne",
    description:
      "Zespół projektowo-wykonawczy specjalizujący się w kompleksowej realizacji scenografii oraz elementów przestrzennych. Ponad 20 lat doświadczenia w eventach, festiwalach, targach i wystawach.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labo Pracownia – Scenografia i elementy przestrzenne",
    description:
      "Zespół projektowo-wykonawczy specjalizujący się w kompleksowej realizacji scenografii oraz elementów przestrzennych.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://eu-west-2.cdn.hygraph.com" />
        <link rel="dns-prefetch" href="https://eu-west-2.cdn.hygraph.com" />
      </head>
      <body
        className={`overflow-x-hidden scroll-smooth antialiased ${michroma.variable} ${quicksand.className}`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
