"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FadeInView from "./components/in-view-anim/FadeInView";

export default function Hero() {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);

  return (
    <FadeInView className="flex lg:h-screen min-h-[700px] w-full flex-col items-center justify-center px-8 text-white">
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
      <h1 className="font-michroma mb-8 cursor-default pb-2 text-center text-3xl sm:text-5xl leading-tight font-black tracking-tighter antialiased md:text-6xl">
        {"Tworzymy przestrzenie, które działają"
          .split(" ")
          .map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word.split("").map((char, charIndex) => (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  className={`relative z-10 inline-block bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent transition-transform duration-500 ease-out ${
                    hoveredChar === wordIndex * 100 + charIndex ? "-translate-y-[3px]" : ""
                  }`}
                  onMouseEnter={() => setHoveredChar(wordIndex * 100 + charIndex)}
                  onMouseLeave={() => setHoveredChar(null)}
                >
                  {char}
                </span>
              ))}
              {wordIndex < "Tworzymy przestrzenie, które działają".split(" ").length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
      </h1>

      {/* Horizontal Services List */}
      <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
        {["Scenografia", "Produkcja", "Montaż", "Design"].map((text, index) => (
          <Link href="#services" key={text} className="flex items-center">
            <span className="font-michroma text-lg font-light tracking-wider text-gray-300 uppercase transition-all duration-300 hover:text-white md:text-xl">
              {text}
            </span>
            {index < 3 && <span className="mx-4 text-gray-500 md:mx-6">|</span>}
          </Link>
        ))}
      </div>
    </FadeInView>
  );
}
