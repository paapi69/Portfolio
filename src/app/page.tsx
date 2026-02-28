"use client";

import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RobotMascot from "@/components/RobotMascot";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
      <RobotMascot />
    </LenisProvider>
  );
}
