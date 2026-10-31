import React from "react";

const Landing = () => {
  return (
    <section
      id="about"
      className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-5 pt-20"
    >
      <h1 className="text-center text-[clamp(2.25rem,12vw,5rem)] font-bold leading-[1.1]">
        <span className="block">Creative</span>
        <span className="block">Developer</span>
        <span className="block">Designer</span>
      </h1>
    </section>
  );
};

export default Landing;
