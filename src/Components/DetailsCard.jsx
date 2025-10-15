import { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar, FaBuilding, FaBriefcase, FaDollarSign, FaHeart, FaRegHeart } from "react-icons/fa";
import AuthContext from "../Authantiation/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const DetailsCard = ({ data }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user, signOutUser, setShowLoginModel } = useContext(AuthContext)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/users?email=${user?.email}`, { withCredentials: true })
      .then(data => {
        setUserData(data.data[0]);
        //console.log(data)
      })
      .catch(error => {
        if (error.response?.status === 401) {
          toast.error("Session expired! Please login again.");
          signOutUser();
          setShowLoginModel(true);
        }
      })
  }, [user?.email, signOutUser, setShowLoginModel]);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  const handleApply = (userId) => {
    axios.post(`${import.meta.env.VITE_API}/jobs/${data?._id}`, { userId }, { withCredentials: true })
      .then(res => {
        //console.log(res)
        toast.success(`${userData?.displayName} is successfully applied.`)
      })
      .catch(error => {
        if (error.response?.status === 401) {
          toast.error("Session expired! Please login again.");
          signOutUser();
          setShowLoginModel(true);
        }
      })

    axios.post(`${import.meta.env.VITE_API}/users/${userData?._id}`, { jobId: data._id }, { withCredentials: true })
      .then(res => {
        //console.log(res)
        toast.success(`${data?.jobName} is successfully applied.`)
      })
      .catch(error => {
        if (error.response?.status === 401) {
          toast.error("Session expired! Please login again.");
          signOutUser();
          setShowLoginModel(true);
        }
      })

    // //console.log("UserId :", userId, ",", "jobid :", data?._id);
  }

  return (
    <div className="p-5 sm:p-8 md:p-10 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 max-w-5xl">

      {/* Header with Job Image */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
        <img
          src={data?.jobImage}
          alt={data?.jobName}
          className="w-24"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold">{data?.jobName}</h2>
          <h3 className="text-gray-700 text-sm sm:text-base mt-1">{data?.jobTitle}</h3>
        </div>
      </div>

      {/* Job Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 mb-6">
        <div className="flex items-center gap-2">
          <FaBuilding className="text-emerald-600" />
          <span>{data?.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-emerald-600" />
          <span className="font-medium">{data?.jobType}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-emerald-600" />
          <span>{data?.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span>{data?.rating} / 5</span>
        </div>
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-emerald-600" />
          <span>{data?.salary?.min} - {data?.salary?.max} {data?.salary?.currency} ({data?.salary?.period})</span>
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">{data?.department}</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h4>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{data?.jobDescription}</p>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
            {data?.requirements?.education?.map((edu, idx) => <li key={idx}>{edu}</li>)}
            <li><strong>Skills:</strong> {data?.requirements?.skills?.join(", ")}</li>
            <li><strong>Experience:</strong> {data?.requirements?.experience}</li>
          </ul>
        </div>

        {/* Responsibilities */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
            {data?.responsibilities?.map((res, idx) => <li key={idx}>{res}</li>)}
          </ul>
        </div>

        {/* Qualifications */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Qualifications</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
            {data?.qualifications?.map((qual, idx) => <li key={idx}>{qual}</li>)}
          </ul>
        </div>

        {/* Work Location */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Work Location</h4>
          <p className="text-gray-600 text-sm sm:text-base">{data?.workLocation?.city}, {data?.workLocation?.state}, {data?.workLocation?.country}</p>
        </div>
      </div>

      {/* Apply & Favorite Buttons */}
      <div className="pt-6 flex items-center gap-4 sm:gap-6">
        {userData?.myAppliedJobs?.includes(data?._id) ? (
          <button disabled className="px-6 py-3 bg-emerald-600 text-white rounded-xl shadow-md font-medium transition cursor-not-allowed opacity-50 w-full sm:w-auto">
            Already Applied
          </button>
        ) : (
          <button onClick={() => handleApply(userData?._id)} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md font-medium transition w-full sm:w-auto">
            Apply Now
          </button>
        )}

        <button
          onClick={toggleFavorite}
          className={`text-2xl ${isFavorited ? "text-red-500" : "text-gray-400"} transition`}
          aria-label="Toggle Favorite"
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>

  );
};

export default DetailsCard;
