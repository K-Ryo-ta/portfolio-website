"use client";

import React from "react";
import { Suspense } from "react";
import WebDevModel from "./WebDev";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Ryota <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products and Brands
        </p>
      </div>
      <div className="w-full h-full mt-4">
        <Suspense fallback={null}>
          <WebDevModel />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;
