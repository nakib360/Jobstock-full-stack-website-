import { FaUsers, FaBriefcase, FaClipboardList, FaCogs, FaSignOutAlt } from "react-icons/fa";

const AdminPanelAsideNav = () => {
    const sidebarLinks = [
        { name: "Dashboard", icon: <FaClipboardList /> },
        { name: "Manage Users", icon: <FaUsers /> },
        { name: "Manage Jobs", icon: <FaBriefcase /> },
        { name: "Site Settings", icon: <FaCogs /> },
    ];

    return (
        <div>
            <div className="h-screen bg-white shadow-lg flex flex-col">
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
            </div>
        </div>
    );
};

export default AdminPanelAsideNav;