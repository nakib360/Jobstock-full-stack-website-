import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import EditJob from "./EditJob";

const JobCard = ({ job, hotUpdate }) => {
    const location = useLocation();
    const [openConfirmSubmit, setConfirmSubmit] = useState(false);
    const [openForm, setOpenForm] = useState(false)

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/jobs/${job?._id}`)
            .then((res) => {
                console.log(res)
                if (res?.data?.deletedCount > 0) {
                    toast.success("Successfully delated job.")
                    hotUpdate();
                } else {
                    toast.error("Something went wrong.")
                }
            })
    }

    return (
        <div className=" relative bg-white rounded-xl  p-5 border border-black space-y-2 ">
            <div className="flex flex-col items-center gap-2">
                <div className="absolute right-5 text-sm text-[#00684b] bg-[#0b82605e] p-2 py-1 rounded-sm">{job?.jobType}</div>
                {
                    location?.pathname === "/dashboard/postedJobs" && (
                        <div className="flex items-center gap-2 absolute left-5">
                            <button onClick={() => setConfirmSubmit(true)} className=" text-sm text-red-400 bg-red-400/20 hover:bg-red-400/40 p-2 py-1 rounded-sm">Remove</button>
                            <button onClick={() => setOpenForm(true)} className=" text-sm text-blue-400 bg-blue-400/20 hover:bg-blue-400/40 p-2 py-1 rounded-sm">Edit</button>
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
                                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl rounded-2xl border border-green-600 bg-white shadow-2xl overflow-hidden"
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
                                                <EditJob job={job} closeModal={() => setOpenForm(false)} hotUpdate={hotUpdate} />
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                }
                <img className="w-20 mt-10" src={job?.jobImage} alt="" />
                <p className="text-sm text-gray-500">{job?.company}</p>
                <p className="font-semibold">{job?.jobName}</p>
                <div className="flex items-center flex-wrap text-center gap-2 justify-center">
                    {
                        job?.requirements?.skills?.map((tools, idx) => (
                            <div key={idx} className="text-sm text-gray-500 bg-gray-400/20 p-2 py-1 rounded-sm">{tools}</div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1 font-semibold text-sm">
                    <p>${job?.salary?.min}</p>
                    <p>-</p>
                    <p>&{job?.salary?.max}</p>
                </div>
                <Link to={`/jobDetails/${job._id}`} className="bg-[#0b8260] hover:bg-[#3b6e6003] border border-[#ffffff00] hover:border-[#0b8260] hover:text-[#0b8260] p-8 py-3 rounded-sm text-white flex justify-center items-center gap-2 transition-all">See Details</Link>
            </div>
            <AnimatePresence>
                {
                    openConfirmSubmit && (
                        <motion.div
                            initial={{ y: 10, scale: 0.8, opacity: 0 }}
                            animate={{ y: -10, scale: 1, opacity: 1 }}
                            exit={{ y: 10, scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl fixed z-50 w-96 bg-gray-100 shadow-xl p-6"
                        >
                            {/* Header */}
                            <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
                                Warning!
                            </h2>

                            {/* Message */}
                            <p className="text-gray-700 mb-6 text-center">
                                Do you want to update your profile permanently? It will change your information.
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-center gap-4">
                                <button onClick={() => { handleDelete(), setConfirmSubmit(false) }} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                                    OK
                                </button>
                                <button onClick={() => setConfirmSubmit(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    );
};

export default JobCard;