import React from "react";

const userData = {
  displayName: "ijxijixd najnzajn",
  email: "jiwsjw@jiedj.com",
  phoneNumber: "2218331",
  gender: "male",
  birthDate: "0003-02-09",
  bio: "Passionate developer and lifelong learner.",
  avatar: "", // যদি কোনো profile picture থাকে, URL এখানে দিন
  social: { website: "", linkedin: "", twitter: "", facebook: "" },
  privacy: { profilePublic: true, showEmail: false, showPhone: false },
  activity: { postsCount: 0 },
  skills: ["React", "JavaScript", "TailwindCSS"],
  education: [
    { degree: "B.Sc in Computer Science", institution: "Chittagong College", year: 2025 },
  ],
  createdAt: "September 24, 2025 at 12:51 PM",
  updatedAt: "September 24, 2025 at 12:52 PM",
};

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-white to-sky-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-500 text-white p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={userData.avatar || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold">{userData.displayName}</h1>
            <p className="mt-2 text-white/80">{userData.bio || "No bio available."}</p>
            <div className="mt-4 flex justify-center md:justify-start gap-4 text-white/90">
              {userData.social.website && <a href={userData.social.website} className="hover:underline">Website</a>}
              {userData.social.linkedin && <a href={userData.social.linkedin} className="hover:underline">LinkedIn</a>}
              {userData.social.twitter && <a href={userData.social.twitter} className="hover:underline">Twitter</a>}
              {userData.social.facebook && <a href={userData.social.facebook} className="hover:underline">Facebook</a>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Personal Info & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Contact Info</h2>
              <p><span className="font-medium">Email:</span> {userData.privacy.showEmail ? userData.email : "Hidden"}</p>
              <p><span className="font-medium">Phone:</span> {userData.privacy.showPhone ? userData.phoneNumber : "Hidden"}</p>
              <p><span className="font-medium">Gender:</span> {userData.gender}</p>
              <p><span className="font-medium">Birth Date:</span> {userData.birthDate}</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-4 text-sky-600">Activity</h2>
              <p><span className="font-medium">Posts:</span> {userData.activity.postsCount}</p>
              <p><span className="font-medium">Account Created:</span> {userData.createdAt}</p>
              <p><span className="font-medium">Last Updated:</span> {userData.updatedAt}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Skills</h2>
            {userData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p>No skills added.</p>
            )}
          </div>

          {/* Education */}
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4 text-rose-600">Education</h2>
            {userData.education.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {userData.education.map((edu, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{edu.degree}</span> - {edu.institution} ({edu.year})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No education details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
