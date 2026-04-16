"use client";

import { motion } from "framer-motion";
import { FadeInView } from "../../anim";

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

export default function HeroAnimations() {
  const services = ["Scenografia", "Produkcja", "Montaż", "Design"];

  return (
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
  );
}
