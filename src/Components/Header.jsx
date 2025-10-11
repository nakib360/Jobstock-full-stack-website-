import pen from "../assets/pen.png";
import note from "../assets/note.png";
import cv from "../assets/cv.png";
import * as motion from "motion/react-client";
import "../index.css";

const Header = () => {
  return (
    <header className="relative w-full min-h-[60vh] md:min-h-[90vh] font-roboto bg-gray-200 bg-grid overflow-hidden ">
      {/* Background images */}
      <motion.img
        animate={{ x: 290, y: 160 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute w-30 md:w-40 -rotate-90 -left-50 -bottom-80 z-20"
        src={pen}
        alt="Pen"
      />
      <motion.img
        animate={{ y: -220 }}
        transition={{ duration: 1 }}
        className="absolute w-50 md:w-auto left-8 -rotate-10 -bottom-80 z-10"
        src={note}
        alt="Note"
      />
      <motion.img
        animate={{ rotate: -20, x: -300, y: -300 }}
        transition={{ duration: 1 }}
        className="absolute -right-100 -bottom-100 z-20 h-90 md:h-130"
        src={cv}
        alt="CV"
      />

      {/* Title / Hero Text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-auto text-center z-30 space-y-4 px-4">
        <div className="badge rounded-full py-4 px-5 bg-[#0b8260] text-white border-none text-sm">
          Get Your Hot Jobs
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-500 md:text-black">
          Find the great jobs offer for you
        </h1>
        <p className="text-md md:text-xl text-gray-700 ">
          Getting a new job is never easy. Check what new jobs we have in store
          for you on JobStock.
        </p>
      </div>
    </header>
  );
};

export default Header;
