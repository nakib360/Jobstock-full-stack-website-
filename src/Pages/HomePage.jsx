import Ad from "../Components/Ad";
import Header from "../Components/Header";
import HotJobs from "../Components/HotJobs";
import Services from "../Components/Services";
import Spetialities from "../Components/Spetialities";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="z-30">
        <Ad />
        <HotJobs/>
        <Spetialities/>
        <Services/>
      </div>
    </div>
  );
};

export default HomePage;