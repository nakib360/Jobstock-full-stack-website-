import { useContext, useEffect, useState } from "react";
import AuthContext from "../Authantiation/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditJob = ({ job, closeModal, hotUpdate }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ job });

    useEffect(() => {
        if (job) {
            setFormData({
                jobType: job.jobType || "",
                jobName: job.jobName || "",
                jobTitle: job.jobTitle || "",
                location: job.location || "",
                rating: job.rating || "",
                department: job.department || "",
                jobAuthor: job.jobAuthor || user?.email || "",
                salaryMin: job.salaryMin || "",
                salaryMax: job.salaryMax || "",
                currency: job.currency || "USD",
                period: job.period || "PA",
                jobDescription: job.jobDescription || "",
                requirements: job.requirements || [""],
                skills: job.skills || [""],
                experience: job.experience || "",
                city: job.city || "",
                state: job.state || "",
                country: job.country || "",
                relocationRequired: job.relocationRequired || false,
                jobImage: job.jobImage || "",
                company: job.company || "",
            });
        }
    }, [job, user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleArrayChange = (e, field, index) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        axios.put(`http://localhost:3000/jobs/${job?._id}`, { formData })
            .then(res => {
                console.log(res)
                // if (res?.data?.insertedId?.length > 0) {
                //     toast.success("You are successfully added a job.");
                //     hotUpdate();
                // } else {
                //     toast.error("Something went wrong.")
                // }
                hotUpdate();
                closeModal();
            })
    };

    return (
        <div className="max-w-4xl mx-auto bg-white px-8 pb-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Edit Job</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                {/* Basic Info */}
                <input
                    type="text"
                    name="jobType"
                    placeholder="Job Type (e.g., Part Time)"
                    value={formData?.jobType}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobName"
                    placeholder="Job Name"
                    value={formData?.jobName}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData?.jobTitle}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData?.location}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    value={formData?.rating}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData?.department}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                {/* author */}
                <input
                    type="text"
                    name="department"
                    placeholder="Job Author"
                    value={formData?.jobAuthor}
                    readOnly
                    className="border p-2 rounded "
                />

                {/* Salary */}
                <input
                    type="number"
                    name="salaryMin"
                    placeholder="Min Salary"
                    value={formData?.salaryMin}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="salaryMax"
                    placeholder="Max Salary"
                    value={formData?.salaryMax}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                {/* Description */}
                <textarea
                    name="jobDescription"
                    placeholder="Job Description"
                    value={formData?.jobDescription}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2 h-32"
                />

                {/* Dynamic Fields */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Requirements</label>
                    {formData?.requirements?.map((req, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Requirement ${index + 1}`}
                            value={req}
                            onChange={(e) => handleArrayChange(e, "requirements", index)}
                            className="border p-2 rounded w-full mb-2"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("requirements")}
                        className="text-green-600 underline text-sm"
                    >
                        + Add Requirement
                    </button>
                </div>

                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Skills</label>
                    {formData?.skills?.map((skill, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Skill ${index + 1}`}
                            value={skill}
                            onChange={(e) => handleArrayChange(e, "skills", index)}
                            className="border p-2 rounded w-full mb-2"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("skills")}
                        className="text-green-600 underline text-sm"
                    >
                        + Add Skill
                    </button>
                </div>

                {/* Experience */}
                <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={formData?.experience}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2"
                />

                {/* Location */}
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData?.city}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData?.state}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData?.country}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2"
                />

                <div className="col-span-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="relocationRequired"
                        checked={formData?.relocationRequired}
                        onChange={handleChange}
                    />
                    <label>Relocation Required</label>
                </div>

                {/* Company & Image */}
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData?.company}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobImage"
                    placeholder="Job Image URL"
                    value={formData?.jobImage}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="col-span-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                >
                    Submit Job
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default EditJob;
