import { Link } from "react-router";

const JobCard = ({ job }) => {
    return (
        <div className=" relative bg-white rounded-xl  p-5 border border-black space-y-2 ">
            <div className="flex flex-col items-center gap-2">
                <div className="absolute right-5 text-sm text-[#00684b] bg-[#0b82605e] p-2 py-1 rounded-sm">{job?.jobType}</div>
                <img className="w-20 mt-10" src={job?.jobImage} alt="" />
                <p className="text-sm text-gray-500">{job?.company}</p>
                <p className="font-semibold">{job?.jobName}</p>
                <div className="flex items-center flex-wrap text-center gap-2 justify-center">
                    {
                        job?.requirements?.skills.map((tools, idx) => (
                            <div key={idx} className="text-sm text-gray-500 bg-gray-400/20 p-2 py-1 rounded-sm">{tools}</div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1 font-semibold text-sm">
                    <p>${job?.salary?.min}</p>
                    <p>-</p>
                    <p>&{job?.salary?.max}</p>
                </div>
                <Link to={`/jobDetails/${job._id}`} className="bg-[#0b8260] hover:bg-[#3b6e6003] border border-[#ffffff00] hover:border-[#0b8260] hover:text-[#0b8260] p-8 py-3 rounded-sm text-white flex justify-center items-center gap-2 transition-all">See Details</Link>
            </div>
        </div>
    );
};

export default JobCard;