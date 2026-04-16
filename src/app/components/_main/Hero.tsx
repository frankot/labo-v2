import Image from "next/image";
import HeroAnimations from "./HeroAnimations";

export default function Hero() {
  return (
    <div className="mt-12 flex h-[80vh] w-full flex-col items-center justify-center px-8 text-white lg:mt-0 lg:h-[45rem]">
      {/* Logo rendered server-side — in the initial HTML for fast LCP */}
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

      {/* Animated services text — client component, loads independently */}
      <HeroAnimations />
    </div>
  );
}
