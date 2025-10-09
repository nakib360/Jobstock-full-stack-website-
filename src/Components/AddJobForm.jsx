import { useContext, useState } from "react";
import AuthContext from "../Authantiation/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddJobForm = ({ closeModal, hotUpdate }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        jobType: "",
        jobName: "",
        jobAuthor: user?.email || "",
        jobTitle: "",
        location: "",
        rating: "",
        department: "",
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        period: "PA",
        jobDescription: "",
        requirements: [""],
        skills: [""],
        experience: "",
        responsibilities: [""],
        qualifications: [""],
        city: "",
        state: "",
        country: "",
        relocationRequired: false,
        jobImage: "",
        company: "",
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data according to standard structure
        const payload = {
            ...formData,
            salaryMin: formData.salaryMin,
            salaryMax: formData.salaryMax,
            currency: formData.currency,
            period: formData.period,
        };

        axios.put("http://localhost:3000/jobs", { payload })
            .then(res => {
                console.log(res)
                if (res?.data?.insertedId?.length > 0) {
                    toast.success("You are successfully added a job.");
                    hotUpdate();
                } else {
                    toast.error("Something went wrong.")
                }
                closeModal();
            })

    };

    return (
        <div className="max-w-4xl mx-auto bg-white px-8 pb-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Add New Job</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                <input
                    type="text"
                    name="jobType"
                    placeholder="Job Type"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobName"
                    placeholder="Job Name"
                    value={formData.jobName}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobAuthor"
                    placeholder="Job Author"
                    value={formData.jobAuthor}
                    readOnly
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="salaryMin"
                    placeholder="Salary Min"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="salaryMax"
                    placeholder="Salary Max"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <textarea
                    name="jobDescription"
                    placeholder="Job Description"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2 h-32"
                />

                {/* Requirements */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Requirements</label>
                    {formData.requirements.map((req, idx) => (
                        <input
                            key={idx}
                            type="text"
                            placeholder={`Requirement ${idx + 1}`}
                            value={req}
                            onChange={(e) => handleArrayChange(e, "requirements", idx)}
                            className="border p-2 rounded w-full mb-2"
                        />
                    ))}
                    <button type="button" onClick={() => addArrayField("requirements")} className="text-green-600 underline text-sm">
                        + Add Requirement
                    </button>
                </div>

                {/* Skills */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Skills</label>
                    {formData.skills.map((skill, idx) => (
                        <input
                            key={idx}
                            type="text"
                            placeholder={`Skill ${idx + 1}`}
                            value={skill}
                            onChange={(e) => handleArrayChange(e, "skills", idx)}
                            className="border p-2 rounded w-full mb-2"
                        />
                    ))}
                    <button type="button" onClick={() => addArrayField("skills")} className="text-green-600 underline text-sm">
                        + Add Skill
                    </button>
                </div>

                <input
                    type="text"
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-2"
                />

                <div className="col-span-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="relocationRequired"
                        checked={formData.relocationRequired}
                        onChange={handleChange}
                    />
                    <label>Relocation Required</label>
                </div>

                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="jobImage"
                    placeholder="Job Image URL"
                    value={formData.jobImage}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <button type="submit" className="col-span-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
                    Submit Job
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddJobForm;
