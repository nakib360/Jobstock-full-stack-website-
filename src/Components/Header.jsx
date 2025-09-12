import pen from "../assets/pen.png"
import note from "../assets/note.png"
import cv from "../assets/cv.png"

const Header = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background images */}
            <img className="absolute -rotate-90 bottom-0 z-20" src={pen} alt="" />
            <img className="absolute -rotate-10 bottom-0 z-10" src={note} alt="" />
            <img className="absolute right-0 bottom-0 z-20 h-140" src={cv} alt="" />

            {/* Title */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-center z-30">
                <p className="text-5xl md:text-6xl font-bold">
                    Find the great jobs offer for you
                </p>
            </div>
        </div>
    );
};

export default Header;
