import { Outlet } from "react-router";
import "../index.css";
import Navber from "../Components/Navber";
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black roboto overflow-x-hidden">
      <Navber/>
      <Outlet/>
    </div>
  );
};

export default MainLayout;