import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";

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
                path: "/appliedJobs",
                element: <div>Applied Jobs</div>
            },
            {
                path: "/blog",
                element: <div>Blog</div>
            },
            {
                path: "/dashboard",
                element: <div>Dashboard</div>
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