"use client";

import { motion } from "framer-motion";
import MachinesGridEntry from "./MachinesGridEntry";
import HeaderDetails from "@/app/components/ui/header-details";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ParkMaszynPage() {
  return (
    <main className="min-h-screen lg:mt-20">
      {/* Main Content */}
      <div className="relative">
        <HeaderDetails
          title="PARK MASZYN"
          subtitle="Zaawansowane technologie produkcyjne"
          backgroundImage="/scene.jpg"
          description={[
            "Dysponujemy nowoczesnym parkiem maszynowym, który umożliwia nam realizację projektów na najwyższym poziomie. Nasze zaawansowane technologie produkcyjne pozwalają na precyzyjne wykonanie elementów scenograficznych z różnorodnych materiałów – od cięcia CNC, przez druk 3D, po specjalistyczną obróbkę metalu i drewna.",
            "Część naszego wyposażenia została zaprojektowana i zbudowana bezpośrednio przez nasz zespół inżynierów, aby idealnie odpowiadać wymaganiom realizowanych projektów. Każda maszyna została dobrana i dostosowana pod kątem maksymalnej jakości i efektywności produkcji, gwarantując doskonałe rezultaty.",
            "Uzupełnieniem naszego parku są dziesiątki innych niezbędnych narzędzi i urządzeń, takich jak piły ukośne, zagłębiarki, szlifierki oscylacyjne, gwoździarki, wyrzynarki, piły tarczowe oraz małe drukarki 3D, które dają nam pełną swobodę w realizacji nawet najbardziej wymagających projektów.",
          ]}
          onLoad={true}
        />

        <motion.div
          className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Machines Grid */}
          <MachinesGridEntry />
        </motion.div>
      </div>
    </main>
  );
}
