import { NavLink } from "react-router";
import { FaUser, FaCog } from "react-icons/fa";
import { PiCardsThreeFill } from "react-icons/pi";
import { MdOutlineCardTravel } from "react-icons/md";
import { motion } from "framer-motion";

const navItems = [
  { name: "All Jobs", to: "allJobs", icon: <PiCardsThreeFill /> },
  { name: "All Users", to: "allUsers", icon: <FaUser/> }
];

const AdminPanelAsideNav = () => {
  return (
    <div className="p-6 bg-white h-full border-r border-gray-200 flex flex-col justify-start">
      <p className="text-xl font-bold text-gray-800 mb-6">Admin Panel</p>

      <nav className="relative flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-5 py-3 transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-700 hover:text-[#ffcc00]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-[#ffcc00] rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  {item.icon} {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminPanelAsideNav;
