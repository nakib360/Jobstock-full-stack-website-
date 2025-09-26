import DashBoardAside from "../Components/DashBoardAside";
import UserProfile from "../Components/UserProfile";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <DashBoardAside />
      </div>
      <div className="col-span-10">
        <UserProfile />
      </div>
    </div>
  );
};

export default DashboardPage;