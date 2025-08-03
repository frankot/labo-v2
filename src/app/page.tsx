import FrameLayout from "./components/grid-studies";
import Hero from "./components/_main/Hero";
import About from "./components/_main/About";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <div className="mt-20 w-full lg:mt-0 lg:h-screen">
        <FrameLayout />
      </div>
      <About />
    </main>
  );
}
