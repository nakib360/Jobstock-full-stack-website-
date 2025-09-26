import { Link } from "react-router";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const DashBoardAside = () => {
  return (
    <div className="p-6 bg-white h-full border-r border-gray-200 flex flex-col justify-between">
      
      {/* Logo / Title */}
      <div className="mb-8">
        <p className="text-xl font-bold text-gray-800 mb-6">Dashboard</p>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-gray-700 hover:text-emerald-500 transition-colors"
          >
            <FaHome /> Home
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 text-gray-700 hover:text-emerald-500 transition-colors"
          >
            <FaUser /> Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 text-gray-700 hover:text-emerald-500 transition-colors"
          >
            <FaCog /> Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default DashBoardAside;
