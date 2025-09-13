import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const HotJobs = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
    }, []);

    return (
        <div className="p-10 space-y-4">
            <p className="text-4xl font-semibold text-center">Featured Jobs</p>
            <p className="text-sm text-center">Stay ahead with opportunities that match your career goals, connect with leading employers, and take the next step toward building the future you deserve.</p>
            <div>
                <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton bg-gray-400 h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
            {/* all jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    data.map(job => <JobCard key={job.id} job={job} />)
                }
            </div>
        </div>
    );
};

export default HotJobs;