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
import { AnimatedText, AnimatedNumber, FadeInView } from "../../anim";

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
      <div className="relative w-full">
        <StickyHeader
          className="top-0 z-0 -mt-32 text-[4rem] text-white/20 lg:-mt-[12rem] lg:text-[5rem] xl:text-[12rem]"
          title="O NAS"
          delay={0.2}
        />

        {/* Title Section */}
        <FadeInView className="relative z-20 container mx-auto -mt-20">
          {/* Content Layout */}
          <div className="mx-auto mt-24 max-w-4xl text-center lg:mt-10">
            <Card>
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
        </FadeInView>

        {/* Stats Section */}
        <section className="container mx-auto max-w-7xl py-24">
          <FadeInView>
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat, index) => {
                const Icon = stat.Icon;
                return (
                  <Card key={stat.id}>
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
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </dd>
                      <p className="mt-2 text-sm text-stone-400">
                        <AnimatedText
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
