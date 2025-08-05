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

// Desktop Timeline Component
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
      className="relative mx-auto mb-24 hidden overflow-x-auto py-44 lg:block"
      ref={ref}
    >
      {/* Background Text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.h1
          className="font-michroma -ml-2 text-[15rem] font-bold text-white/15"
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

// Mobile Process Component
const MobileProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <div className="px-2 py-12 md:px-0 lg:hidden" ref={ref}>
      {/* Mobile Sticky Header */}
      <StickyHeader
        className="font-bol top-0 z-0 text-left text-[4rem] text-white/20 lg:-mt-[12rem] lg:text-[5rem] xl:text-[12rem]"
        title="PROCES"
        delay={0.2}
      />

      {/* Horizontal Scrollable Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
      >
        {processSteps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={cardVariants}
            className="w-80 flex-shrink-0 snap-start"
          >
            <Card className="h-full p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="font-michroma flex h-12 w-12 items-center justify-center rounded-full bg-stone-300 font-bold text-stone-900">
                  {index + 1}
                </div>
                <h3 className="font-michroma text-xl font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <motion.hr
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="my-4 h-px border-stone-200"
              />
              <p className="leading-relaxed text-stone-300">
                {step.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
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
