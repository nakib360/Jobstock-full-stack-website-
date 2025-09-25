import { Outlet } from "react-router";
import "../index.css";
import Navber from "../Components/Navber";
import { Helmet } from "react-helmet";
import "../index.css";
import Footer from "../Components/Footer";
import { useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-white text-black roboto overflow-x-hidden bg-dot" >
      <Helmet>
        <title>JOB STOCK - Find Your Dream Job</title>
        <meta name="description" content="Best job search platform for your career." />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Helmet>

      <Navber />
      <div className={`${user ? "mt-19" : "mt-24"}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;