import SplitType from "split-type";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import { testimonials } from "../constants/Testimonals";

const Comment = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const splitText = new SplitType(".head", {
      types: "words",
      wordClass: "word-animate",
    });

    gsap.set(".word-animate", {
      y: 40,
      opacity: 0,
      rotationX: "-15deg",
      transformOrigin: "center bottom",
    });
    gsap.to(".word-animate", {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.9,
      stagger: {
        amount: 0.3, // Total time for all staggers
        from: "end", // Start from first word
        ease: "power3.out",
      },
      ease: "back.out(1,0.3)",
      scrollTrigger: {
        trigger: ".head",
        start: "top 55%",
        end: "bottom 20%",
      },
    });
    return () => {
      if (splitText) splitText.revert();
    };
  }, []);
  return (
    <section className="w-full font-['Inter'] bg-[#F5F5DC] py-16 px-4 md:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="head text-[13vw] md:text-[6vw] lg:text-[8vw] xl:text-[8vw] font-extrabold text-black tracking-tight leading-tight lg:leading-[7rem] mb-10">
          WHAT YOUR FAVOURITES SAY
        </h2>

        <div className="relative text-sm sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10 px-2 sm:px-0">
          <span className="text-4xl absolute left-2 lg:-left-4 top-0  text-black">
            “
          </span>
          {activeTestimonial.quote}
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src={activeTestimonial.image}
              alt={activeTestimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <h4 className="text-black font-semibold  text-lg">
              {activeTestimonial.name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500">
              {activeTestimonial.role}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 flex-wrap">
          {testimonials.map((user, index) => (
            <button
              key={user.id}
              onClick={() => setActiveIndex(index)}
              className={`w-12 h-12   rounded-full overflow-hidden border-2 transition duration-300 ${
                activeIndex === index
                  ? "border-black"
                  : "border-transparent hover:border-black"
              }`}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comment;
