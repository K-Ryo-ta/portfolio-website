"use client";

import React from "react";
import { Suspense } from "react";
import EarthModel from "../components/EarthModel";
import { Leva } from "leva";

const Hero = () => {
  return (
    <section
      className="sm:h-[90vh] h-full max-h-[750px] w-full flex flex-col relative"
      id="home"
    >
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Ryota <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Web Frontend Developer</p>
      </div>
      <div className="w-full h-full mt-4">
        <Suspense fallback={null}>
          <EarthModel />
          <Leva collapsed={false} oneLineLabels={true} />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;
