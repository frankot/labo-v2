import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Portfolio realizacji Labo Pracownia – scenografie eventowe, festiwalowe, targowe i wystawiennicze. Projekty zrealizowane w Polsce i za granicą.",
  alternates: {
    canonical: "/realizacje",
  },
  openGraph: {
    title: "Realizacje | Labo Pracownia",
    description:
      "Nasze realizacje scenograficzne – eventy, festiwale, targi, wystawy i produkcje multimedialne zrealizowane na najwyższym poziomie.",
  },
};

export default function RealizacjeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
