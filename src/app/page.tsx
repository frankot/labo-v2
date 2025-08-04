import FrameLayout from "./components/grid-studies";
import Hero from "./components/_main/Hero";
import About from "./components/_main/About";
import Process from "./components/_main/Process";
import Services from "./components/_main/Services";
import Team from "./components/_main/Team";
import History from "./components/_main/History";
import Contact from "./components/_main/Contact";

export default function Home() {
  return (
    <div className="hidden lg:block">
      <Hero />
      <div className="mt-20 w-full lg:mt-0 lg:h-screen">
        <FrameLayout />
      </div>
      <About />
      <Process />
      <Services />
      <Team />
      <History />
      <Contact />
    </div>
  );
}
