import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ classname }) => {
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  const menuRef = useRef(null);
  const cartRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  // Initial entrance animation + hover effects
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(centerRef.current, {
      scale: 0.3,
      opacity: 0.4,
      duration: 1.4,
      ease: "back.out",
    })
      .from(
        leftRef.current?.children,
        {
          x: 60,
          opacity: 0,
          stagger: 0.2,
          duration: 0.9,
        },
        "start"
      )
      .from(
        rightRef.current?.children,
        {
          x: -60,
          opacity: 0,
          stagger: 0.2,
          duration: 0.9,
        },
        "start"
      );

    const hoverItems = [
      ...(leftRef.current?.children || []),
      ...(rightRef.current?.children || []),
    ];

    hoverItems.forEach((item, index) => {
      const rotateAmount = (index % 2 === 0 ? -1 : 1) * 2;
      const scaleAmount = 1.05 + index * 0.01;

      const enter = () =>
        gsap.to(item, {
          y: -8,
          scale: scaleAmount,
          rotate: rotateAmount,
          duration: 0.35,
          ease: "power2.out",
        });

      const leave = () =>
        gsap.to(item, {
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });

      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);

      return () => {
        item.removeEventListener("mouseenter", enter);
        item.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  // Slide mobile menu
  useEffect(() => {
    gsap.to(menuRef.current, {
      x: menuOpen ? 0 : "100%",
      opacity: menuOpen ? 1 : 0,
      duration: 0.6,
      ease: "power2.out",
      pointerEvents: menuOpen ? "auto" : "none",
    });
  }, [menuOpen]);

  return (
    <nav
      className={`relative flex flex-col gap-2 select-none  md:flex-row items-center justify-between md:justify-center bg-[${classname}] py-6 px-4 text-white font-sans`}
    >
      <div ref={leftRef} className="hidden md:flex items-center gap-6">
        <span className="text-lg font-medium cursor-pointer">
          <Link to={"/"}>Home</Link>
        </span>
        <span className="text-lg font-medium cursor-pointer">
          <Link to="/product">Products</Link>
        </span>
      </div>
      <div ref={centerRef} className="flex items-center justify-center">
        <h1 className=" w-20 lg:w-32 sm:w-36 font-bold tracking-wide">
          <img
            className="w-full h-full object-contain"
            src="/Adobe Express - file.png"
            alt="logo"
          />
        </h1>
      </div>
      <div ref={rightRef} className="hidden md:flex items-center gap-6">
        <button className="text-lg font-medium cursor-pointer">
          <Link to={"/product"}>Buy Now</Link>
        </button>
        <Link to="/cart">
          <i className="ri-shopping-bag-line text-2xl cursor-pointer"></i>
        </Link>
      </div>
      <div className="flex md:hidden items-center justify-center gap-4 absolute right-4 top-auto">
        <i
          onClick={() => setMenuOpen(true)}
          className="ri-menu-line text-2xl cursor-pointer"
        ></i>
        <Link to="/cart">
          <i className="ri-shopping-bag-line text-2xl cursor-pointer"></i>
        </Link>
      </div>
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-3/4 h-full bg-black z-40 flex flex-col items-start px-6 py-8 gap-6 text-lg opacity-0 pointer-events-none"
      >
        <i
          onClick={() => setMenuOpen(false)}
          className="ri-close-line text-3xl self-end cursor-pointer"
        ></i>

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="cursor-pointer font-medium text-white"
        >
          Home
        </Link>

        <Link
          to="/product"
          onClick={() => setMenuOpen(false)}
          className="cursor-pointer font-medium text-white"
        >
          Products
        </Link>

        <Link
          to="/product"
          onClick={() => setMenuOpen(false)}
          className="font-medium cursor-pointer text-white"
        >
          Buy Now
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
