import { Outlet } from "react-router";
import "../index.css";
import Navber from "../Components/Navber";
import { Helmet } from "react-helmet";
import "../index.css";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black roboto overflow-x-hidden bg-dot" >
      <Helmet>
        <title>JOB STOCK - Find Your Dream Job</title>
        <meta name="description" content="Best job search platform for your career." />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Helmet>

      <Navber />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;