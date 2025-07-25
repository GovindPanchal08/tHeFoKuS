import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const isMobile = window.innerWidth < 768;

  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  const videoSources = [
    "https://fokus.shop/cdn/shop/videos/c/vp/6708f49c599f4ac2aee0425489984893/6708f49c599f4ac2aee0425489984893.HD-1080p-7.2Mbps-40576182.mp4?v=0",
    "https://fokus.shop/cdn/shop/videos/c/vp/a251302aac5b451688f5f0b87b42a4d4/a251302aac5b451688f5f0b87b42a4d4.HD-1080p-7.2Mbps-40576179.mp4?v=0",
    "https://fokus.shop/cdn/shop/videos/c/vp/aa6a07e1f6d34273a122ff0431acc2ea/aa6a07e1f6d34273a122ff0431acc2ea.HD-1080p-7.2Mbps-40576178.mp4?v=0",
    "https://fokus.shop/cdn/shop/videos/c/vp/93a35682c8d941289261f9ca448d250b/93a35682c8d941289261f9ca448d250b.HD-1080p-7.2Mbps-40573050.mp4?v=0",
    "https://fokus.shop/cdn/shop/videos/c/vp/8b5da6ff7a98480796f9362ac0edf983/8b5da6ff7a98480796f9362ac0edf983.HD-1080p-7.2Mbps-40576173.mp4?v=0",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const videoElements =
        containerRef.current.querySelectorAll(".video-item");

      gsap.set(videoElements, {
        y: 100,
        opacity: 0,
      });

      gsap.to(videoElements, {
        y: 0,
        opacity: 1,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="w-full lg:min-h-screen relative bg-black px-4 py-10 lg:px-[5rem] lg:py-10 -z-10">
      <div
        {...(!isMobile && {
          "data-scroll": true,
          "data-scroll-section": true,
          "data-scroll-speed": "-0.3",
        })}
        ref={containerRef}
        className="w-full h-full flex"
      >
        {videoSources.map((src, index) => (
          <div
            key={index}
            className={`video-item
          w-[80%] sm:w-[40%] md:w-[30%] lg:w-[19vw]
          aspect-auto overflow-hidden
          ${index === 0 ? "rounded-l-2xl" : ""}
          ${index === videoSources.length - 1 ? "rounded-r-2xl" : ""}
          ${index > 2 ? "hidden lg:block" : ""}
          ${
            index === videoSources.length - 3
              ? "rounded-r-2xl lg:rounded-r-md"
              : ""
          }
        `}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
              playsInline
              src={src}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Video;
