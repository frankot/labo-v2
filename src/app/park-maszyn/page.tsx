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
    <div className="lg:mt-20 min-h-screen">
      {/* Main Content */}
      <div className="relative">
        <HeaderDetails
          title="PARK MASZYN"
          subtitle="Zaawansowane technologie produkcyjne"
          backgroundImage="/scene.jpg"
          description={[
            "Dysponujemy nowoczesnym parkiem maszynowym, który umożliwia nam realizację projektów na najwyższym poziomie. Nasze zaawansowane technologie produkcyjne pozwalają na precyzyjne wykonanie elementów scenograficznych z różnorodnych materiałów.",
            "Od cięcia CNC po druk 3D - każda maszyna została dobrana pod kątem maksymalnej jakości i efektywności produkcji, zapewniając naszym klientom doskonałe rezultaty.",
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
    </div>
  );
}
