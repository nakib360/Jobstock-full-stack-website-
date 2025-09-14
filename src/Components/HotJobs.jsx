import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonLoader from "./SkeletonLoader";

const HotJobs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
    }, []);

    return (
        <div className="p-10 space-y-4">
            <p className="text-4xl font-semibold text-center">Featured Jobs</p>
            <p className="text-sm text-center">Stay ahead with opportunities that match your career goals, connect with leading employers, and take the next step toward building the future you deserve.</p>
            <div>
            </div>
            {/* all jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    loading ? (
                        Array(4).fill().map((_, i) => <SkeletonLoader key={i} />)
                    ) : (
                        data.map(job => <JobCard key={job.id} loading={loading} job={job} />)
                    )
                }
            </div>
        </div>
    );
};

export default HotJobs;