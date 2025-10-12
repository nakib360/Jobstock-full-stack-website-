// import { Outlet } from "react-router";
// import DashBoardAside from "../Components/DashBoardAside";

// const DashboardPage = () => {
//   return (
//     <div className="grid grid-cols-12">
//       <div className=" col-span-2">
//         <DashBoardAside />
//       </div>
//       <div className="col-span-10">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { Outlet } from "react-router";
import DashBoardAside from "../Components/DashBoardAside";

const DashboardPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="overflow-y-auto">
        <DashBoardAside />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;