"use client";

import Image from "next/image";
import Link from "next/link";
import { Wrench } from "lucide-react";
import StickyHeader from "../ui/sticky-header";
import Card from "../ui/card";
import { AnimatedText, FadeInView } from "../../anim";
import Stats from "./Stats";
import { aboutData } from "../../../lib/about-data";

export default function About() {
  return (
    <div id="about" className="relative">
      {/* Hero Image Section */}
      <FadeInView className="relative h-[60vh] w-full">
        <Image
          src={aboutData.heroImage.src}
          alt={aboutData.heroImage.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </FadeInView>

      {/* Main Content */}
      <div className="relative container mx-auto w-full">
        <StickyHeader
          className="-mt-32 px-2 text-[4rem] sm:text-[5rem] md:ml-0 md:px-0 md:text-[7rem] lg:-mt-[12rem] lg:pt-6 lg:text-[8rem] xl:pt-0"
          title={aboutData.title}
          delay={0.2}
        />

        {/* Title Section */}
        <FadeInView className="relative z-20 -mt-20">
          {/* Content Layout */}
          <div className="mx-auto mt-24 max-w-7xl px-2 sm:px-4 md:px-6 lg:mt-10">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {/* Main Content Card - 2/3 width */}
              <div className="lg:col-span-2">
                <Card className="cursor-default">
                  <div className="space-y-8 text-lg leading-relaxed text-stone-300">
                    {aboutData.mainContent.paragraphs.map(
                      (paragraph, index) => (
                        <p key={index}>
                          <AnimatedText
                            text={paragraph}
                            delay={0.1 + index * 0.2}
                          />
                        </p>
                      ),
                    )}
                  </div>
                </Card>
              </div>

              {/* Side Content - 1/3 width */}
              <Card className="relative h-fit cursor-default space-y-6 overflow-hidden text-stone-300">
                {/* Background Wrench Icon */}
                <div className="pointer-events-none absolute -top-4 -right-8 opacity-10">
                  <Wrench size={320} className="rotate-12 group-hover:rotate-6 duration-300  text-stone-400" />
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-lg font-michroma font-bold text-stone-200">
                    {aboutData.sideContent.title}
                  </h3>
                  {aboutData.sideContent.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-relaxed text-stone-400"
                    >
                      <AnimatedText
                        text={paragraph}
                        delay={0.4 + index * 0.1}
                      />
                    </p>
                  ))}
                  <Link
                    href={aboutData.sideContent.cta.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-200 transition-colors duration-200 hover:underline underline-offset-4 underline-white"
                  >
                    {aboutData.sideContent.cta.text} →
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </FadeInView>

        {/* Stats Section */}
        <Stats />
      </div>
    </div>
  );
}
