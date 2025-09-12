import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-black font-Jakarta">
      <Outlet/>
    </div>
  );
};

export default MainLayout;