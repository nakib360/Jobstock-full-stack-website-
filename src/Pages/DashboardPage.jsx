import { Outlet } from "react-router";
import DashBoardAside from "../Components/DashBoardAside";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <DashBoardAside />
      </div>
      <div className="col-span-10">
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardPage;