import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";
import DashboardPage from "../Pages/DashboardPage";
import AllJobs from "../Pages/AllJobs";
import AdminPanel from "../Pages/AdminPanel";
import AdminSecureRour from "./AdminSecureRour";
import SecureRout from "./SecureRout";
import UserProfile from "../Components/UserProfile";

const rout = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/allJobs",
                element: <AllJobs />
            },
            {
                path: "/blog",
                element: <div>Blog</div>
            },
            {
                path: "/dashboard",
                element: (
                    <SecureRout>
                        <DashboardPage />
                    </SecureRout>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to={"profile"} replace/>
                    },
                    {
                        path: "profile",
                        element: <UserProfile/>
                    },
                    {
                        path: "postedJobs",
                        element: <p>Posted Jobs</p>
                    },
                    {
                        path: "appliedJobs",
                        element: <p>Applied Jobs</p>
                    },
                    {
                        path: "settings",
                        element: <p>Settings</p>
                    }
                ]
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/signup",
                element: <SignupPage />
            },
            {
                path: "/admin-panel",
                element: (
                    <AdminSecureRour>
                        <AdminPanel />
                    </AdminSecureRour>
                )
            }
        ]
    },
])

export default rout;