import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AddJobForm from "./AddJobForm";
import axios from "axios";
import JobCard from "./JobCard";
import AuthContext from "../Authantiation/AuthContext";
import toast from "react-hot-toast";

const MyPostedJobs = () => {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([]);
  const { user, signOutUser, setShowLoginModel } = useContext(AuthContext);

  const hotUpdate = () => {
    axios.get(`${import.meta.env.VITE_API}/jobs`, {withCredentials: true})
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        if (error.response?.status === 401) {
          toast.error("Session expired! Please login again.");
          signOutUser();
          setShowLoginModel(true);
        }
      })
  }

  useEffect(() => {
    hotUpdate();
  }, [])

  const remaining = data.filter(job => job?.jobAuthor === user?.email);


  return (
    <div className="p-5 md:p-10 relative">
      {/* Add Job Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          remaining?.map(job => <JobCard job={job} hotUpdate={hotUpdate}/>)
        }
        <div
          onClick={() => setOpenForm(true)}
          className="py-20 border-[3px] border-green-500 rounded-2xl flex flex-col justify-center items-center
             bg-white shadow-md hover:shadow-2xl hover:bg-green-50 transition-all duration-300 
             cursor-pointer group"
        >
          <FaPlus className="text-7xl text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-xl font-semibold text-green-600 group-hover:text-green-700 text-center">
            Add your job advertisement
          </p>
        </div>
      </div>

      {/* Popup Form with Animation */}
      <AnimatePresence>
        {openForm && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenForm(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Form Container */}
            <motion.div
              initial={{ y: 50, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         z-50 w-[90%] max-w-4xl rounded-2xl border border-green-600 
                         bg-white shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setOpenForm(false)}
                  className="text-gray-500 hover:text-red-500 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="max-h-[80vh] overflow-y-auto">
                <AddJobForm closeModal={() => setOpenForm(false)} hotUpdate={hotUpdate}/>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyPostedJobs;
