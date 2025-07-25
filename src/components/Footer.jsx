import { platforms } from "../constants/Platforms";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full min-h-screen bg-[#F5F5DC] text-black relative overflow-hidden ">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-16">
            <div>
              <h1 className="text-[10vw] sm:text-[6vw] lg:text-[7vw] font-black leading-tight tracking-tighter mb-4">
                FOKUS
              </h1>
              <p className="text-gray-800 text-base sm:text-lg max-w-md leading-relaxed">
                Stay Active, Stay Hydrated. Premium hydration solutions for your
                lifestyle.
              </p>
            </div>

            <div className="flex gap-10">
              <div className="w-full sm:w-1/2">
                <ul className="space-y-4 w-full sm:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Navigation</h3>
                  {[
                    { label: "Home", path: "/" },
                    { label: "Products", path: "/product" },
                    { label: "Know Us", path: "/" },
                    { label: "Privacy Policy", path: "/" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        className="text-gray-800 hover:text-gray-900 text-md lg:text-lg transition-all duration-300 hover:translate-x-2 inline-block"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Products</h3>
                <ul className="space-y-4">
                  {[
                    "Hydration Bottles",
                    "Insulated Flasks",
                    "Sports Bottles",
                    "Accessories",
                  ].map((product) => (
                    <li  key={product}>
                      <Link
                        to="/product"
                        className="text-gray-800 hover:text-gray-900 text-md lg:text-lg transition-all duration-300 hover:translate-x-2 inline-block"
                      >
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="text-[10vw]  sm:text-[6vw] lg:text-[6vw] font-bold leading-none tracking-tighter mb-10">
                GET IN TOUCH
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-900 text-sm mb-1 uppercase">Email</p>
                  <a
                    href="mailto:hello@fokus.com"
                    className="text-2xl font-bold  hover:text-gray-800 relative group inline-block"
                  >
                    hello@fokus.com
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-500"></span>
                  </a>
                </div>
                <div>
                  <p className="text-gray-900 text-sm mb-1 uppercase">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-2xl font-bold  hover:text-gray-800 relative group inline-block"
                  >
                    +1 (234) 567-890
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-500"></span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {platforms.map(({ name, icon, bg, border, text }) => (
                  <a key={name} href="#" className="group">
                    <div
                      className={`bg-white/35 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-105 ${bg} ${border}`}
                    >
                      <i
                        className={`ri-${icon} text-xl text-gray-800 transition-colors ${text}`}
                      ></i>
                      <p className="text-gray-400 group-hover:text-gray-800 text-sm mt-2">
                        {name}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-7 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-800 text-sm sm:text-base">
              © 2025 FOKUS. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm sm:text-base">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (text) => (
                  <a
                    key={text}
                    href="#"
                    className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
                  >
                    {text}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;
