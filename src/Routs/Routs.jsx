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
import ProfileSettings from "../Components/ProfileSettings";
import JobDetails from "../Pages/JobDetails";
import AppliedJobs from "../Components/AppliedJobs";
import AllJobsTable from "../Components/AllJobsTable";
import AllUsersTable from "../Components/AllUsersTable";
import MyPostedJobs from "../Components/MyPostedJobs";
import ErrorLayout from "../Layouts/ErrorLayout";
import SignInSecure from "./SignInSecure";
import axios from "axios";

const rout = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/allJobs",
                element: <AllJobs />,
            },
            {
                path: "/jobDetails/:id",
                element: (
                    <SecureRout>
                        <JobDetails />
                    </SecureRout>
                ),
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API}/jobs/${params.id}`)
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
                        element: <Navigate to={"profile"} replace />
                    },
                    {
                        path: "profile",
                        element: <UserProfile />
                    },
                    {
                        path: "postedJobs",
                        element: <MyPostedJobs />
                    },
                    {
                        path: "appliedJobs",
                        element: <AppliedJobs />
                    },
                    {
                        path: "settings",
                        element: <ProfileSettings />
                    }
                ]
            },
            {
                path: "/signup",
                element: (
                    <SignInSecure>
                        <SignupPage />
                    </SignInSecure>
                )
            },
            {
                path: "/admin-panel",
                element: (
                    <AdminSecureRour>
                        <AdminPanel />
                    </AdminSecureRour>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to={"allJobs"} replace />
                    },
                    {
                        path: "allJobs",
                        element: <AllJobsTable />,
                        loader: () => axios.get(`${import.meta.env.VITE_API}/jobs`, {withCredentials: true}).then(res => res.data)
                    },
                    {
                        path: "allUsers",
                        element: <AllUsersTable />,
                        loader: () => axios.get(`${import.meta.env.VITE_API}/users`, {withCredentials: true}).then(res => res.data)
                    }
                ]
            }
        ]
    },
])

export default rout;