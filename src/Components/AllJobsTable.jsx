import { useLoaderData } from "react-router";

const AllJobsTable = () => {
    const loadedData = useLoaderData();

    return (
        <div>
            <div className="bg-[#04343a] shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-500">Jobs</h2>
                <table className="w-full table-auto border-collapse border border-white">
                    <thead>
                        <tr className="bg-white/20">
                            <th className="border border-white px-4 py-2">Job Name</th>
                            <th className="border border-white px-4 py-2">Job Type</th>
                            <th className="border border-white px-4 py-2">Location</th>
                            <th className="border border-white px-4 py-2">Ratings</th>
                            <th className="border border-white px-4 py-2">Aplicants</th>
                            <th className="border border-white px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loadedData.map(job => (
                                <tr>
                                    <td className="border border-white/50 px-4 py-2">{job?.jobName}</td>
                                    <td className="border border-white/50 px-4 py-2">{job?.jobType}</td>
                                    <td className="border border-white/50 px-4 py-2">{job?.location}</td>
                                    <td className="border border-white/50 px-4 py-2">{job?.rating}</td>
                                    <td className="border border-white/50 px-4 py-2">{job?.appliedUsers?.length || 0}</td>
                                    <td className="border border-white/50 px-4 py-2 space-x-2">
                                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllJobsTable;