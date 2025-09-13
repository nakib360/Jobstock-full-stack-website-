import * as motion from "motion/react-client"
import logo from "../../public/jobsStockIcon.png"
import { Link, NavLink } from "react-router";
import { FaUserCheck } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const Navber = () => {
    const links = [
        { name: "Home", to: "/" },
        { name: "Dashboard", to: "/dashboard" },
        { name: "Applied Jobs", to: "/appliedJobs" },
        { name: "Blog", to: "/blog" },
    ]

    return (
        <div>
            <motion.div transition={{ duration: 1 }} className="navbar shadow-sm p-5 px-20">
                <div className="navbar-start flex items-center justify-start gap-10">
                    {/* Dropdown for mobile */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
                        >
                            {links.map((link, idx) => (
                                <li className="hover:text-[#0b8260]" key={idx}>
                                    <NavLink className={({ isActive }) => isActive ? "text-yellow-500" : ""} to={link.to} > {link.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Logo + name */}
                    <Link
                        to="#"
                        className="font-bold text-xl flex items-center gap-3"
                    >
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        Job&nbsp;stock
                    </Link>

                    {/* Nav links for desktop */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex gap-6 relative">
                            {links.map((link, idx) => (
                                <li key={idx} className="relative">
                                    <NavLink to={link.to}>
                                        {({ isActive }) => (
                                            <>
                                                <span
                                                    className={`text-gray-700 hover:text-[#0b8260] font-medium`}
                                                >
                                                    {link.name}
                                                </span>

                                                {isActive && (
                                                    <motion.div
                                                        layoutId="underline" // shared layout for smooth transition
                                                        className="absolute left-0 bottom-0 h-0.5 bg-[#0b8260]"
                                                        style={{ width: "100%" }}
                                                        transition={{ duration: 2, type: "spring", stiffness: 500, damping: 30 }}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div >

                <div className="navbar-end space-x-2 ">
                    <Link to={"/signin"} className="flex items-center justify-center gap-2 hover:text-[#0b8260]"><FiLogIn /> Sign In</Link>
                    <Link to={"/signup"} className="bg-[#0b8260] hover:bg-[#3b6e60] p-10 py-4 rounded-sm text-white flex justify-center items-center gap-2"><FaUserCheck /> Sign Up Now</Link>
                </div>
            </motion.div >
        </div >
    );
};

export default Navber;