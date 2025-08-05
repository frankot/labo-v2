"use client";

import Image from "next/image";
import Card from "./card";
import { FadeInView, AnimatedText } from "../../anim";

interface HeaderDetailsProps {
  title: string;
  subtitle: string;
  description: string[];
  backgroundImage?: string;
  className?: string;
}

export default function HeaderDetails({
  title,
  subtitle,
  description,
  backgroundImage,
  className = "",
}: HeaderDetailsProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Background Image Section */}
      {backgroundImage && (
        <FadeInView className="relative h-[30vh] w-full">
          <Image
            src={backgroundImage}
            alt={`${title} - ${subtitle}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        </FadeInView>
      )}

      {/* Main Content */}
      <div className="relative w-full">
        {/* Title Section */}
        <FadeInView className="relative z-20 -mt-16">
          <div className="mx-auto mt-20 max-w-7xl lg:mt-8">
            <div className="mx-2 md:mx-0">
              <Card className="cursor-default">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
                  {/* Header - 1/3 width */}
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      <h2 className="font-michroma text-2xl font-bold text-white lg:text-3xl">
                        <AnimatedText text={title} delay={0.1} />
                      </h2>
                      <h3 className="font-michroma text-lg font-semibold text-stone-200 lg:text-xl">
                        <AnimatedText text={subtitle} delay={0.2} />
                      </h3>
                    </div>
                  </div>

                  {/* Paragraph - 2/3 width */}
                  <div className="lg:col-span-2">
                    <div className="space-y-4 text-lg leading-relaxed text-stone-300">
                      {description.map((paragraph, index) => (
                        <p key={index}>
                          <AnimatedText
                            text={paragraph}
                            delay={0.3 + index * 0.2}
                          />
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
