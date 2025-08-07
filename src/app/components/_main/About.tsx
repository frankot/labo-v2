"use client";

import Image from "next/image";
import {
  Calendar,
  Building2,
  Warehouse,
  Factory,
  Users2,
  Clock,
} from "lucide-react";
import StickyHeader from "../ui/sticky-header";
import Card from "../ui/card";
import { AnimatedText, FadeInView } from "../../anim";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
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

// Simplified StatCard component
const StatCard = ({
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
      <Card className="cursor-default p-6">
        <div className="absolute top-0 -right-4 z-0 scale-100 opacity-30 transition-all duration-800 ease-out group-hover:scale-110 group-hover:opacity-50">
          <Icon size={80} strokeWidth={0.5} className="text-stone-400" />
        </div>

        <div className="relative z-10 space-y-3">
          <dt className="text-sm leading-6 text-stone-300">{stat.name}</dt>
          <dd className="font-michroma order-first text-3xl font-semibold tracking-tight text-white">
            <motion.span>{rounded}</motion.span>
            {stat.suffix}
          </dd>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            {stat.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default function About() {
  return (
    <div id="about" className="relative">
      {/* Hero Image Section */}
      <FadeInView className="relative h-[60vh] w-full">
        <Image
          src="/scene.jpg"
          alt="Studio scenograficzne"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </FadeInView>

      {/* Main Content */}
      <div className="relative container mx-auto w-full">
        <StickyHeader
          className="-mt-32 px-2 text-[4rem] sm:text-[5rem] md:ml-0 md:px-0 md:text-[7rem] lg:-mt-[12rem] lg:pt-6 lg:text-[8rem] xl:pt-0"
          title="O NAS"
          delay={0.2}
        />

        {/* Title Section */}
        <FadeInView className="relative z-20 -mt-20">
          {/* Content Layout */}
          <div className="mx-auto mt-24 max-w-7xl px-2 sm:px-4 md:px-6 lg:mt-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
              {/* Main Content Card - 2/3 width */}
              <div className="lg:col-span-2">
                <Card className="cursor-default">
                  <div className="space-y-8 text-lg leading-relaxed text-stone-300">
                    <p>
                      <AnimatedText
                        text="Jesteśmy zespołem projektowo-wykonawczym specjalizującym się w kompleksowej realizacji scenografii oraz elementów przestrzennych na potrzeby eventów, targów, wystaw i produkcji multimedialnych – zarówno w Polsce jak i poza jej granicami."
                        delay={0.1}
                      />
                    </p>
                    <p>
                      <AnimatedText
                        text="Od ponad dekady wspieramy agencje eventowe, studia kreatywne, instytucje kultury i producentów wydarzeń, dostarczając przemyślane i dopracowane rozwiązania scenograficzne."
                        delay={0.3}
                      />
                    </p>
                    <p>
                      <AnimatedText
                        text="Wychodzimy z założenia, że dobrą scenografię kreują szczegóły i to właśnie na nie zwracamy największą uwagę. Dbając o ciągły rozwój nie zapominamy o kształtowaniu dobrej atmosfery i wzajemnym inspirowaniu do działania po to, aby osiągnąć jeden cel: pełną satysfakcję naszych Klientów."
                        delay={0.5}
                      />
                    </p>
                  </div>
                </Card>
              </div>

              {/* Side Content - 1/3 width */}
              <Card className="h-fit cursor-default space-y-6 text-stone-300">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-stone-200">
                      Druk 3D
                    </h4>
                    <p className="text-xs text-stone-400">
                      <AnimatedText
                        text="Własne drukarki przemysłowe do elementów dekoracyjnych i funkcjonalnych"
                        delay={0.4}
                      />
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-stone-200">CNC</h4>
                    <p className="text-xs text-stone-400">
                      <AnimatedText
                        text="Precyzyjne cięcie i frezowanie materiałów kompozytowych"
                        delay={0.5}
                      />
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-stone-200">
                      LED Mapping
                    </h4>
                    <p className="text-xs text-stone-400">
                      <AnimatedText
                        text="Zaawansowane projekcje na niestandardowe powierzchnie"
                        delay={0.6}
                      />
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-stone-200">
                      VR/AR
                    </h4>
                    <p className="text-xs text-stone-400">
                      <AnimatedText
                        text="Wizualizacje 3D i doświadczenia immersyjne"
                        delay={0.7}
                      />
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </FadeInView>

        {/* Stats Section */}
        <section className="container mx-auto max-w-7xl px-2 py-24 md:px-0 xl:pt-32">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} index={index} />
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
