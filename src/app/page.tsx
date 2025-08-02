import OptimizedFrameLayout from "./components/optimized-grid";
import Hero from "./Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="w-full mt-20 lg:mt-0 lg:h-screen">
        <OptimizedFrameLayout />
      </div>
    </main>
  );
}
