const Comtrols = ({ handleNext, handlePrev }) => {
  return (
    <div className="absolute bottom-6 right-6 flex items-center gap-4 z-30">
      <button
        onClick={handlePrev}
        className="text-white text-2xl p-2 bg-white/20 rounded-full hover:bg-white/40"
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button
        onClick={handleNext}
        className="text-white text-2xl p-2 bg-white/20 rounded-full hover:bg-white/40"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

export default Comtrols;
