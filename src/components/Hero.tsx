
import React from "react";

const Hero = () => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-block mb-3 md:mb-4 opacity-0 animate-fade-in">
        <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-nature-100 text-nature-600 text-2xl md:text-3xl">
          ♻️
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-nature-800 mb-4 opacity-0 animate-fade-in animation-delay-100">
        Recycle Buddy
      </h1>
      <p className="text-lg md:text-xl text-nature-600 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200">
        Enter an item you don't use anymore, and we'll suggest ways to recycle or repurpose it.
      </p>
    </div>
  );
};

export default Hero;
