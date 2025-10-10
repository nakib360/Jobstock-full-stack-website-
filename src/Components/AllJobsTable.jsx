import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import EditJob from "./EditJob";

const AllJobsTable = () => {
    const loadedData = useLoaderData();
    const [jobs, setJobs] = useState(loadedData);
    const [openConfirmSubmit, setConfirmSubmit] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/jobs/${id}`)
            .then((res) => {
                if (res?.data?.deletedCount > 0) {
                    toast.success("Job is successfully deleted");
                    const remaining = jobs.filter((job) => job?._id !== id);
                    setJobs(remaining);
                } else {
                    toast.error("Operation failed. Try again.");
                }
            })
            .catch(() => {
                toast.error("Operation failed. Try again.");
            });
    };

    const openConfirmModal = (id) => {
        setSelectedJobId(id);
        setConfirmSubmit(true);
    };

    const confirmDelete = () => {
        if (selectedJobId) {
            handleDelete(selectedJobId);
            setConfirmSubmit(false);
            setSelectedJobId(null);
        }
    };

    const openEditModal = (job) => {
        setSelectedJob(job);
        setOpenEditForm(true);
    };

    const hotUpdate = (updatedJob) => {
        setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
    };

    return (
        <div>
            <div className="bg-[#04343a] shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-500">Jobs</h2>
                <table className="w-full table-auto border-collapse border border-white">
                    <thead>
                        <tr className="bg-white/20">
                            <th className="border border-white px-4 py-2">Job Name</th>
                            <th className="border border-white px-4 py-2">Job Type</th>
                            <th className="border border-white px-4 py-2">Location</th>
                            <th className="border border-white px-4 py-2">Ratings</th>
                            <th className="border border-white px-4 py-2">Applicants</th>
                            <th className="border border-white px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id}>
                                <td className="border border-white/50 px-4 py-2">{job?.jobName}</td>
                                <td className="border border-white/50 px-4 py-2">{job?.jobType}</td>
                                <td className="border border-white/50 px-4 py-2">{job?.location}</td>
                                <td className="border border-white/50 px-4 py-2">{job?.rating}</td>
                                <td className="border border-white/50 px-4 py-2">
                                    {job?.appliedUsers?.length || 0}
                                </td>
                                <td className="border border-white/50 px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => openEditModal(job)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openConfirmModal(job._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {openConfirmSubmit && (
                    <motion.div
                        initial={{ y: 10, scale: 0.8, opacity: 0 }}
                        animate={{ y: -10, scale: 1, opacity: 1 }}
                        exit={{ y: 10, scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl fixed z-50 w-96 bg-gray-100 shadow-xl p-6"
                    >
                        <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
                            Warning!
                        </h2>
                        <p className="text-gray-700 mb-6 text-center">
                            Are you sure you want to delete this job permanently?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                            >
                                OK
                            </button>
                            <button
                                onClick={() => setConfirmSubmit(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Job Modal */}
            <AnimatePresence>
                {openEditForm && selectedJob && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setOpenEditForm(false)}
                            className="fixed inset-0 bg-black z-40"
                        />

                        <motion.div
                            initial={{ y: 50, scale: 0.8, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl rounded-2xl border border-green-600 bg-white shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-end p-3">
                                <button
                                    onClick={() => setOpenEditForm(false)}
                                    className="text-gray-500 hover:text-red-500 text-lg font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="max-h-[80vh] overflow-y-auto">
                                <EditJob
                                    job={selectedJob}
                                    closeModal={() => setOpenEditForm(false)}
                                    hotUpdate={hotUpdate}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Toaster />
        </div>
    );
};

export default AllJobsTable;
