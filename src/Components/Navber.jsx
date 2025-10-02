import * as motion from "motion/react-client";
import logo from "../../public/jobsStockIcon.png";
import { Link, NavLink } from "react-router";
import { FaUserCheck } from "react-icons/fa";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Navber = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [data, setData] = useState({});
    const { user, signOutUser, admin, setShowLoginModel } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:3000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setData(data[0]);
                console.log(data[0])
            })
    }, [user?.email])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const links = [
        { name: "Home", to: "/" },
        { name: "All Jobs", to: "/allJobs" },
        { name: "Dashboard", to: "/dashboard" },
        { name: "Blog", to: "/blog" },
        { name: "Admin Panel", to: "/admin-panel" }
    ];

    const handleLogOut = () => {
        signOutUser()
        .then(() => {
            setShowLoginModel(true);
        })
    }

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: show ? 0 : -120 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full bg-white shadow-sm z-50"
        >
            <div className="navbar p-5 px-20 flex justify-between items-center">
                {/* Navbar Start */}
                <div className="flex items-center gap-10">
                    {/* Mobile dropdown */}
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost flex items-center"
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
                            <li>
                                {links.map((link, idx) => {
                                    if (link.name === "Admin Panel" && !admin) return null;
                                    return (
                                        <li className="hover:text-[#0b8260]" key={idx}>
                                            <NavLink
                                                className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
                                                to={link.to}
                                            >
                                                {link.name}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="#" className="font-bold text-xl flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        Job&nbsp;stock
                    </Link>

                    {/* Desktop nav */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex gap-6 relative">
                            {links.map((link, idx) => {
                                if (link.name === "Admin Panel" && !admin) return null;
                                return (
                                    <li key={idx} className="relative">
                                        <NavLink to={link.to}>
                                            {({ isActive }) => (
                                                <>
                                                    <span
                                                        className={`${isActive ? "text-[#0b8260]" : "text-gray-700"} hover:text-[#0b8260] font-medium`}
                                                    >
                                                        {link.name}
                                                    </span>

                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="underline"
                                                            className="absolute left-0 bottom-0 h-0.5 bg-[#0b8260]"
                                                            style={{ width: "100%" }}
                                                            transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Navbar End */}
                {user ? (
                    <div className="flex items-center gap-2">
                        <a data-tooltip-id="logOut" data-tooltip-content={"Log out"}>
                            <Link onClick={handleLogOut} className="flex items-center gap-2 hover:text-[#0b8260]">
                                <FiLogOut />
                            </Link>
                        </a>
                        <div className={`${admin ? "border-[#ffcc00]" : "border-[#0b8260]"} border-2 rounded-full p-0.5`}>
                            <img className={`w-8 h-8 rounded-full`} src={data?.avatar && data?.avatar.length > 0 ? data?.avatar : "https://img.pikbest.com/png-images/20250228/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette_11563975.png!sw800"} alt="" />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowLoginModel(true)} className="flex items-center gap-2 hover:text-[#0b8260]">
                            <FiLogIn /> Log In
                        </button>
                        <Link
                            to={"/signup"}
                            className="bg-[#0b8260] hover:bg-[#3b6e6003] border border-[#ffffff00] hover:border-[#0b8260] hover:text-[#0b8260] p-4 rounded-sm text-white flex items-center gap-2 transition-all"
                        >
                            <FaUserCheck /> Sign Up Now
                        </Link>
                    </div>
                )}
            </div>
            <Tooltip id="logOut" />
        </motion.div>
    );
};

export default Navber;
