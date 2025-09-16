import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonLoader from "./SkeletonLoader";
import { useLocation } from "react-router";
import { FaSearch } from "react-icons/fa";

const HotJobs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [innerText, setInnerText] = useState(false);
    const location = useLocation();

    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
    }, []);

    return (
        <div className="p-10 space-y-4">
            {
                location.pathname === "/" ?
                    (
                        <div>
                            <p className="text-4xl font-semibold text-center">Featured Jobs</p>
                            <p className="text-sm text-center">Stay ahead with opportunities that match your career goals, connect with leading employers, and take the next step toward building the future you deserve.</p>
                        </div>
                    ) : (
                        <div className="bg-[#0b8260] rounded-xl p-10">
                            {/* input feild */}
                            {/* <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search your dream job"
                                    className="placeholder:text-sm w-full max-w-sm border border-gray-300 focus:ring-2 focus:ring-white focus:border-white/10 focus:ring-blue-400 p-2 rounded-xl outline-none shadow-sm transition"
                                />
                                <FaSearch className="text-sm text-white absolute top-0 right-0"/>
                            </div> */}

                            <div className="relative w-full max-w-sm">
                                <input
                                    type="text"
                                    onChange={(e) => setInnerText(e.target.value.length > 0 ? true : false)}
                                    placeholder="Search your dream job"
                                    className="text-white placeholder:text-white/40 placeholder:text-sm w-full max-w-sm border border-gray-300 focus:ring-2 focus:ring-white focus:border-white/10 focus:ring-blue-400 p-2 rounded-xl outline-none shadow-sm transition"
                                />
                                <FaSearch className={`${innerText ? "text-white" : "text-white/40"} absolute right-3 top-1/2 -translate-y-1/2 text-sm`} />
                            </div>

                        </div>
                    )
            }
            {/* all jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    loading ? (
                        Array(6).fill().map((_, idx) => <SkeletonLoader key={idx} />)
                    ) : (
                        data.map(job => <JobCard key={job.id} loading={loading} job={job} />)
                    )
                }
            </div>
        </div>
    );
};

export default HotJobs;