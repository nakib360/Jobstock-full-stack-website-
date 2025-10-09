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
                element: <AllJobs />,
            },
            {
                path: "/jobDetails/:id",
                element: (
                    <SecureRout>
                        <JobDetails/>
                    </SecureRout>
                ),
                loader: ({ params }) => fetch(`http://localhost:3000/jobs/${params.id}`)
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
                        element: <MyPostedJobs/>
                    },
                    {
                        path: "appliedJobs",
                        element: <AppliedJobs/>
                    },
                    {
                        path: "settings",
                        element: <ProfileSettings />
                    }
                ]
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
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to={"allJobs"} replace/>
                    },
                    {
                        path: "allJobs",
                        element: <AllJobsTable/>,
                        loader: () => fetch("http://localhost:3000/jobs")
                    },
                    {
                        path: "allUsers",
                        element: <AllUsersTable/>,
                        loader: () => fetch("http://localhost:3000/users")
                    }
                ]
            }
        ]
    },
])

export default rout;