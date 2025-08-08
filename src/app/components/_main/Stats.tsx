"use client";

import {
  Calendar,
  Building2,
  Warehouse,
  Factory,
  Users2,
  Clock,
} from "lucide-react";
import Card from "../ui/card";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  {
    id: 1,
    name: "Lata doświadczenia",
    value: 16,
    suffix: "+",
    description: "na rynku od 2009 roku",
    Icon: Calendar,
  },
  {
    id: 2,
    name: "Zrealizowanych projektów",
    value: 2500,
    suffix: "+",
    description: "Eventów, wystaw, scenografii",
    Icon: Building2,
  },
  {
    id: 3,
    name: "m² własnej przestrzeni produkcyjnej",
    value: 1500,
    suffix: "+ m²",
    description:
      "Dwie hale magazynowe, stolarnia, lakiernia, druk 3D, CNC, itp",
    Icon: Warehouse,
  },
  {
    id: 4,
    name: "Liczba agencji, z którymi współpracujemy",
    value: 75,
    suffix: "+",
    description: "Stałych partnerów B2B",
    Icon: Factory,
  },
  {
    id: 5,
    name: "Zespół",
    value: 45,
    suffix: "+",
    description: "Projektantów, techników i wykonawców",
    Icon: Users2,
  },
  {
    id: 6,
    name: "Średni czas realizacji",
    value: 14,
    suffix: " dni",
    description: "Od akceptacji wizualizacji do montażu",
    Icon: Clock,
  },
];

// Desktop StatCard component
const DesktopStatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const Icon = stat.Icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "25% 0px 25% 0px",
  });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.value, {
        duration: 2,
        ease: "easeOut",
        delay: 0.3 + index * 0.1,
      });

      return controls.stop;
    }
  }, [count, stat.value, isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
      }}
    >
      <Card className="h-[180px] cursor-default p-4 sm:p-6">
        <div className="absolute top-0 -right-2 z-0 scale-100 opacity-30 transition-all duration-800 ease-out group-hover:scale-110 group-hover:opacity-50 sm:-right-4">
          <Icon
            size={60}
            strokeWidth={0.5}
            className="text-stone-400 sm:h-20 sm:w-20"
          />
        </div>

        <div className="relative z-10 space-y-2 sm:space-y-3">
          <dt className="text-xs leading-5 text-stone-300 sm:text-sm sm:leading-6">
            {stat.name}
          </dt>
          <dd className="font-michroma order-first text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            <motion.span>{rounded}</motion.span>
            {stat.suffix}
          </dd>
          <p className="mt-1 text-xs leading-relaxed text-stone-400 sm:mt-2 sm:text-sm">
            {stat.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

// Mobile StatBar component
const MobileStatBar = ({
  stat,
  index,
  isExpanded,
  onToggle,
}: {
  stat: (typeof stats)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = stat.Icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "25% 0px 25% 0px",
  });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.value, {
        duration: 2,
        ease: "easeOut",
        delay: 0.3 + index * 0.1,
      });

      return controls.stop;
    }
  }, [count, stat.value, isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
      }}
    >
      <div onClick={onToggle} className="cursor-pointer">
        <Card className="p-4 transition-all duration-300 hover:bg-stone-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon size={24} strokeWidth={1.5} className="text-stone-400" />
              <div>
                <motion.dt
                  className="text-sm font-medium text-stone-200"
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    height: isExpanded ? "auto" : 0,
                    marginBottom: isExpanded ? "0.25rem" : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {stat.name}
                </motion.dt>
                <dd className="font-michroma text-xl font-semibold tracking-tight text-white">
                  <motion.span>{rounded}</motion.span>
                  {stat.suffix}
                </dd>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-stone-400"
            >
              ▼
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 border-t border-stone-700 pt-3">
              <p className="text-sm leading-relaxed text-stone-400">
                {stat.description}
              </p>
            </div>
          </motion.div>
        </Card>
      </div>
    </motion.div>
  );
};

// Desktop Stats Layout
const DesktopStats = () => {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {stats.map((stat, index) => (
        <DesktopStatCard key={stat.id} stat={stat} index={index} />
      ))}
    </dl>
  );
};

// Mobile Stats Layout
const MobileStats = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {stats.map((stat, index) => (
        <MobileStatBar
          key={stat.id}
          stat={stat}
          index={index}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default function Stats() {
  return (
    <section className="container mx-auto max-w-7xl px-2 py-24 md:px-0 xl:pt-32">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <DesktopStats />
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <MobileStats />
      </div>
    </section>
  );
}
