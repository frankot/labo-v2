"use client";

import * as React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { Michroma } from "next/font/google";
import { Building2, Cpu, Users2, Globe2, Factory, Leaf } from "lucide-react";
import StickyHeader from "../ui/sticky-header";
import Card from "../ui/card";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

const historyEvents = [
  {
    year: "2009",
    event: "Rozpoczęcie działalności jako dwuosobowy warsztat scenograficzny.",
    icon: Building2,
  },
  {
    year: "2014",
    event:
      "Realizacja pierwszych dużych produkcji dla branży eventowej i reklamowej.",
    icon: Cpu,
  },
  {
    year: "2018",
    event: "Przekształcenie w spółkę i rozwój struktur organizacyjnych.",
    icon: Users2,
  },
  {
    year: "2020",
    event: "Inwestycja we własny park maszynowy i uniezależnienie produkcji.",
    icon: Factory,
  },
  {
    year: "2022",
    event:
      "Rozbudowa zespołu do 30 osób i znaczące zwiększenie mocy realizacyjnych.",
    icon: Globe2,
  },
  {
    year: "2025",
    event:
      "Wdrożenie innowacyjnych technologii (druk 3D, automatyzacja) i ciągłe rozszerzanie kompetencji produkcyjnych.",
    icon: Leaf,
  },
];

// Mobile History Component
const MobileHistory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const stepVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 400,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut" as const,
        delay: 0.5,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 400,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="px-4 py-12 lg:py-44  xl:hidden" ref={ref}>
      {/* Mobile Static Header */}
      <div className="mb-16 text-center">
        <motion.h1
          className="font-michroma text-4xl font-bold text-white/20 md:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.05, delayChildren: 0.2 },
            },
          }}
        >
          {Array.from("HISTORIA").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
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
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Vertical Timeline */}
      <div className="relative mx-auto max-w-md">
        {/* Vertical Line */}
        <motion.div
          className="absolute top-0 left-8 h-full w-px origin-top bg-gradient-to-b from-stone-300 via-stone-400 to-stone-300"
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {historyEvents.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-start"
              variants={stepVariants}
            >
              {/* Animated Dot */}
              <motion.div
                className="relative z-10 flex h-16 w-16 items-center justify-center"
                variants={dotVariants}
              >
                <motion.div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-300 shadow-lg">
                  {React.createElement(item.icon, {
                    className: "h-6 w-6 text-stone-900",
                  })}
                </motion.div>
              </motion.div>

              {/* Step Content */}
              <motion.div className="ml-6 flex-1 py-1">
                <motion.h3 className="font-michroma text-base font-semibold text-stone-300">
                  {item.year}
                </motion.h3>

                {/* Full Description */}
                <motion.div className="opacity-60 transition-all duration-300">
                  <Card className="mt-3 border-stone-700 bg-stone-900/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      {React.createElement(item.icon, {
                        className: "h-5 w-5 text-stone-400",
                      })}
                      <span className="text-xs text-stone-400">Milestone</span>
                    </div>
                    <p className="text-sm leading-relaxed text-stone-300">
                      {item.event}
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Desktop History Component (existing)
const DesktopHistory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-55% 0px -55% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 2, ease: "easeOut" as const },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5 + index * 0.3,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    }),
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: (index: number) => ({
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5 + index * 0.3,
        ease: "backOut" as const,
      },
    }),
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5 + index * 0.3,
        ease: "backOut" as const,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative py-12 text-white md:py-24"
      id="history"
    >
      <StickyHeader
        className="top-0 -z-10 hidden xl:block"
        title="HISTORIA"
        delay={0.2}
      />
      <div className="container mx-auto px-4">
        <div className="relative z-10 mx-auto mt-8 max-w-6xl md:mt-16">
          <motion.div
            className="absolute top-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/30"
            variants={lineVariants}
            initial="hidden"
            animate={controls}
          />

          <div className="relative flex flex-col items-center">
            {historyEvents.map((item, index) => (
              <motion.div
                key={index}
                className="my-4 w-full md:my-8"
                initial="hidden"
                animate={controls}
                custom={index}
                variants={timelineItemVariants}
              >
                {/* Desktop Layout */}
                <div className="hidden w-full items-center justify-center md:flex">
                  {/* Center Timeline */}
                  <div className="relative">
                    <motion.div
                      className="absolute z-10 size-4 rounded-full border-2 border-white bg-black"
                      custom={index}
                      variants={dotVariants}
                    />
                    <motion.div
                      className="absolute -top-6 -left-6 z-20 rounded-full bg-black/50 p-2 backdrop-blur-sm"
                      custom={index}
                      variants={iconVariants}
                    >
                      {React.createElement(item.icon, {
                        className: "size-8 text-white",
                      })}
                    </motion.div>
                  </div>
                </div>

                {/* Desktop Event Text */}
                <div className="-mt-4 hidden w-full md:block">
                  <div
                    className={
                      index % 2 === 0
                        ? "w-1/2 pr-8 text-right"
                        : "ml-auto w-1/2 pl-8 text-left"
                    }
                  >
                    <Card>
                      <div
                        className={`${michroma.className} mb-2 text-2xl font-bold text-white`}
                      >
                        {item.year}
                      </div>
                      <p className="text-stone-300">{item.event}</p>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function History() {
  return (
    <>
      <DesktopHistory />
      <MobileHistory />
    </>
  );
}
