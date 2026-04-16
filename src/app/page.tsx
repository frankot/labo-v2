import type { Metadata } from "next";
import FrameLayout from "./components/grid-studies";
import Hero from "./components/_main/Hero";
import About from "./components/_main/About";
import Process from "./components/_main/Process";
import Services from "./components/_main/Services";
import Team from "./components/_main/Team";
import History from "./components/_main/History";
import Contact from "./components/_main/Contact";

export const metadata: Metadata = {
  title: "Labo Pracownia – Scenografia i elementy przestrzenne",
  description:
    "Jesteśmy zespołem projektowo-wykonawczym specjalizującym się w kompleksowej realizacji scenografii oraz elementów przestrzennych na potrzeby eventów, festiwali, targów, wystaw i produkcji multimedialnych.",
  openGraph: {
    title: "Labo Pracownia – Scenografia i elementy przestrzenne",
    description:
      "Od przeszło 20 lat wspieramy agencje eventowe, studia kreatywne, instytucje kultury i producentów wydarzeń, dostarczając przemyślane i dopracowane rozwiązania scenograficzne.",
  },
};

export default function Home() {
  return (
    <main className="h">
      <Hero />
      <div className="mt-20 h-[350px] w-full lg:mt-0 lg:h-screen">
        <FrameLayout />
      </div>
      <About />
      <Process />
      <Services />
      <Team />
      <History />
      <Contact />
    </main>
  );
}
