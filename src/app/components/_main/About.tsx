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

// Custom AnimatedNumber component for stats
const StatsAnimatedNumber = ({
  value,
  suffix = "",
  className,
  delay = 0,
  isInView,
}: {
  value: number;
  suffix?: string;
  className?: string;
  delay?: number;
  isInView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        ease: "easeOut",
        delay: delay,
      });

      return controls.stop;
    }
  }, [count, value, isInView, delay]);

  return (
    <motion.span
      className={`font-michroma text-3xl font-semibold tracking-tight ${className || ""}`}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
        delay: delay,
      }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default function About() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    margin: "25% 0px 25% 0px",
  });

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
      <div className="relative w-full">
        <StickyHeader
          className="-mt-32 px-2 md:ml-0 md:px-0 lg:-mt-[12rem]"
          title="O NAS"
          delay={0.2}
        />

        {/* Title Section */}
        <FadeInView className="relative z-20 -mt-20">
          {/* Content Layout */}
          <div className="mx-auto mt-24 max-w-7xl lg:mt-10">
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
        <section
          ref={statsRef}
          className="container mx-auto max-w-7xl px-2 py-24 md:px-0 xl:pt-32"
        >
          <FadeInView>
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat, index) => {
                const Icon = stat.Icon;
                return (
                  <Card className="cursor-default" key={stat.id}>
                    <div className="top absolute -right-4 z-0 scale-100 opacity-30 transition-all duration-800 ease-out group-hover:scale-110 group-hover:opacity-50">
                      <Icon
                        size={80}
                        strokeWidth={0.5}
                        className="text-stone-400"
                      />
                    </div>

                    <div className="relative z-10">
                      <dt className="text-sm leading-6 text-stone-300">
                        <AnimatedText
                          text={stat.name}
                          delay={0.5 + index * 0.1}
                        />
                      </dt>
                      <dd className="font-michroma order-first text-3xl font-semibold tracking-tight text-white">
                        <StatsAnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                          delay={2.0 + index * 0.1}
                          isInView={isStatsInView}
                        />
                      </dd>
                      <p className="mt-2 text-sm text-stone-400">
                        <AnimatedText
                          className="line-clamp-1"
                          text={stat.description}
                          delay={0.9 + index * 0.1}
                        />
                      </p>
                    </div>
                  </Card>
                );
              })}
            </dl>
          </FadeInView>
        </section>
      </div>
    </div>
  );
}
