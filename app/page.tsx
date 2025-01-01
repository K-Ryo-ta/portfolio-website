import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
