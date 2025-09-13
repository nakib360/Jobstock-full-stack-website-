import Ad from "../Components/Ad";
import Header from "../Components/Header";
import HotJobs from "../Components/HotJobs";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="z-30">
        <Ad />
        <HotJobs/>
      </div>
    </div>
  );
};

export default HomePage;