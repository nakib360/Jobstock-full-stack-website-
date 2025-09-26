import { useContext, useState } from "react";
import { useEffect } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/users?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setData(data[0]);
      })
  }, [user?.email])
  return (
    <div className="p-10 relative">
      <div className="absolute bg-white rounded-full border-4 border-white left-15">
        <div className={`${data?.admin ? "border-[#ffcc00]" : "border-[#0b8260]"} z-10 border-3 p-1 rounded-full w-33 relative`}>
          {
            data?.admin && <p className="absolute right-0 bg-[#ffcc00] text-black font-semibold px-3 py-1 rounded-full text-[8px] shadow-md uppercase tracking-wide">
              Admin
            </p>
          }
          <img className={`w-30 rounded-full`} src={data?.avatar && data?.avatar.length > 0 ? data?.avatar : "https://img.pikbest.com/png-images/20250228/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette_11563975.png!sw800"} alt="" />
        </div>
      </div>

      <div className="mt-20">
        <div className="top-30 bg-gray-200 px-12 pb-10 pt-15 rounded-2xl grid grid-cols-1 md:grid-cols-12">

          <div className="md:col-span-4">
            {
              data?.displayName && (
                <p className="text-xl font-bold">{data?.displayName}</p>
              )
            }
            {
              data?.bio && (
                <p className="text-sm text-gray-500">{data?.bio}</p>
              )
            }

            <div className="mt-10 space-y-3">
              {
                data?.email && (
                  <p className="flex items-center gap-1"><HiOutlineMail /> <span className="text-xs">{data?.email}</span></p>
                )
              }
              {
                data?.phoneNumber && (
                  <p className="flex items-center gap-1"><MdOutlineLocalPhone /> <span className="text-xs">{data?.phoneNumber}</span></p>
                )
              }
              {
                data?.birthDate && (
                  <p className="flex items-center gap-1"><MdOutlineDateRange /> <span className="text-xs">{data?.birthDate}</span></p>
                )
              }
              {
                data?.social?.website && (
                  <p className="flex items-center gap-1"><TbWorld /> <span className="text-xs">{data?.social?.website}</span></p>
                )
              }
              {
                data?.social?.linkedin && (
                  <p className="flex items-center gap-1"><IoLogoLinkedin /> <span className="text-xs">{data?.social?.linkedin}</span></p>
                )
              }
              {
                data?.social?.twitter && (
                  <p className="flex items-center gap-1"><FaXTwitter /> <span className="text-xs">{data?.social?.twitter}</span></p>
                )
              }
              {
                data?.social?.facebook && (
                  <p className="flex items-center gap-1"><IoLogoFacebook /> <span className="text-xs">{data?.social?.facebook}</span></p>
                )
              }
              <p className="flex items-center gap-1"><FaUserCheck /> <span className="text-xs">The account is created at {data?.createdAt}</span></p>
              <p className="flex items-center gap-1"><MdOutlineSecurityUpdateGood /> <span className="text-xs">The account is updated at {data?.updatedAt}</span></p>
            </div>
          </div>

          <div className="w-full md:w-1 h-1 md:h-full bg-gray-500 rounded-full md:col-span-1 my-10 md:my-0"></div>

          <div className="md:col-span-7 space-y-3">
            <div>
              <p className="text-3xl font-semibold">Skills</p>
              <div className="mt-5">
                <div className="bg-gray-100 shadow-sm hover:shadow-md transition p-4 w-full rounded-xl flex flex-wrap gap-3">
                  {data?.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-500 text-white rounded-full px-4 py-2 text-xs font-medium hover:bg-emerald-600 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div>
              <p className="text-3xl font-semibold">Education</p>

              <div className="mt-5 space-y-4">
                {data?.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 shadow-sm hover:shadow-md transition p-4 rounded-xl"
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

    </div>
  );
};

export default UserProfile;