"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Card from "@/app/components/ui/card";
import StickyHeader from "../ui/sticky-header";

interface ProcessStep {
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Zapytanie",
    description:
      "Rozpocznij swoją podróż od złożenia zapytania ofertowego. Opisz swoje potrzeby i oczekiwania.",
  },
  {
    title: "Konsultacje",
    description:
      "Nasi Project Managerowie dokładnie analizują Twoje potrzeby i proponują optymalne rozwiązania.",
  },
  {
    title: "Kosztorys",
    description:
      "Przygotowujemy szczegółową wycenę uwzględniającą wszystkie aspekty projektu.",
  },
  {
    title: "Wizualizacje",
    description:
      "Tworzymy dokładne wizualizacje projektu, pomagające zobaczyć efekt końcowy.",
  },
  {
    title: "Poprawki",
    description:
      "Wprowadzamy niezbędne modyfikacje zgodnie z Twoimi uwagami i sugestiami.",
  },
  {
    title: "Produkcja",
    description:
      "Rozpoczynamy proces produkcji z najwyższą dbałością o jakość i detale.",
  },
  {
    title: "Montaż",
    description:
      "Profesjonalny zespół montażowy realizuje instalację na miejscu.",
  },
  {
    title: "Demontaż",
    description:
      "W razie potrzeby, zapewniamy również profesjonalny demontaż i utylizację.",
  },
];

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
        viewport={{ once: true, margin: "-25%" }}
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
  return null;
};

// Desktop Timeline Component (unchanged)
const DesktopProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "55% 0px 55% 0px",
  });
  const controls = useAnimation();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div
      className="relative mx-auto mb-24 hidden overflow-x-auto py-44 xl:block"
      ref={ref}
    >
      {/* Background Text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.h1
          className="font-michroma -ml-2 font-bold text-white/15 lg:text-[10rem] xl:text-[13rem]"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          <AnimatedText text="PROCES" isTitle={true} delay={0.2} />
        </motion.h1>
      </div>

      {/* Timeline line */}
      <div className="absolute top-1/2 right-0 left-0 h-px w-full -translate-y-1/2">
        <svg width="100%" height="2" className="absolute top-0 left-0">
          <motion.line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="rgb(231 229 228)"
            strokeWidth="2"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </svg>
      </div>

      <div className="relative mx-auto min-w-[1200px] px-4">
        <motion.div
          className="flex justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            const number = index + 1;
            const isHovered = hoveredStep === index;

            return (
              <motion.div
                key={step.title}
                className={`group relative flex w-32 flex-col items-center ${
                  isEven ? "flex-col" : "flex-col-reverse"
                } cursor-pointer`}
                variants={itemVariants}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Dot on the line */}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-300 transition-all duration-300 group-hover:bg-stone-100 hover:scale-150"
                  animate={{
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered
                      ? "rgb(245 245 244)"
                      : "rgb(214 211 209)",
                  }}
                />

                {/* Step Card */}
                <motion.div
                  className={`flex min-h-[120px] w-full flex-col items-center justify-center gap-4 rounded-md p-3 transition-all duration-300 ${
                    isEven ? "mb-36" : "mt-36"
                  }`}
                >
                  <div className="font-michroma text-4xl text-stone-300">
                    {number}
                  </div>
                  <h3 className="font-michroma text-center text-sm font-semibold text-stone-200">
                    {step.title}
                  </h3>
                </motion.div>

                {/* Expanded Description */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className={`absolute bottom-full z-20 w-80 ${
                        index === 0 ? "translate-x-[40%]" : ""
                      } ${
                        index === processSteps.length - 1
                          ? "-translate-x-[40%]"
                          : ""
                      }`}
                    >
                      <Card className="p-6 pt-4">
                        <h4 className="font-michroma mb-2 text-sm font-semibold text-white">
                          {index + 1}. {step.title}
                        </h4>
                        <motion.hr
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="my-2 mt-3 h-px border-stone-200"
                        />
                        <p className="text-sm text-stone-300">
                          {step.description}
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

// NEW Mobile Process Component - Vertical Timeline
const MobileProcess = () => {
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
    <div className="px-4 py-12 lg:py-44 xl:hidden" ref={ref}>
      {/* Mobile Header */}
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
          <AnimatedText text="PROCES" isTitle={true} delay={0.2} />
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
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative flex items-start"
              variants={stepVariants}
            >
              {/* Animated Dot */}
              <motion.div
                className="relative z-10 flex h-16 w-16 items-center justify-center"
                variants={dotVariants}
              >
                <motion.div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-300 shadow-lg">
                  <span className="font-michroma text-lg font-bold text-stone-900">
                    {index + 1}
                  </span>
                </motion.div>
              </motion.div>

              {/* Step Content */}
              <motion.div className="ml-6 flex-1 py-1">
                <motion.h3 className="font-michroma text-base font-semibold text-stone-300">
                  {step.title}
                </motion.h3>

                {/* Full Description */}
                <motion.div className="opacity-60 transition-all duration-300">
                  <Card className="mt-3 border-stone-700 bg-stone-900/50 p-4">
                    <p className="text-sm leading-relaxed text-stone-300">
                      {step.description}
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

export default function Process() {
  return (
    <>
      <DesktopProcess />
      <MobileProcess />
    </>
  );
}
