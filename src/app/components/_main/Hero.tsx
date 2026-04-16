"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInView } from "../../anim";

// Local stagger animation component
const StaggeredElement = ({
  children,
  staggerDelay = 0.02,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
}) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.span>
  );
};

const StaggeredChar = ({ char }: { char: string }) => (
  <motion.span
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
);

const StaggeredDivider = () => (
  <motion.span
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
    className="mx-4 hidden text-gray-500 md:mx-6 md:block"
  >
    |
  </motion.span>
);

export default function Hero() {
  const services = ["Scenografia", "Produkcja", "Montaż", "Design"];

  return (
    <div className="mt-12 flex h-[80vh] w-full flex-col items-center justify-center px-8 text-white lg:mt-0 lg:h-[45rem]">
      {/* Centered Logo — outside FadeInView so it paints immediately for LCP */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="LABO"
            width={400}
            height={400}
            sizes="(max-width: 1024px) 280px, 400px"
            className="h-[280px] w-[280px] object-contain lg:h-[400px] lg:w-[400px]"
            priority
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Horizontal Services List — animations preserved */}
      <FadeInView className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row md:gap-8">
        {services.map((text, index) => (
          <div key={text} className="flex cursor-pointer items-center">
            <StaggeredElement staggerDelay={0.02}>
              <span className="font-michroma font-light tracking-wider text-gray-300 uppercase transition-all duration-300 hover:text-white md:text-lg lg:text-xl">
                {text.split("").map((char, charIndex) => (
                  <StaggeredChar key={charIndex} char={char} />
                ))}
              </span>
            </StaggeredElement>
            {index < 3 && <StaggeredDivider />}
          </div>
        ))}
      </FadeInView>
    </div>
  );
}
