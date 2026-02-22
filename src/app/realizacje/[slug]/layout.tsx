import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realizacja",
  description:
    "Szczegóły realizacji scenograficznej Labo Pracownia – zakres prac, lokalizacja, galeria zdjęć i pełny opis projektu.",
  openGraph: {
    title: "Realizacja | Labo Pracownia",
    description:
      "Szczegóły projektu scenograficznego zrealizowanego przez Labo Pracownia.",
  },
};

export default function RealizacjaSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
