import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KnowUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate paragraphs
      gsap.from(".animate-p", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 20%",
          scrub: 1,
        },
        y: 10,
        opacity: 0.1,
        filter: "blur(8px)",
        stagger: 0.25,
        ease: "power3.out",
      });

      // Animate title
      gsap.from(".title > *", {
        scrollTrigger: {
          trigger: ".title",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.25,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const content = [
    {
      text: "Fokus is a clean hydration brand built by Abhishek & Nischay Malhan for creators, dreamers, and doers.",
      highlights: ["Fokus", "Abhishek & Nischay Malhan"],
    },
    {
      text: "It's powered with Vitamin D3, 22% Coconut Water, and No Sugar — pure energy with zero crash.",
      highlights: ["Vitamin D3", "22% Coconut Water", "No Sugar"],
    },
    {
      text: "Designed to stand out, each bottle is bold, vibrant, and 100% recyclable.",
      highlights: ["bold, vibrant, and 100% recyclable"],
    },
    {
      text: "#GetFokus is more than a hashtag — it's a movement of focused minds shaping the future.",
      highlights: ["#GetFokus"],
    },
    {
      text: "Fokus isn't just a drink — it's a lifestyle you live every day.",
      highlights: [],
      className: "font-semibold text-neutral-900",
    },
  ];

  const highlightText = (text, highlights) => {
    if (!highlights.length) return text;

    let result = text;
    highlights.forEach((highlight) => {
      result = result.replace(
        new RegExp(`(${highlight})`, "gi"),
        "<strong>$1</strong>"
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#95DA4A]  w-full font-['Inter'] text-white rounded-t-xl px-4 sm:px-4 lg:px-5 z-20"
    >
      {/* Title */}
      <div className="title text-[14vw] sm:text-[8vw] lg:text-[7vw] xl:text-[8vw] py-7 sm:py-10 font-extrabold leading-[0.8] tracking-tighter">
        <span className="block">KNOW FOKUS,</span>
        <span className="text-[#ffd728]">KNOW US</span>
      </div>

      {/* Content */}
      <div className="text-base sm:text-lg md:text-[2.2vw] lg:text-[4vw] xl:text-[3vw] font-normal tracking-tight leading-snug text-neutral-800 max-w-4xl lg:max-w-full mx-auto lg:mx-0 space-y-4">
        {content.map((item, index) => (
          <p key={index} className={`animate-p ${item.className || ""}`}>
            {highlightText(item.text, item.highlights)}
          </p>
        ))}
      </div>
    </section>
  );
};

export default KnowUs;
