import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Park Maszyn",
  description:
    "Nowoczesny park maszynowy Labo Pracownia – zaawansowane technologie produkcyjne umożliwiające realizację projektów scenograficznych na najwyższym poziomie. CNC, druk 3D, obróbka metalu i drewna.",
  openGraph: {
    title: "Park Maszyn | Labo Pracownia",
    description:
      "Zaawansowane technologie produkcyjne – CNC, druk 3D, obróbka metalu i drewna. Część wyposażenia zaprojektowana i zbudowana przez nasz zespół inżynierów.",
  },
};

export default function ParkMaszynLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
