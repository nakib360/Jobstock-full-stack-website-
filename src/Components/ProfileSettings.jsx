import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { RxCrossCircled } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const ProfileSettings = () => {
    const { user, setLoading, signOutUser, setShowLoginModel } = useContext(AuthContext);
    const [openConfirmSubmit, setConfirmSubmit] = useState(false);
    const fileInputRef = useRef(null);

    const [data, setData] = useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: null,
        birthDate: "",
        bio: "",
        avatar: "",
        social: { website: "", linkedin: "", twitter: "", facebook: "" },
        privacy: { profilePublic: false, showEmail: false, showPhone: false },
        skills: [],
        education: [],
        createdAt: "",
        updatedAt: "",
    });

    const [preview, setPreview] = useState(data?.avatar);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/users?email=${user?.email}`, { withCredentials: true })
            .then((data) => {
                setData(data.data[0]);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                if (err.response?.status === 401) {
                    toast.error("Session expired! Please login again.");
                    signOutUser();
                    setShowLoginModel(true);
                }
            });
    }, [user?.email, setLoading, signOutUser, setShowLoginModel]);

    const handleChange = (field, value) => setData({ ...data, [field]: value });
    const handlePrivacyToggle = (field) =>
        setData({
            ...data,
            privacy: { ...data?.privacy, [field]: !data?.privacy[field] },
        });

    const addSkill = (skill) => {
        if (skill && !data?.skills.includes(skill)) {
            setData({ ...data, skills: [...data?.skills, skill] });
        }
    };
    const removeSkill = (skill) =>
        setData({
            ...data,
            skills: data?.skills.filter((s) => s !== skill),
        });

    const addEducation = () =>
        setData({
            ...data,
            education: [
                ...data?.education,
                { degree: "", institution: "", startYear: "", endYear: "", result: "" },
            ],
        });

    const updateEducation = (index, field, value) => {
        const updated = [...data?.education];
        updated[index][field] = value;
        setData({ ...data, education: updated });
    };

    const removeEducation = (index) =>
        setData({
            ...data,
            education: data?.education.filter((_, i) => i !== index),
        });

    const handleSave = () => {
        const updated = {
            ...data,
            updatedAt: new Date().toLocaleString(),
        };
        setData(updated);
        axios
            .put(`${import.meta.env.VITE_API}/users/${updated._id}`, updated, { withCredentials: true })
            .then((res) => {
                res?.status === 200
                    ? toast.success("Profile updated successfully!")
                    : toast.error("Please try again!");
            })
            .catch((err) => {
                toast.error(err.message || "Update failed!")
                if (err.response?.status === 401) {
                    toast.error("Session expired! Please login again.");
                    signOutUser();
                    setShowLoginModel(true);
                }
            });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            alert("Your account has been deleted!");
        }
    };

    const handleInputRefClick = () => fileInputRef.current.click();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setData((prev) => ({ ...prev, avatar: file }));
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-10 lg:p-20 relative">
            <div className="max-w-5xl bg-gray-200 rounded-xl mx-auto space-y-8 p-4 sm:p-6 md:p-8 z-20">
                {/* Avatar + Name */}
                <div className="bg-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-xl p-5 shadow">
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className="border-2 p-0.5 rounded-full border-green-600">
                            <img
                                src={
                                    preview ||
                                    (typeof data?.avatar === "string" ? data?.avatar : null) ||
                                    "https://img.pikbest.com/png-images/20250228/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette_11563975.png!sw800"
                                }
                                alt="avatar"
                                className="object-cover w-28 h-28 sm:w-32 sm:h-32 rounded-full"
                            />
                        </div>
                        <div
                            onClick={handleInputRefClick}
                            className="absolute bottom-0 right-0 bg-gray-500 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
                        >
                            <FaCamera className="text-lg sm:text-xl" />
                        </div>
                        <input
                            className="hidden"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <div>
                            <p className="text-sm px-1 py-1 text-gray-500">Name</p>
                            <input
                                className="text-base sm:text-lg font-semibold w-full border-2 rounded-xl p-2 focus:outline-none focus:border-emerald-400 border-gray-400 transition-all"
                                value={data?.displayName}
                                onChange={(e) => handleChange("displayName", e.target.value)}
                                placeholder="Full Name"
                            />
                        </div>
                        <p className="text-gray-500 text-sm mt-3 text-center sm:text-left">
                            Joined: {data?.createdAt} • Last Updated: {data?.updatedAt}
                        </p>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="bg-gray-100 rounded-xl p-5 shadow space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                        Profile Information
                    </h2>
                    {[
                        ["Email", "email", true],
                        ["Phone number", "phoneNumber"],
                        ["Your Bio", "bio"],
                    ].map(([label, key, disabled]) => (
                        <div key={key}>
                            <p className="text-sm px-1 py-1 text-gray-500">{label}</p>
                            <input
                                className={`w-full border-2 rounded-xl p-2 ${disabled
                                        ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                                        : "focus:outline-none focus:border-emerald-400 border-gray-400"
                                    }`}
                                type={key === "email" ? "email" : "text"}
                                value={data?.[key]}
                                disabled={disabled}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder={label}
                            />
                        </div>
                    ))}
                    <div>
                        <p className="text-sm px-1 py-1 text-gray-500">Date of birth</p>
                        <input
                            className="w-full border-2 rounded-xl p-2 focus:outline-none focus:border-emerald-400 border-gray-400"
                            type="date"
                            value={data?.birthDate}
                            onChange={(e) => handleChange("birthDate", e.target.value)}
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-gray-100 rounded-xl p-5 shadow space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Social Links</h2>
                    {Object.keys(data?.social || {}).map((key) => (
                        <div key={key}>
                            <p className="text-sm px-1 py-1 text-gray-500">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </p>
                            <input
                                className="w-full border-2 rounded-xl p-2 focus:outline-none focus:border-emerald-400 border-gray-400 transition-all"
                                value={data?.social?.[key] || ""}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        social: { ...data?.social, [key]: e.target.value },
                                    })
                                }
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            />
                        </div>
                    ))}
                </div>

                {/* Privacy */}
                <div className="bg-gray-100 rounded-xl p-5 shadow">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Privacy Settings</h2>
                    <hr className="border-t-2 border-gray-300 mb-2" />
                    <div className="space-y-2">
                        {Object.keys(data?.privacy || {}).map((key) => (
                            <div key={key}>
                                <label className="flex items-center justify-between p-2 rounded">
                                    <span className="capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={data?.privacy[key]}
                                        onChange={() => handlePrivacyToggle(key)}
                                        className="w-5 h-5"
                                    />
                                </label>
                                <hr className="border-t border-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-gray-100 rounded-xl p-5 shadow space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data?.skills.map((skill) => (
                            <div
                                key={skill}
                                className="flex items-center bg-gray-400 text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-emerald-500 transition-all"
                            >
                                <span>{skill}</span>
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    <RxCrossCircled size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            id="newSkill"
                            className="w-full border-2 rounded p-2 focus:outline-none focus:border-emerald-400 border-gray-400 flex-1"
                            placeholder="Add new skill"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addSkill(e.target.value);
                                    e.target.value = "";
                                }
                            }}
                        />
                        <button
                            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                            onClick={() => {
                                const input = document.getElementById("newSkill");
                                addSkill(input.value);
                                input.value = "";
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-gray-100 rounded-xl p-5 shadow space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Education</h2>
                    {data?.education.map((edu, index) => (
                        <div
                            key={index}
                            className="p-4 sm:p-6 rounded space-y-2 relative bg-gray-200"
                        >
                            <button
                                onClick={() => removeEducation(index)}
                                className="absolute top-1 right-1 text-2xl text-red-500"
                            >
                                <RxCrossCircled />
                            </button>
                            {["degree", "institution", "startYear", "endYear", "result"].map(
                                (field, idx) => (
                                    <input
                                        key={idx}
                                        className="w-full border-2 rounded-xl p-2 focus:outline-none focus:border-emerald-400 border-gray-400 transition-all"
                                        value={edu[field]}
                                        onChange={(e) =>
                                            updateEducation(index, field, e.target.value)
                                        }
                                        placeholder={field
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (str) => str.toUpperCase())}
                                    />
                                )
                            )}
                        </div>
                    ))}
                    <button
                        onClick={addEducation}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Education
                    </button>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button
                        onClick={() => setConfirmSubmit(true)}
                        className="bg-emerald-500 text-white px-5 py-2 rounded hover:bg-emerald-600 w-full sm:w-auto"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Confirm Save Modal */}
            <AnimatePresence>
                {openConfirmSubmit && (
                    <motion.div
                        initial={{ y: 10, scale: 0.8, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 10, scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-50 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[25rem] bg-gray-100 shadow-xl p-6"
                    >
                        <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
                            Warning!
                        </h2>
                        <p className="text-gray-700 mb-6 text-center">
                            Do you want to update your profile permanently?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    handleSave();
                                    setConfirmSubmit(false);
                                }}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                            >
                                OK
                            </button>
                            <button
                                onClick={() => setConfirmSubmit(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Toaster />
        </div>
    );
};

export default ProfileSettings;
