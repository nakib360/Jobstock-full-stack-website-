import { NavLink } from "react-router";
import { FaUser, FaCog } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { MdOutlineCardTravel } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Profile", to: "profile", icon: <FaUser /> },
  { name: "Posted Jobs", to: "postedJobs", icon: <PiCardsThreeFill /> },
  { name: "Applied Jobs", to: "appliedJobs", icon: <MdOutlineCardTravel /> },
  { name: "Settings", to: "settings", icon: <FaCog /> },
];

const DashBoardAside = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="p-6 bg-white h-full border-r border-gray-200 flex flex-col justify-start">
      <p className="text-xl font-bold text-gray-800 mb-6">Dashboard</p>

      <nav className="relative flex flex-col gap-2">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-5 py-3 transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-700 hover:text-emerald-500"
              }`
            }
            onClick={() => setActiveIndex(index)}
          >
            {activeIndex === index && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-emerald-500 rounded-xl z-0"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-3">
              {item.icon} {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashBoardAside;
