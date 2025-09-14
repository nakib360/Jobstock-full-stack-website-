import { Outlet } from "react-router";
import "../index.css";
import Navber from "../Components/Navber";
import { Helmet } from "react-helmet";
import logo from "../../public/favicon.ico";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black roboto overflow-x-hidden" >
      <Helmet>
        <title>JOB STOCK - Find Your Dream Job</title>
        <meta name="description" content="Best job search platform for your career." />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>

      <Navber />
      <Outlet />
    </div>
  );
};

export default MainLayout;