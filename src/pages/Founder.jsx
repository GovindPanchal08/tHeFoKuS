import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { founders } from "../constants/Founder";
gsap.registerPlugin(ScrollTrigger);



const Founder = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".founder-card");
      const title = gsap.utils.toArray(".fokus-title");

      ScrollTrigger.saveStyles([cards, title]);

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isDesktop) {
        gsap.set(title, { y: 20, opacity: 0, stagger: 0.25 });
        gsap.set(cards, { y: 100, opacity: 0.9, scale: 0.9 });

        gsap.to(title, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });

        cards.forEach((card, i) => {
          gsap.to(card, {
            y: -20,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          // Subtle scroll animation (floating effect)
          gsap.to(card, {
            y: "-30px",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      } else if (isMobile) {
        gsap.set(title, { y: 30, opacity: 0 });
        gsap.to(title, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 40%",
            toggleActions: "play none none none",
          },
        });

        cards.forEach((card, i) => {
          gsap.set(card, { y: 80, opacity: 0, scale: 0 });
          gsap.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%", // Triggers just before card enters view
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Shared hover 
      cards.forEach((card) => {
        const image = card.querySelector("img");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.4,
            ease: "power2.out",
          });
          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [containerRef]);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      data-scroll-section
      className="w-full min-h-screen bg-[#0e0e0e] text-white px-4 md:px-8"
      ref={containerRef}
    >
      <div className="max-w-8xl py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky Title */}
          <div className="w-full lg:w-1/2 sticky top-10 self-start mb-20 lg:mb-0 md:mb-0">
            <div className="text-[20vw] uppercase md:text-6xl lg:text-[7vw] xl:text-[8vw] tracking-tighter leading-[4rem] md:leading-[5rem] lg:leading-[6.5rem] font-bold text-left">
              <h2 className="fokus-title">The</h2>
              <span className="fokus-title bg-gradient-to-r from-[#FF6262] via-[#D8FF50] to-[#FFEA58] text-transparent bg-clip-text">
                Fokus
              </span>
              <h2 className="fokus-title">Creators</h2>
            </div>
          </div>

          {/* Scrollable Cards */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {founders.map((f, i) => (
                <div
                  key={i}
                  className="founder-card"
                  data-scroll
                  data-scroll-speed={
                    window.innerWidth < 768
                      ? "0.2"
                      : i % 3 === 0
                      ? "0.7"
                      : "0.5"
                  }
                >
                  <div className="bg-[#1a1a1a] p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl hover:bg-[#222] transition-all duration-300">
                    <div className="aspect-[4/4] overflow-hidden rounded-xl">
                      <img
                        src={f.img}
                        alt={f.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {f.name}
                      </h3>
                      <p className="text-sm uppercase text-gray-400 font-medium">
                        {f.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
