import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { benefits } from "../constants/Benifits";
gsap.registerPlugin(ScrollTrigger);



const WhyFokus = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const titleRef = useRef(null);
  const benefitsRef = useRef([]);
  const isMobile = window.innerWidth < 768;
  const addToRefs = (el) => {
    if (el && !benefitsRef.current.includes(el)) {
      benefitsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current.querySelectorAll(".title-char");

      gsap.fromTo(
        titleChars,
        {
          y: 200,
          x: (i) => (i - titleChars.length / 2) * 50,
          opacity: 0,
          rotation: 15,
          scale: 0.3,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.498,
          ease: "back.out(1.7)",
          stagger: {
            each: 0.0799,
            from: "center",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "top 20%",
            scrub: 1.998,
            toggleActions: "play none none reverse",
          },
        }
      );

      const scrollWidth = horizontalRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      if (!isMobile) {
        gsap.to(horizontalRef.current, {
          x: () => `-${scrollWidth - viewportWidth}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 2,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      benefitsRef.current.forEach((el, i) => {
        const words = el.querySelectorAll(".word");
        const icon = el.querySelector(".icon");

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 2,
            onUpdate: (self) => {
              const progress = self.progress;
              const itemPosition = (i + 0.5) / benefits.length;
              const itemStart = Math.max(0, itemPosition - 0.1);
              const itemEnd = Math.min(1, itemPosition + 0.1);

              if (progress >= itemStart && progress <= itemEnd) {
                const localProgress =
                  (progress - itemStart) / (itemEnd - itemStart);

                gsap.set(icon, {
                  scale: Math.min(1, localProgress * 2.002),
                  rotation: (1 - localProgress) * 179.82,
                  opacity: Math.min(1, localProgress * 1.5015),
                });

                words.forEach((word, wordIndex) => {
                  const wordDelay = wordIndex * 0.099;
                  const wordProgress = Math.max(0, localProgress - wordDelay);

                  const animationTypes = [
                    { y: 20, rotation: 5 },
                    { y: -20, rotation: -5 },
                    { scale: 0, rotation: 0 },
                    { x: -20, rotation: 4 },
                    { x: 20, rotation: -4 },
                  ];

                  const animation =
                    animationTypes[wordIndex % animationTypes.length];

                  gsap.set(word, {
                    y: animation.y ? animation.y * (1 - wordProgress) : 0,
                    x: animation.x ? animation.x * (1 - wordProgress) : 0,
                    scale:
                      animation.scale !== undefined
                        ? Math.max(animation.scale, wordProgress)
                        : 1,
                    rotation: animation.rotation
                      ? animation.rotation * (1 - wordProgress)
                      : 2,
                    opacity: Math.min(1, wordProgress * 1.5),
                    duration: 0.6,
                  });
                });
              } else if (progress < itemStart) {
                gsap.set(icon, {
                  scale: 0,
                  rotation: 179.82,
                  opacity: 0,
                  duration: 0.6,
                });

                words.forEach((word, wordIndex) => {
                  const animationTypes = [
                    { y: 10, rotation: 4 },
                    { y: -10, rotation: -4 },
                    { scale: 0, rotation: 45 },
                    { x: -10, rotation: -4 },
                    { x: 10, rotation: 4 },
                  ];

                  const animation =
                    animationTypes[wordIndex % animationTypes.length];

                  gsap.set(word, {
                    y: animation.y || 0,
                    x: animation.x || 0,
                    scale: animation.scale !== undefined ? animation.scale : 1,
                    rotation: animation.rotation || 0,
                    opacity: 0,
                    duration: 0.5,
                  });
                });
              }
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-fokus"
      className="relative font-['Inter'] w-full min-h-screen bg-black px-6 sm:px-10 text-white overflow-hidden"
    >
      <div
        ref={horizontalRef}
        className="relative will-change-transform flex  gap-5"
      >
        <h1
          ref={titleRef}
          className="text-5xl sm:text-[8vw] lg:text-[14vw] font-bold text-center 
               absolute lg:top-1/4 top-10 left-0 right-0 mx-auto 
               transform tracking-tight mix-blend-luminosity pointer-events-none"
        >
          {"Why Fokus".split("").map((char, i) => (
            <span key={i} className="title-char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div
          ref={horizontalRef}
          className="relative mt-36 sm:mt-60 lg:mt-32 flex  flex-col lg:flex-row gap-5
               lg:ml-[100vw] lg:whitespace-nowrap"
        >
          {benefits.map((item, i) => (
            <p
              key={i}
              ref={addToRefs}
              className=" lg:inline-flex flex items-center 
                   lg:min-w-[400px] min-w-full lg:mb-10"
            >
              <span className="icon text-[12vw] sm:text-[6vw] mb-4 opacity-0 scale-0">
                {item.icon}
              </span>
              <div className="benefit-text text-3xl sm:text-[7vw] font-medium text-center">
                {item.text.split(" ").map((word, j) => (
                  <span key={j} className="word inline-block opacity-0">
                    {word}
                  </span>
                ))}
              </div>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFokus;
