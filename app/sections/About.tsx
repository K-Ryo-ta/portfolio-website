"use client";
import React from "react";
import { useState } from "react";

const About = () => {
  const [hasGithubCopied, setHasGithubCopied] = useState(false);
  const [hasXCopied, setHasXCopied] = useState(false);
  const [hasQiitaCopied, setHasQiitaCopied] = useState(false);

  const handleGithubCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasGithubCopied(true);

    setTimeout(() => {
      setHasGithubCopied(false);
    }, 2000);
  };

  const handleXCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasXCopied(true);

    setTimeout(() => {
      setHasXCopied(false);
    }, 2000);
  };

  const handleQiitaCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasQiitaCopied(true);

    setTimeout(() => {
      setHasQiitaCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space" id="about">
      <div className="grid xl:grid-rows-2 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="/assets/kawaiimango.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Hi, I'm Ryota</p>
              <p className="grid-subtext">
                With 2 years of experience, I have my skills in web frontend
                development
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="/assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 md:row-span-3">
          <div className="grid-container">
            <div className="space-y-2">
              <p className="grid-headtext text-center">Copy Links</p>
              <div
                className="copy-container"
                onClick={(e) => handleGithubCopy("https://github.com/K-Ryo-ta")}
              >
                <img
                  src={hasGithubCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  https://github.com/K-Ryo-ta
                </p>
              </div>
              <div
                className="copy-container"
                onClick={(e) => handleXCopy("https://x.com/KR_programing")}
              >
                <img
                  src={hasXCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  https://x.com/KR_programing
                </p>
              </div>
              <div
                className="copy-container"
                onClick={(e) =>
                  handleQiitaCopy("https://qiita.com/Ryota_programing")
                }
              >
                <img
                  src={hasQiitaCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  https://qiita.com/Ryota_programing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
