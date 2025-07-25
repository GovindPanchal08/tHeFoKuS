import Hero from "./pages/Hero";
import FastDiv from "./components/FastDiv";
import Video from "./pages/Video";
import Founder from "./pages/Founder";
import Comment from "./components/Comment";
import WhyFokus from "./pages/Why";
import Footer from "./components/Footer";

const MainLayout = () => {
  return (
    <>
      <Hero />
      <FastDiv />
      <Video />
      <Comment />
      <Founder />
      <WhyFokus />
      <Footer />
    </>
  );
};

export default MainLayout;
