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
    salary: { min: "", max: "", currency: "USD", period: "PA" },
    jobDescription: "",
    requirements: { education: [""], skills: [""], experience: "" },
    responsibilities: [""],
    qualifications: [""],
    workLocation: { city: "", state: "", country: "", relocationRequired: false },
    jobImage: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["salaryMin", "salaryMax", "salaryCurrency", "salaryPeriod"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [name === "salaryMin"
            ? "min"
            : name === "salaryMax"
            ? "max"
            : name === "salaryCurrency"
            ? "currency"
            : "period"]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (["city", "state", "country", "relocationRequired"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        workLocation: { ...prev.workLocation, [name]: type === "checkbox" ? checked : value },
      }));
    } else if (name === "experience") {
      setFormData((prev) => ({
        ...prev,
        requirements: { ...prev.requirements, experience: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleArrayChange = (e, field, index) => {
    if (["education", "skills"].includes(field)) {
      const newArray = [...formData.requirements[field]];
      newArray[index] = e.target.value;
      setFormData((prev) => ({
        ...prev,
        requirements: { ...prev.requirements, [field]: newArray },
      }));
    } else {
      const newArray = [...formData[field]];
      newArray[index] = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: newArray }));
    }
  };

  const addArrayField = (field) => {
    if (["education", "skills"].includes(field)) {
      setFormData((prev) => ({
        ...prev,
        requirements: { ...prev.requirements, [field]: [...prev.requirements[field], ""] },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API}/jobs`, { formData }, { withCredentials: true })
      .then((res) => {
        if (res?.data?.insertedId?.length > 0) {
          toast.success("Job added successfully.");
          hotUpdate();
        } else {
          toast.error("Something went wrong.");
        }
        closeModal();
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white px-4 sm:px-6 md:px-8 pt-0 py-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-green-600 text-center md:text-left">Add New Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Basic Fields */}
        <input type="text" name="jobType" placeholder="Job Type" value={formData.jobType} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="jobName" placeholder="Job Name" value={formData.jobName} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="border p-2 rounded w-full md:col-span-2" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="jobAuthor" placeholder="Job Author" value={formData.jobAuthor} readOnly className="border p-2 rounded w-full" />

        {/* Salary */}
        <input type="number" name="salaryMin" placeholder="Salary Min" value={formData.salary.min} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="number" name="salaryMax" placeholder="Salary Max" value={formData.salary.max} onChange={handleChange} className="border p-2 rounded w-full" />

        {/* Job Description */}
        <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} className="border p-2 rounded w-full md:col-span-2 h-32" />

        {/* Education */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Education</label>
          {formData.requirements.education.map((req, idx) => (
            <input key={idx} type="text" placeholder={`Education ${idx + 1}`} value={req} onChange={(e) => handleArrayChange(e, "education", idx)} className="border p-2 rounded w-full mb-2" />
          ))}
          <button type="button" onClick={() => addArrayField("education")} className="text-green-600 underline text-sm">+ Add Education</button>
        </div>

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Skills</label>
          {formData.requirements.skills.map((skill, idx) => (
            <input key={idx} type="text" placeholder={`Skill ${idx + 1}`} value={skill} onChange={(e) => handleArrayChange(e, "skills", idx)} className="border p-2 rounded w-full mb-2" />
          ))}
          <button type="button" onClick={() => addArrayField("skills")} className="text-green-600 underline text-sm">+ Add Skill</button>
        </div>

        {/* Experience */}
        <input type="text" name="experience" placeholder="Experience" value={formData.requirements.experience} onChange={handleChange} className="border p-2 rounded w-full md:col-span-2" />

        {/* Responsibilities */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Responsibilities</label>
          {formData.responsibilities.map((item, idx) => (
            <input key={idx} type="text" placeholder={`Responsibilities ${idx + 1}`} value={item} onChange={(e) => handleArrayChange(e, "responsibilities", idx)} className="border p-2 rounded w-full mb-2" />
          ))}
          <button type="button" onClick={() => addArrayField("responsibilities")} className="text-green-600 underline text-sm">+ Add Responsibilities</button>
        </div>

        {/* Qualifications */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Qualifications</label>
          {formData.qualifications.map((item, idx) => (
            <input key={idx} type="text" placeholder={`Qualifications ${idx + 1}`} value={item} onChange={(e) => handleArrayChange(e, "qualifications", idx)} className="border p-2 rounded w-full mb-2" />
          ))}
          <button type="button" onClick={() => addArrayField("qualifications")} className="text-green-600 underline text-sm">+ Add Qualifications</button>
        </div>

        {/* Work Location */}
        <input type="text" name="city" placeholder="City" value={formData.workLocation.city} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="state" placeholder="State" value={formData.workLocation.state} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="country" placeholder="Country" value={formData.workLocation.country} onChange={handleChange} className="border p-2 rounded w-full md:col-span-2" />
        <div className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" name="relocationRequired" checked={formData.workLocation.relocationRequired} onChange={handleChange} />
          <label>Relocation Required</label>
        </div>

        {/* Company & Image */}
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="text" name="jobImage" placeholder="Job Image URL" value={formData.jobImage} onChange={handleChange} className="border p-2 rounded w-full" />

        {/* Submit */}
        <button type="submit" className="md:col-span-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors w-full">
          Submit Job
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddJobForm;
