import { useContext, useState, useEffect } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLocalPhone, MdOutlineDateRange, MdOutlineSecurityUpdateGood } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoLogoLinkedin, IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/users?email=${user?.email}`, {withCredentials: true})
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  return (
    <div className="p-4 sm:p-8 relative">
      {/* Profile Avatar */}
      <div className="absolute bg-white rounded-full border-4 border-white md:left-15 left-1/2 -translate-x-1/2 md:-translate-x-0 flex flex-col items-center md:items-start">
        <div className={`relative border-4 ${data?.admin ? "border-[#ffcc00]" : "border-[#0b8260]"} rounded-full p-1`}>
          {loading ? (
            <Skeleton circle width={118} height={118} />
          ) : (
            <>
              {data?.admin && (
                <p className="absolute right-0 bg-[#ffcc00] text-black font-semibold px-2 py-[2px] rounded-full text-[8px] shadow-md uppercase tracking-wide">
                  Admin
                </p>
              )}
              <img
                className="w-[120px] h-[120px] rounded-full object-cover"
                src={
                  data?.avatar && data?.avatar.length > 0
                    ? data?.avatar
                    : "https://img.pikbest.com/png-images/20250228/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette_11563975.png!sw800"
                }
                alt="user avatar"
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-20 bg-gray-100 px-4 sm:px-8 py-8 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section */}
        <div className="mt-10 lg:col-span-4">
          {loading ? (
            <>
              <Skeleton width={150} height={25} />
              <Skeleton width={200} height={15} className="mt-2" />
              <div className="mt-10 space-y-3">
                <Skeleton width={180} height={15} />
                <Skeleton width={150} height={15} />
                <Skeleton width={120} height={15} />
              </div>
            </>
          ) : (
            <>
              {data?.displayName && (
                <p className="text-2xl font-bold text-center md:text-left">{data?.displayName}</p>
              )}
              {data?.bio && (
                <p className="text-sm text-gray-500 text-center md:text-left">{data?.bio}</p>
              )}

              <div className="mt-8 space-y-3 text-gray-700">
                {data?.email && (
                  <p className="flex items-center gap-2">
                    <HiOutlineMail className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm break-all">{data?.email}</span>
                  </p>
                )}
                {data?.phoneNumber && (
                  <p className="flex items-center gap-2">
                    <MdOutlineLocalPhone className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm">{data?.phoneNumber}</span>
                  </p>
                )}
                {data?.birthDate && (
                  <p className="flex items-center gap-2">
                    <MdOutlineDateRange className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm">{data?.birthDate}</span>
                  </p>
                )}
                {data?.social?.website && (
                  <p className="flex items-center gap-2">
                    <TbWorld className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm break-all">{data?.social.website}</span>
                  </p>
                )}
                {data?.social?.linkedin && (
                  <p className="flex items-center gap-2">
                    <IoLogoLinkedin className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm break-all">{data?.social.linkedin}</span>
                  </p>
                )}
                {data?.social?.twitter && (
                  <p className="flex items-center gap-2">
                    <FaXTwitter className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm break-all">{data?.social.twitter}</span>
                  </p>
                )}
                {data?.social?.facebook && (
                  <p className="flex items-center gap-2">
                    <IoLogoFacebook className="text-lg flex-shrink-0" />{" "}
                    <span className="text-sm break-all">{data?.social.facebook}</span>
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <FaUserCheck className="text-lg flex-shrink-0" />{" "}
                  <span className="text-sm">Created at {data?.createdAt}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineSecurityUpdateGood className="text-lg flex-shrink-0" />{" "}
                  <span className="text-sm">Updated at {data?.updatedAt}</span>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-[2px] bg-gray-300 rounded-full"></div>

        {/* Right Section */}
        <div className="lg:col-span-7 space-y-8">
          {/* Skills */}
          <div>
            <p className="text-2xl font-semibold mb-4">Skills</p>
            <div className="bg-white shadow-sm hover:shadow-md transition p-4 rounded-xl flex flex-wrap gap-3">
              {loading
                ? Array(5)
                  .fill(0)
                  .map((_, idx) => <Skeleton key={idx} width={80} height={25} />)
                : data?.skills?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 text-white rounded-full px-4 py-2 text-xs font-medium cursor-default hover:bg-emerald-600 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="text-2xl font-semibold mb-4">Education</p>
            <div className="bg-white shadow-sm hover:shadow-md transition p-4 rounded-xl flex flex-wrap gap-3">
            {/* <div className="space-y-4"> */}
              {loading
                ? Array(2)
                  .fill(0)
                  .map((_, idx) => <Skeleton key={idx} height={80} />)
                : data?.education?.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-sm hover:shadow-md transition p-4 rounded-xl cursor-default"
                  >
                    <p className="text-lg font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startYear} - {edu.endYear} • {edu.result}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
