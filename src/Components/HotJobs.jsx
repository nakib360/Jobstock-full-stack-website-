import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import JobCard from "./JobCard";
import SkeletonLoader from "./SkeletonLoader";
import { useLocation } from "react-router";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "../index.css"

const HotJobs = ({ limit }) => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [loading, setLoading] = useState(true);
    const [innerText, setInnerText] = useState(false);
    const location = useLocation();
    const sortingOptions = [
        { option: "Ascending of Salary", value: "ascending" },
        { option: "Descending of Salary", value: "descending" }
    ]

    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
    }, []);

    const finalData = useMemo(() => {
        let filtered = data;

        if (limit && data.length > 0) {
            filtered = [...data].sort(() => {
                return Math.random() - 0.5
            }).slice(0, limit)
        }

        if (searchQuery && searchQuery.length > 0) {
            filtered = data.filter(job => {
                return job.jobName.toLowerCase().includes(searchQuery.toLowerCase())
            })
        }

        if (sortOrder && sortOrder.length > 0) {
            filtered = [...data].sort((a, b) => {
                if (sortOrder === "ascending") {
                    return a?.salary?.min - b?.salary?.min
                } else if (sortOrder === "descending") {
                    return b?.salary?.min - a?.salary?.min
                }
            })
        }

        return filtered
    }, [data, limit, searchQuery, sortOrder]);

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
                        <div className="bg-[#0b8260] rounded-xl p-10 flex justify-between items-center">

                            <div className="relative w-full max-w-sm">
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setInnerText(e.target.value.length > 0 ? true : false)
                                        setSearchQuery(e.target.value)
                                    }}
                                    placeholder="Search your dream job"
                                    className="text-white placeholder:text-white/40 placeholder:text-sm w-full max-w-sm border border-gray-300 focus:ring-2 focus:ring-white focus:border-white/10 p-2 rounded-xl outline-none shadow-sm transition"
                                />
                                <FaSearch className={`${innerText ? "text-white" : "text-white/40"} absolute right-3 top-1/2 -translate-y-1/2 text-sm`} />
                            </div>

                            <div className="relative flex justify-center items-center gap-1">
                                <select
                                    value={sortOrder}
                                    onChange={e => setSortOrder(e.target.value)}
                                    className=" text-black border border-white/30 bg-white focus:border-white/30 p-3 rounded-xl outline-none shadow-sm transition-all font-bold"
                                >
                                    <option className="roboto font-semibold" value="" disabled>Sort by</option>
                                    {
                                        sortingOptions.map((opt, idx) => (
                                            <option key={idx} className="roboto font-semibold" value={opt.value}>{opt.option}</option>
                                        ))
                                    }
                                </select>
                                {
                                    sortOrder.length > 0 && (
                                        <button
                                            onClick={() => setSortOrder("")}
                                            className="p-3 rounded-xl bg-red-200 text-red-600 text-2xl font-bold"
                                        >
                                            <RxCross2 />
                                        </button>
                                    )
                                }
                            </div>

                        </div>
                    )
            }
            {/* all jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    loading ? (
                        Array(3).fill().map((_, idx) => <SkeletonLoader key={idx} />)
                    ) : (
                        finalData.map(job => <JobCard key={job._id} loading={loading} job={job} />)
                    )
                }
            </div>
        </div>
    );
};

export default HotJobs;