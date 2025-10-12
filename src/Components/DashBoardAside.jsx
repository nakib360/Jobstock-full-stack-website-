import { NavLink } from "react-router";
import { FaUser, FaCog } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { MdOutlineCardTravel } from "react-icons/md";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Profile", to: "profile", icon: <FaUser /> },
  { name: "Posted Jobs", to: "postedJobs", icon: <PiCardsThreeFill /> },
  { name: "Applied Jobs", to: "appliedJobs", icon: <MdOutlineCardTravel /> },
  { name: "Settings", to: "settings", icon: <FaCog /> },
];

const DashBoardAside = () => {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isSmall, setIsSmall] = useState(false);

  // Track window width
  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-2 py-5 sm:p-6 bg-white h-full border-r border-gray-200 flex flex-col justify-start relative">
      {/* Header */}
      <p className="text-xl font-bold text-gray-800 mb-6 hidden sm:block">
        Dashboard
      </p>

      {/* Nav items */}
      <nav className="relative flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 sm:px-5 py-3 rounded-xl transition-all transition-colors ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-gray-700 hover:text-emerald-500"
              } ${isSmall ? "justify-center" : "justify-start"}`
            }
            onMouseEnter={(e) => {
              if (isSmall) {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip(item.name);
                setTooltipPos({
                  x: rect.right + 10,
                  y: rect.top + rect.height / 2,
                });
              }
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            <span className="flex items-center justify-center text-lg">
              {item.icon}
            </span>
            {!isSmall && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{ top: tooltipPos.y, left: tooltipPos.x }}
          className="fixed z-50 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg pointer-events-none whitespace-nowrap transform -translate-y-1/2"
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default DashBoardAside;
