import axios from "axios";
import { useContext, useEffect, useState } from "react";
import JobCard from "./JobCard";
import AuthContext from "../Authantiation/AuthContext";
import SkeletonLoader from "./SkeletonLoader";
import toast from "react-hot-toast";

const AppliedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [myAppliedJobs, setMyAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, signOutUser, setShowLoginModel } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/jobs`, {withCredentials: true})
            .then((res) => {
                //console.log(res.data)
                setJobs(res.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response?.status === 401) {
                  toast.error("Session expired! Please login again.");
                  signOutUser();
                  setShowLoginModel(true);
                }
              })

        axios.get(`${import.meta.env.VITE_API}/users?email=${user?.email}`, {withCredentials: true})
            .then(data => {
                setMyAppliedJobs(data.data[0]?.myAppliedJobs)
            })
            .catch(error => {
                if (error.response?.status === 401) {
                  toast.error("Session expired! Please login again.");
                  signOutUser();
                  setShowLoginModel(true);
                }
              })
    }, [user?.email, signOutUser, setShowLoginModel])

    let filteredJobs
    if (myAppliedJobs) {
        const jobFilter = jobs.filter(job => myAppliedJobs.includes(job._id));
        filteredJobs = jobFilter
    }


    return (
        <div className="m-4 md:m-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    loading ? Array(3).fill().map((_, idx) => <SkeletonLoader key={idx} />)
                        :
                        filteredJobs?.map(job => (
                            <div key={job._id}>
                                <JobCard job={job} />
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default AppliedJobs;