import { useEffect, useRef } from "react";
import gsap from "gsap";
import KnowUs from "./About";

const FastDiv = () => {
  const marqueeRef = useRef(null);

  const items = [
    "🥥 Made with coconut water",
    "🚫 No added sugar",
    "⚡ Fights fatigue",
    "💪 Boosts energy",
  ];

  useEffect(() => {
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 15, // Reduced from 20 for better performance
      ease: "none", // Changed from "linear" - more optimized
    });

    return () => tween.kill();
  }, []);

  return (
    <section
      data-scroll
      data-scroll-section
      data-scroll-speed=".1"
      data-scroll-offset="0%, -1000%"
      data-scroll-position="top"
      className="font-['Inter'] w-full bg-white text-black flex flex-col rounded-t-xl overflow-hidden"
    >
      <div className="w-full flex whitespace-nowrap py-10 sm:py-12 lg:py-14">
        <div
          ref={marqueeRef}
          className="flex font-extrabold tracking-tight leading-none uppercase will-change-transform 
                 text-[10vw] xl:text-[8vw] 2xl:text-[8vw]" // responsive text size
        >
          {/* First set */}
          <div className="flex gap-4 sm:gap-6 lg:gap-9">
            {items.map((text, i) => (
              <span key={i} className="inline-block">
                {text}
              </span>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-4 sm:gap-6 lg:gap-9">
            {items.map((text, i) => (
              <span key={`dup-${i}`} className="inline-block">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
      <KnowUs />
    </section>
  );
};

export default FastDiv;
