import { useContext, useEffect, useState } from "react";
import AuthContext from "../Authantiation/AuthContext";
import AdminPanelAsideNav from "../Components/AdminPanelAsideNav";
import axios from "axios";
import { Outlet } from "react-router";

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext)
  const { admin } = useContext(AuthContext);
  const [userLength, setUserLength] = useState(0);
  const [jobLength, setJobLength] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/jobs`)
      .then((res) => {
        console.log(res.data)
        setJobs(res.data);
        setLoading(false);
      })

    axios.get(`http://localhost:3000/users`)
      .then(res => {
        setUsers(res.data)
      })
  }, [user?.email])

  useEffect(() => {
    setUserLength(users?.length);
    setJobLength(jobs?.length)
  }, [users?.length, jobs?.length])

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-bold">Access Denied. Admins Only.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 ">
      {/* Sidebar */}
      <div className="col-span-2">
        <AdminPanelAsideNav />
      </div>
      {/* Main content */}
      <div className="col-span-10 p-8 overflow-auto">

        <div className="flex items-center justify-around gap-6 mb-6">
          <div className="p-6 w-full bg-[#04343a] shadow rounded-lg">
            <h2 className="text-lg font-medium text-green-500">Total Users</h2>
            <p className="text-2xl font-bold mt-2 text-white">{userLength}</p>
          </div>

          <div className="p-6 w-full bg-[#04343a] shadow rounded-lg">
            <h2 className="text-lg font-medium text-green-500">Jobs Posted</h2>
            <p className="text-2xl font-bold mt-2 text-white">{jobLength}</p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
