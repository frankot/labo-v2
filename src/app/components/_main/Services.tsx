"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Blocks, DraftingCompass, Wrench } from "lucide-react";
import Card from "../ui/card";
import StickyHeader from "../ui/sticky-header";

const AnimatedText = ({
  text,
  className,
  delay = 0,
  isTitle = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  isTitle?: boolean;
}) => {
  if (isTitle) {
    return (
      <motion.span
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: delay,
            },
          },
          hidden: {},
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                },
              },
            }}
            className="inline-block"
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.02,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            },
          }}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const serviceCategories = [
  {
    category: "Koncepcja i projekty",
    emoji: "🎨",
    Icon: DraftingCompass,
    services: [
      {
        title: "Tworzenie koncepcji scenograficznych",
        description:
          "Kompleksowe koncepcje wizualne 3D, layouty, projektowanie elementów na podstawie briefu lub wstępnych założeń klienta",
      },
      {
        title: "Rozwiązania techniczne",
        description:
          "Opracowanie konstrukcji, dobór materiałów i technologii, dostosowanie do wymagań technicznych wydarzenia, optymalizacja projektowa",
      },
      {
        title: "Kosztorysowanie i harmonogramy",
        description:
          "Szczegółowe wyceny, planowanie etapów produkcji i montażu, kontrola budżetowa",
      },
      {
        title: "DTP i przygotowanie grafik",
        description: "Pliki do druku, proofy, adaptacje brandingowe",
      },
    ],
  },
  {
    category: "Produkcja i wykonanie",
    emoji: "🏭",
    Icon: Blocks,
    services: [
      {
        title: "Produkcja elementów scenograficznych",
        description:
          "Własny park maszynowy: CNC, stolarnia, druk 3D, lakiernia, ślusarnia",
      },
      {
        title: "Zabudowy sceniczne i wystawiennicze",
        description:
          "Realizacja stoisk targowych, stref eventowych, przestrzeni ekspozycyjnych",
      },
      {
        title: "Scenografia eventowa, festiwalowa i telewizyjna",
        description:
          "Konstrukcje plenerowe, scenografie do planów zdjęciowych i koncertów, oprawy sceniczne",
      },
      {
        title: "Instalacje promocyjne i multimedialne",
        description:
          "Projekty ambientowe, interaktywne, niestandardowe nośniki reklamowe, zabudowy zintegrowane z AV, oświetleniem i systemami interaktywnymi",
      },
    ],
  },
  {
    category: "Obsługa i wsparcie",
    emoji: "🔧",
    Icon: Wrench,
    services: [
      {
        title: "Doradztwo techniczne",
        description:
          "Dokumentacja wykonawcza, dobór technologii, prototypowanie",
      },
      {
        title: "Koordynacja i nadzór",
        description:
          "Stała obsługa projektu, bieżące dostosowania, nadzór techniczny i operacyjny na miejscu",
      },
      {
        title: "Montaż i logistyka",
        description:
          "Transport własną flotą, profesjonalny montaż i demontaż, wsparcie techniczne podczas wydarzeń",
      },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "25% 0px 25% 0px" });
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <section
      id="services"
      ref={ref}
      className="relative mb-20 min-h-[70vh] pb-24 xl:-mt-10"
    >
      <StickyHeader
        className="uppercase lg:-mt-[12rem]"
        title="Usługi"
        delay={0.1}
      />
      <motion.div
        className="relative z-10 container mx-auto mt-16 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Mobile View */}
        <div className="lg:hidden">
          <motion.div className="space-y-4" variants={itemVariants}>
            {/* <h2 className="font-michroma mb-8 text-center text-3xl font-bold text-white">
              <AnimatedText text="Usługi" delay={0.1} />
            </h2> */}

            {/* Mobile Icons */}
            <div className="mb-8 flex justify-center gap-4">
              {serviceCategories.map((category, index) => (
                <motion.button
                  key={index}
                  className={`group relative flex h-16 w-16 items-center justify-center rounded-xl border transition-all duration-300 ${
                    activeService === index
                      ? "border-white/30 bg-white/10 backdrop-blur-sm"
                      : "border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/5"
                  }`}
                  variants={itemVariants}
                  onClick={() => setActiveService(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.Icon
                    className={`size-8 text-white transition-transform duration-300 ${
                      activeService === index ? "scale-110" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Card */}
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="border-white/10 bg-black/20 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-white/5 p-2 backdrop-blur-sm">
                    {(() => {
                      const IconComponent =
                        serviceCategories[activeService].Icon;
                      return (
                        <IconComponent
                          className="size-6 text-white"
                          strokeWidth={1.5}
                        />
                      );
                    })()}
                  </div>
                  <h3 className="font-michroma text-lg text-white">
                    {serviceCategories[activeService].category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {serviceCategories[activeService].services.map(
                    (service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="group/item relative"
                      >
                        <div className="relative overflow-hidden rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:bg-white/10">
                          <h4 className="mb-2 text-sm font-semibold text-stone-100 transition-colors duration-300 group-hover/item:text-white">
                            {service.title}
                          </h4>
                          <p className="text-xs leading-relaxed text-stone-400 transition-colors duration-300 group-hover/item:text-stone-300">
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Service Categories */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {serviceCategories.map((category, index) => (
              <motion.button
                key={index}
                className={`group relative w-full text-left transition-all duration-300 ${
                  activeService === index ? "scale-105" : "hover:scale-102"
                }`}
                variants={itemVariants}
                onClick={() => setActiveService(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`transition-all duration-300 ${
                    activeService === index
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-black/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
                      <category.Icon
                        className={`size-8 text-white transition-transform duration-300 ${
                          activeService === index ? "scale-110" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <h3 className="font-michroma text-lg text-white">
                        {category.category}
                      </h3>

                      {/* Active indicator */}
                      <div
                        className={`h-2 w-2 rounded-full bg-white transition-opacity duration-300 ${
                          activeService === index ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </div>
                </Card>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Column - Service Details */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="sticky top-24">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="border-white/10 bg-black/20 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
                      {(() => {
                        const IconComponent =
                          serviceCategories[activeService].Icon;
                        return (
                          <IconComponent
                            className="size-10 text-white"
                            strokeWidth={1.5}
                          />
                        );
                      })()}
                    </div>
                    <h3 className="font-michroma text-2xl text-white">
                      {serviceCategories[activeService].category}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {serviceCategories[activeService].services.map(
                      (service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="group/item relative"
                        >
                          <div className="relative overflow-hidden rounded-lg border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10">
                            <h4 className="mb-2 font-semibold text-stone-100 transition-colors duration-300 group-hover/item:text-white">
                              {service.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-stone-400 transition-colors duration-300 group-hover/item:text-stone-300">
                              {service.description}
                            </p>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
