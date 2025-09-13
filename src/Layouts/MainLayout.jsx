import { Outlet } from "react-router";
import "../index.css";
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black roboto overflow-x-hidden">
      <Outlet/>
    </div>
  );
};

export default MainLayout;