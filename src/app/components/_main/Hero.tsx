"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView } from "../../anim";

// Local stagger animation component
const StaggeredElement = ({
  children,
  delay = 0,
  staggerDelay = 0.02,
}: {
  children: React.ReactNode;
  delay?: number;
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
            delayChildren: delay,
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

const StaggeredDivider = ({ delay = 0 }: { delay?: number }) => (
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
    className="mx-4 text-gray-500 md:mx-6"
  >
    |
  </motion.span>
);

export default function Hero() {
  const services = ["Scenografia", "Produkcja", "Montaż", "Design"];

  return (
    <FadeInView className="flex min-h-[700px] w-full flex-col items-center justify-center px-8 text-white lg:h-[45rem]">
      {/* Centered Logo */}
      <div className="mb-12">
        <div className="relative size-[400px]">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
            quality={80}
          />
        </div>
      </div>

      {/* Main Heading */}
      {/* <StickyHeader
        title="Tworzymy przestrzenie, które działają"
        delay={0.2}
        className="z-10 mb-8 cursor-default pb-2 text-3xl leading-tight font-black tracking-normal text-gray-200 antialiased sm:text-5xl md:text-6xl lg:pb-12"
      /> */}

      {/* Horizontal Services List */}
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row md:gap-8">
        {services.map((text, index) => (
          <Link href="#services" key={text} className="flex items-center">
            <StaggeredElement delay={0.5 + index * 0.1} staggerDelay={0.02}>
              <span className="font-michroma text-lg font-light tracking-wider text-gray-300 uppercase transition-all duration-300 hover:text-white md:text-xl">
                {text.split("").map((char, charIndex) => (
                  <StaggeredChar key={charIndex} char={char} />
                ))}
              </span>
            </StaggeredElement>
            {index < 3 && <StaggeredDivider delay={0.5 + index * 0.1 + 0.3} />}
          </Link>
        ))}
      </div>
    </FadeInView>
  );
}
