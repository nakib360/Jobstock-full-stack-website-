import { useState } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const AllUsersTable = () => {
    const loadedData = useLoaderData();
    const [remaingUser, setRemainingUser] = useState(loadedData);
    const [openConfirmSubmit, setConfirmSubmit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleConfirmModal = (id) => {
        setSelectedUserId(id);
        setConfirmSubmit(true);
    }

    const confirmDelete = () => {
        if(selectedUserId){
            axios.delete(`http://localhost:3000/users/${selectedUserId}`)
            .then(res => {
                console.log(res);
                if (res?.data?.deletedCount > 0) {
                    toast.success("User is successfully delated!!!");

                    const remaining = remaingUser.filter(user => user?._id !== selectedUserId);
                    setRemainingUser(remaining);
                } else {
                    toast.error("Sumthing went wrong!!!")
                }

                setConfirmSubmit(false);
                setSelectedUserId(null);
            })
        }
    }


    return (
        <div>
            <div className="bg-[#04343a] shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-500">Users</h2>
                <table className="w-full table-auto border-collapse border border-white">
                    <thead>
                        <tr className="bg-white/20">
                            <th className="border border-white px-4 py-2">Name</th>
                            <th className="border border-white px-4 py-2">Email</th>
                            <th className="border border-white px-4 py-2">Password</th>
                            <th className="border border-white px-4 py-2">Role</th>
                            <th className="border border-white px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            remaingUser.map(user => (
                                <tr>
                                    <td className="border border-white/50 px-4 py-2">{user?.displayName}</td>
                                    <td className="border border-white/50 px-4 py-2">{user?.email}</td>
                                    <td className="border border-white/50 px-4 py-2">{user?.password ? user?.password : "loged by google"}</td>
                                    <td className="border border-white/50 px-4 py-2">{user?.admin ? "Admin" : "User"}</td>
                                    <td className="border border-white/50 px-4 py-2 space-x-2">
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                                        <button onClick={() => handleConfirmModal(user?._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

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

        </div>
    );
};

export default AllUsersTable;