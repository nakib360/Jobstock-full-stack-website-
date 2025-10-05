import { Outlet } from "react-router";
import "../index.css";
import Navber from "../Components/Navber";
import { Helmet } from "react-helmet";
import "../index.css";
import Footer from "../Components/Footer";
import { useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";
import ScrollProgress from "../Components/ScrollProgress";
import LoginPage from "../Pages/LoginPage";
import { AnimatePresence } from "framer-motion";


const MainLayout = () => {
  const { showLoginModel, user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white text-black roboto overflow-x-hidden bg-dot relative" >
      <ScrollProgress />
      <Helmet>
        <title>JOB STOCK - Find Your Dream Job</title>
        <meta name="description" content="Best job search platform for your career." />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Helmet>

      <Navber />
      <div className={`${user ? "mt-19" : "mt-16 md:mt-24"} z-30`}>
        <Outlet />
      </div>
      <Footer />

      <AnimatePresence>
        {
          showLoginModel && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/2 backdrop-blur-xs">
              <LoginPage />
            </div>
          )
        }
      </AnimatePresence>

    </div>
  );
};

export default MainLayout;