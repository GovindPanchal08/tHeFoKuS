import LocomotiveScroll from "locomotive-scroll";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./MainLayout";
import ProductPage from "./pages/Products";
import CartPage from "./pages/CartPage";
import AuthPage from "./components/Auth/Auth";

const App = () => {
  // In your main component
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div
      id="main"
      data-scroll
      data-scroll-container
      className="w-full h-screen box-border m-0 p-0   text-white "
    >
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
