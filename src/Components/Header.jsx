import pen from "../assets/pen.png"
import note from "../assets/note.png"
import cv from "../assets/cv.png"
import * as motion from "motion/react-client"
import "../index.css"

const Header = () => {
    return (
        <div className="relative min-h-screen font-roboto bg-gray-200 bg-grid">
            {/* Background images */}
            <motion.img animate={{ x: 290, y: 120}} transition={{delay: 0.3, duration: 1 }} className="absolute -rotate-90 -left-50 -bottom-80 z-20" src={pen} alt="" />
            <motion.img animate={{ y: -230 }} transition={{ duration: 1 }} className="absolute -rotate-10 -bottom-80 z-10" src={note} alt="" />
            <motion.img animate={{ rotate: -20 }} transition={{ duration: 1 }} className="absolute -right-30 -bottom-30 z-20 h-140" src={cv} alt="" />

            {/* Title */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 space-y-4 text-center z-30">
                <div className="badge badge-success rounded-full py-4 px-5 bg-[#0b8260] text-white border-none">Get Your Hot Jobs</div>
                <p className="text-6xl font-semibold">Find the great jobs offer for you</p>
                <p className="text-xl">Getting a new job is never easy. Check what new jobs we have in store for you on JobStock.</p>
            </div>
        </div>
    );
};

export default Header;
