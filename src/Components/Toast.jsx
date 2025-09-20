import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Toast = ({ message, show, duration = 3000, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 bg-[#0b8260] text-white px-6 py-3 rounded-xl shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
