import { useContext } from "react";
import { FaUsers, FaBriefcase, FaClipboardList, FaCogs, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../Authantiation/AuthContext";
// import AuthContext from "../Authentication/AuthContext";

const AdminPanel = () => {
  const { signOutUser, admin } = useContext(AuthContext);

  // শুধুমাত্র admin দেখতে পারবে
  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-bold">Access Denied. Admins Only.</p>
      </div>
    );
  }

  const sidebarLinks = [
    { name: "Dashboard", icon: <FaClipboardList /> },
    { name: "Manage Users", icon: <FaUsers /> },
    { name: "Manage Jobs", icon: <FaBriefcase /> },
    { name: "Site Settings", icon: <FaCogs /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
        <ul className="flex-1 p-4 space-y-4">
          {sidebarLinks.map((link, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer"
            >
              {link.icon}
              <span>{link.name}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={signOutUser}
          className="flex items-center gap-2 p-4 m-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Example metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-lg font-medium">Total Users</h2>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-lg font-medium">Jobs Posted</h2>
            <p className="text-2xl font-bold mt-2">45</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-lg font-medium">Applications</h2>
            <p className="text-2xl font-bold mt-2">87</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">john@example.com</td>
                <td className="border px-4 py-2">Admin</td>
                <td className="border px-4 py-2 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Jane Smith</td>
                <td className="border px-4 py-2">jane@example.com</td>
                <td className="border px-4 py-2">User</td>
                <td className="border px-4 py-2 space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
