import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import errorGif from "../assets/404-Error-Animation.gif";

const ErrorLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-white p-4 text-center">
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-lg w-full flex flex-col items-center space-y-5 rounded-2xl p-6"
      >
        {/* Error GIF */}
        <img
          src={errorGif}
          alt="Error Illustration"
          className="w-64 md:w-80 object-contain mx-auto"
        />

        {/* Error Text */}
        <div>
          <h1 className="text-4xl font-extrabold mb-2 text-emerald-300">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Back Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-md transition-transform hover:scale-105"
          >
            Back to Previous
          </button>
          <Link
            to="/"
            className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md transition-transform hover:scale-105"
          >
            Go Home
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="mt-6 text-gray-400 text-xs">
        © {new Date().getFullYear()} Job-stock • All Rights Reserved
      </p>
    </div>
  );
};

export default ErrorLayout;
