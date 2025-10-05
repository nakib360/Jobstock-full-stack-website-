import { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar, FaBuilding, FaBriefcase, FaDollarSign, FaHeart, FaRegHeart } from "react-icons/fa";
import AuthContext from "../Authantiation/AuthContext";
import axios from "axios";

const DetailsCard = ({ data }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data[0]);
        console.log(data)
      })
  }, [user?.email]);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  const handleApply = (userId) => {
    axios.post(`http://localhost:3000/jobs/${data?._id}`, { userId })
      .then(res => {
        console.log(res)
        console.log(userId, "is added")
      })

    axios.post(`http://localhost:3000/users/${userData?._id}`, { jobId: data._id })
      .then(res => {
        console.log(res)
        console.log(data?._id, "is added" )
      })

    // console.log("UserId :", userId, ",", "jobid :", data?._id);
  }

  return (
    <div className=" p-10 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header with Job Image */}
      <div className="flex justify-center items-center gap-2">
        <img
          src={data?.jobImage}
          alt={data?.jobName}
          className="w-20"
        />
        <div className="">
          <h2 className="text-gray-900 text-3xl font-bold">{data?.jobName}</h2>
        </div>
      </div>

      {/* Job Info Section */}
      <div className="p-6 space-y-6">
        {/* Title & Company */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {data?.jobTitle}
          </h3>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          <div className="flex items-center gap-2 mt-2 text-gray-600">
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
            <span>
              {data?.salary.min} - {data?.salary.max} {data?.salary.currency} (
              {data?.salary.period})
            </span>
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
              {data?.department}
            </span>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Job Description
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {data?.jobDescription}
          </p>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Requirements
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            {data?.requirements.education.map((edu, idx) => (
              <li key={idx}>{edu}</li>
            ))}
            <li>
              <strong>Skills:</strong> {data?.requirements.skills.join(", ")}
            </li>
            <li>
              <strong>Experience:</strong> {data?.requirements.experience}
            </li>
          </ul>
        </div>

        {/* Responsibilities */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Responsibilities
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            {data?.responsibilities.map((res, idx) => (
              <li key={idx}>{res}</li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Qualifications
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            {data?.qualifications.map((qual, idx) => (
              <li key={idx}>{qual}</li>
            ))}
          </ul>
        </div>

        {/* Work Location */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Work Location
          </h4>
          <p className="text-gray-600 text-sm">
            {data?.workLocation.city}, {data?.workLocation.state},{" "}
            {data?.workLocation.country}{" "}

          </p>
        </div>

        {/* Apply Button */}
        <div className="pt-3 flex items-center gap-5">
          <button onClick={() => handleApply(userData?._id)} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md font-medium transition">
            Apply Now
          </button>

          <button
            onClick={toggleFavorite}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: isFavorited ? 'red' : 'gray',
            }}
            aria-label="Toggle Favorite"
          >
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </button>


        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
