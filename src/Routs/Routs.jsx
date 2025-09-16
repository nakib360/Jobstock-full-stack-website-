import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";
import DashboardPage from "../Pages/DashboardPage";
import AllJobs from "../Pages/AllJobs";

const rout = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/allJobs",
                element: <AllJobs/>
            },
            {
                path: "/appliedJobs",
                element: <div>Applied Jobs</div>
            },
            {
                path: "/blog",
                element: <div>Blog</div>
            },
            {
                path: "/dashboard",
                element: <DashboardPage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/signup",
                element: <SignupPage/>
            }
        ]
    },
])

export default rout;