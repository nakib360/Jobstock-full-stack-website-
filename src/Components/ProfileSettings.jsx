import { useContext, useEffect, useState } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { RxCrossCircled } from "react-icons/rx";

const ProfileSettings = () => {
    const { user, setLoading } = useContext(AuthContext);

    const [data, setData] = useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: null,
        birthDate: "",
        bio: "",
        avatar:
            "",
        social: {
            website: "",
            linkedin: "",
            twitter: "",
            facebook: "",
        },
        privacy: {
            profilePublic: false,
            showEmail: false,
            showPhone: false,
        },
        skills: [],
        education: [],
        createdAt: "",
        updatedAt: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setData(data[0]);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user?.email, setLoading]);



    // Generic field change
    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    // Privacy toggle
    const handlePrivacyToggle = (field) => {
        setData({
            ...data,
            privacy: { ...data.privacy, [field]: !data.privacy[field] },
        });
    };

    // Add/Remove skill
    const addSkill = (skill) => {
        if (skill && !data.skills.includes(skill)) {
            setData({ ...data, skills: [...data.skills, skill] });
        }
    };
    const removeSkill = (skill) => {
        setData({
            ...data,
            skills: data.skills.filter((s) => s !== skill),
        });
    };

    // Add/Remove education
    const addEducation = () => {
        setData({
            ...data,
            education: [
                ...data.education,
                { degree: "", institution: "", startYear: "", endYear: "", result: "" },
            ],
        });
    };
    const updateEducation = (index, field, value) => {
        const updated = [...data.education];
        updated[index][field] = value;
        setData({ ...data, education: updated });
    };
    const removeEducation = (index) => {
        setData({
            ...data,
            education: data.education.filter((_, i) => i !== index),
        });
    };

    // Save changes
    const handleSave = () => {
        const updated = {
            ...data,
            updatedAt: new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }),
        }
        setData(updated)

        console.log("Updated data:", updated);
        alert("Profile updated successfully!");
    };

    // Delete account
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            console.log("Account deleted:", data._id);
            alert("Your account has been deleted!");
        }
    };

    return (
        <div className="p-20">
            <div className="max-w-4xl bg-gray-200 rounded-xl mx-auto space-y-8 p-6">
                {/* Avatar + Name */}
                <div className="bg-gray-100 flex items-center gap-6 rounded-xl p-5 shadow">
                    <div className="border-2 p-0.5 rounded-full border-green-600">
                        <img
                            src={data.avatar}
                            alt="avatar"
                            className="w-20 h-20 rounded-full border"
                        />
                    </div>
                    <div className="flex-1">
                        <div>
                            <p className="text-sm px-1 py-1 text-gray-500">Name</p>
                            <input
                                className="text-lg font-semibold w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                value={data.displayName}
                                onChange={(e) => handleChange("displayName", e.target.value)}
                                placeholder="Full Name"
                            />
                        </div>
                        <p className="text-gray-500 text-sm mt-3 text-center">
                            Joined: {data.createdAt} • Last Updated: {data.updatedAt}
                        </p>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="bg-gray-100 rounded-xl p-5 shadow">
                    <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
                    <div>
                        <p className="text-sm px-1 py-1 text-gray-500">Email</p>
                        <input
                            className="w-full border-2 rounded-xl p-2 bg-gray-100 text-gray-600 cursor-not-allowed 
               focus:outline-none border-gray-300"
                            type="email"
                            value={data.email}
                            disabled 
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <p className="text-sm px-1 py-1 text-gray-500">Phone number</p>
                        <input
                            className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                            value={data.phoneNumber}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>
                    <div>
                        <p className="text-sm px-1 py-1 text-gray-500">Your Bio</p>
                        <input
                            className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                            value={data.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            placeholder="Short bio"
                        />
                    </div>
                    <div>
                        <p className="text-sm px-1 py-1 text-gray-500">Date of birth</p>
                        <input
                            className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                            type="date"
                            value={data.birthDate}
                            onChange={(e) => handleChange("birthDate", e.target.value)}
                        />

                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-gray-100 rounded-xl p-5 shadow">
                    <h2 className="text-xl font-semibold mb-2">Social Links</h2>
                    {Object.keys(data.social).map((key) => (
                        <div>
                            <p className="text-sm px-1 py-1 text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            <input
                                key={key}
                                className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                value={data.social[key]}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        social: { ...data.social, [key]: e.target.value },
                                    })
                                }
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            />
                        </div>
                    ))}
                </div>

                {/* Privacy */}
                <div className="bg-gray-100 rounded-xl p-5 shadow">
                    <h2 className="text-xl font-semibold mb-2">Privacy Settings</h2>
                    <hr className="border-t-2 border-gray-400 mx-2" />
                    {Object.keys(data.privacy).map((key) => (
                        <div>
                            <label
                                key={key}
                                className="flex items-center justify-between p-2 rounded"
                            >
                                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                <input
                                    type="checkbox"
                                    checked={data.privacy[key]}
                                    onChange={() => handlePrivacyToggle(key)}
                                    className="w-5 h-5"
                                />
                            </label>

                            <hr className="border-t-2 border-gray-400 mx-2" />
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div className="bg-gray-100 rounded-xl p-5 shadow space-y-3">
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill) => (
                            <div
                                key={skill}
                                className="cursor-default flex items-center bg-gray-400 text-white rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 hover:bg-emerald-500"
                            >
                                <span>{skill}</span>
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="cursor-pointer ml-2 text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <RxCrossCircled size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            id="newSkill"
                            className="w-full border-3 rounded p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-al flex-1"
                            placeholder="Add new skill"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addSkill(e.target.value);
                                    e.target.value = "";
                                }
                            }}
                        />
                        <button
                            className="bg-emerald-500 text-white px-4 rounded hover:bg-emerald-600"
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
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    {data.education.map((edu, index) => (
                        <div
                            key={index}
                            className="p-6 rounded space-y-2 relative bg-gray-200"
                        >
                            <button
                                onClick={() => removeEducation(index)}
                                className="cursor-pointer absolute top-1 right-1 text-2xl text-red-500"
                            >
                                <RxCrossCircled />
                            </button>
                            <input
                                className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                value={edu.degree}
                                onChange={(e) =>
                                    updateEducation(index, "degree", e.target.value)
                                }
                                placeholder="Degree"
                            />
                            <input
                                className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                value={edu.institution}
                                onChange={(e) =>
                                    updateEducation(index, "institution", e.target.value)
                                }
                                placeholder="Institution"
                            />
                            <div className="flex gap-2">
                                <input
                                    className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                    value={edu.startYear}
                                    onChange={(e) =>
                                        updateEducation(index, "startYear", e.target.value)
                                    }
                                    placeholder="Start Year"
                                />
                                <input
                                    className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                    value={edu.endYear}
                                    onChange={(e) =>
                                        updateEducation(index, "endYear", e.target.value)
                                    }
                                    placeholder="End Year"
                                />
                            </div>
                            <input
                                className="w-full border-3 rounded-xl p-2  focus:outline-none  focus:border-emerald-400 border-gray-400 transition-all"
                                value={edu.result}
                                onChange={(e) =>
                                    updateEducation(index, "result", e.target.value)
                                }
                                placeholder="Result"
                            />
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
                <div className="flex justify-between">
                    <button
                        onClick={handleSave}
                        className="bg-emerald-500 text-white px-5 py-2 rounded hover:bg-emerald-600"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
