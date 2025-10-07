import { useLoaderData } from "react-router";

const AllUsersTable = () => {
    const loadedData = useLoaderData();

    return (
        <div>
            <div className="bg-[#04343a] shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-500">Users</h2>
                <table className="w-full table-auto border-collapse border border-white">
                    <thead>
                        <tr className="bg-white/20">
                            <th className="border border-white px-4 py-2">Name</th>
                            <th className="border border-white px-4 py-2">Email</th>
                            <th className="border border-white px-4 py-2">Password</th>
                            <th className="border border-white px-4 py-2">Role</th>
                            <th className="border border-white px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loadedData.map(user => (
                                <tr>
                                    <td className="border border-white/50 px-4 py-2">{user?.displayName}</td>
                                    <td className="border border-white/50 px-4 py-2">{user?.email}</td>
                                    <td className="border border-white/50 px-4 py-2">{user?.password ? user?.password : "loged by google"}</td>
                                    <td className="border border-white/50 px-4 py-2">{user?.admin ? "Admin" : "User"}</td>
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

export default AllUsersTable;