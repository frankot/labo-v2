"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeInView } from "../../anim";
import StickyHeader from "../ui/sticky-header";

export default function Hero() {
  return (
    <FadeInView className="flex min-h-[700px] w-full flex-col items-center justify-center px-8 text-white lg:h-screen">
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
      <StickyHeader
        title="Tworzymy przestrzenie, które działają"
        delay={0.2}
        className="z-10 mb-8 cursor-default pb-2 text-3xl leading-tight font-black tracking-normal text-gray-200 antialiased sm:text-5xl md:text-6xl lg:pb-12"
      />

      {/* Horizontal Services List */}
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row md:gap-8">
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
