import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: "Realizacja",
    description:
      "Szczegóły realizacji scenograficznej Labo Pracownia – zakres prac, lokalizacja, galeria zdjęć i pełny opis projektu.",
    alternates: {
      canonical: `/realizacje/${slug}`,
    },
    openGraph: {
      title: "Realizacja | Labo Pracownia",
      description:
        "Szczegóły projektu scenograficznego zrealizowanego przez Labo Pracownia.",
    },
  };
}

export default function RealizacjaSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
