import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Nav from "../components/Nav";
import Controls from "../components/ActionBtn/Controls";
import { products } from "../constants/Products";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const imageWrapper1 = useRef(null);
  const imageWrapper2 = useRef(null);

  const handleNext = () => {
    animateExit(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    });
  };
  const handlePrev = () => {
    animateExit(() => {
      setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    });
  };

  const animateExit = (onComplete) => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(textRef.current, {
      x: -3000,
      opacity: 1,
      duration: 1,
      ease: "power1.in",
    });
    tl.to(
      imageRef.current,
      {
        x: 0,
        opacity: 0,
        scale: 0.1,
        duration: 0.35,
        rotation: "-360deg",
        stagger: 0.25,
        ease: "power1.in",
      },
      "img"
    ).to(
      imageRef2.current,
      {
        y: 0,
        opacity: 0,
        scale: 0.1,
        duration: 0.35,
        rotation: "360deg",
        stagger: 0.25,
        ease: "power1.in",
      },
      "img"
    );
  };

  useEffect(() => {
    if (!textRef.current || !imageRef.current || !imageRef2.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        textRef.current,
        { x: 1500, opacity: 0 },
        { x: -80, opacity: 1, duration: 1.5, ease: "power3.out" }
      )
        .fromTo(
          imageRef.current,
          {
            x: 1000,
            opacity: 0,
            scale: 0.95,
            rotation: "-360deg",
          },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "bounce.out",
            rotation: "0deg",
          },
          "im"
        )
        .fromTo(
          imageRef2.current,
          { x: -1000, opacity: 0, scale: 0.95, rotation: "360deg" },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "bounce.out",
            rotation: "0deg",
          },
          "im"
        );
    });

    return () => ctx.revert(); // Clean up on unmount/re-render
  }, [currentIndex]);

  //Cursor
  useEffect(() => {
    const container = document.querySelector(".imageContainer");
    const moveCursor = (e) => {
      cursorRef.current.style.display = "flex";
      gsap.to(cursorRef.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const enter = () => {
      cursorRef.current.innerHTML = "Buy Now";
      gsap.to(cursorRef.current, { scale: 2 });
    };

    const leave = () => {
      cursorRef.current.innerHTML = "";
      gsap.to(cursorRef.current, { scale: 0 });
    };

    container?.addEventListener("mousemove", moveCursor);
    imageWrapper1.current?.addEventListener("mouseenter", enter);
    imageWrapper1.current?.addEventListener("mouseleave", leave);
    imageWrapper2.current?.addEventListener("mouseenter", enter);
    imageWrapper2.current?.addEventListener("mouseleave", leave);

    return () => {
      container?.removeEventListener("mousemove", moveCursor);
      imageWrapper1.current?.removeEventListener("mouseenter", enter);
      imageWrapper1.current?.removeEventListener("mouseleave", leave);
      imageWrapper2.current?.removeEventListener("mouseenter", enter);
      imageWrapper2.current?.removeEventListener("mouseleave", leave);
    };
  }, []);
  //  hover
  useEffect(() => {
    const chars = document.querySelectorAll(".char");
    const radius = 350;
    let animationFrameId = null;

    const getMixedGradient = () => {
      return "linear-gradient(90deg, #FF9068, #FFA500, #56CC9D)";
    };

    const update = (e) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          const dist = Math.hypot(e.clientX - x, e.clientY - y);
          const proximity = Math.max(0, 1 - dist / radius); // range: 0–1

          const weight = 400 + proximity * 500;
          const blur = (1 - proximity) * 4;
          const scale = 1 + proximity * 0.15;

          if (proximity > 0.6) {
            gsap.to(char, {
              fontVariationSettings: `'wght' ${weight}, 'opsz' 9`,
              fontSize: `${1 + proximity * 0.05}em`,
              scale,
              filter: `blur(${blur}px)`,
              backgroundImage: getMixedGradient(),
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
          } else {
            gsap.to(char, {
              fontVariationSettings: `'wght' 400, 'opsz' 9`,
              fontSize: `1em`,
              scale: 1,
              filter: "blur(0px)",
              backgroundImage: "none",
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
          }
        });
      });
    };

    const textEl = textRef.current;
    textEl?.addEventListener("mousemove", update);

    return () => {
      textEl?.removeEventListener("mousemove", update);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      data-scroll
      data-scroll-section
      data-scroll-speed="-.4"
      className="w-full min-h-screen overflow-hidden"
      style={{ background: products[currentIndex].gradient }}
      ref={containerRef}
    >
      <Nav classname={products[currentIndex].gradient} />

      <div
        ref={cursorRef}
        className="fixed left-0 hidden top-0 z-30  items-center justify-center w-12 h-12 text-xs bg-black text-white rounded-full pointer-events-none"
      >
        <p>Buy Now</p>
      </div>

      <div className="flex-1 flex items-center justify-center lg:justify-self-start md:justify-self-start  gap-8 pt-16 lg:pl-10">
        <div className="flex flex-col items-center lg:items-start md:items-start justify-center gap-4 text-center lg:text-left md:text-left px-4 sm:px-1">
          <h1
            ref={textRef}
            className="text-[19vw]  lg:mt-10 ml-[10rem]  md:ml-10 lg:ml-2 md:text-[15vw] lg:text-[16vw]  font-bold leading-none md:whitespace-nowrap lg:whitespace-nowrap tracking-tighter select-none z-20"
          >
            {products[currentIndex].name.split("").map((char, i) => (
              <span key={i} className="char">
                {char}
              </span>
            ))}
          </h1>

          <p className="block mt-28 text-xs lg:text-sm md:text-sm font-medium max-w-xs lg:mt-10 text-center md:text-start lg:text-start">
            {products[currentIndex].details}
          </p>

          <button
            onClick={() => navigate("/product")}
            className="lg:hidden md:hidden font-medium shadow-md shadow-white/25 w-fit px-5 py-2 text-white bg-black rounded-full mt-4 transition-all duration-300 hover:blur-sm hover:scale-105"
          >
            Explore Products
          </button>

          <div className=" lg:mt-6  absolute bottom-6 left-10 ">
            <h3 className="font-medium flex flex-col lg:flex-row items-center justify-center ">
              <span
                style={{ color: products[currentIndex].color }}
                className="text-2xl lg:text-3xl mb-2 lg:mb-0 font-extrabold shadow-md rounded-3xl px-3 py-1 shadow-black/50"
              >
                Stay Fokus
              </span>
              <span className="text-lg lg:ml-2 hidden lg:inline-block">
                Stay Active, Stay Hydrated
              </span>
            </h3>
          </div>
        </div>

        <div
          onClick={() => navigate("/product")}
          className="imageContainer select-none  lg:static md:static absolute top-1/5 left-1/6"
        >
          <div
            ref={imageRef}
            className={`${products[currentIndex].classname1}  w-[85vw]  absolute  lg:left-0 md:w-1/3 lg:w-1/3 perspective-1000`}
          >
            <img
              ref={imageWrapper1}
              src={products[currentIndex].image}
              alt="Product 1"
              style={{ transformStyle: "preserve-3d" }}
              className="w-[90%] object-cover -rotate-6 drop-shadow-2xl animate-float"
            />
          </div>
          <div
            ref={imageRef2}
            className={`${products[currentIndex].classname2}  w-[85vw] left-[2rem] absolute md:w-1/3 lg:left-0 lg:w-1/3 z-10`}
          >
            <img
              ref={imageWrapper2}
              src={products[currentIndex].image}
              alt="Product 2"
              className="w-[90%] object-contain rotate-6 drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
      <Controls handleNext={handleNext} handlePrev={handlePrev} />
    </section>
  );
};

export default Hero;
