import Ad from "../Components/Ad";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import HotJobs from "../Components/HotJobs";
import Need from "../Components/Need";
import Services from "../Components/Services";
import Spetialities from "../Components/Spetialities";

const HomePage = () => {
  return (
    <div>
      <div className="z-30 mt-24">
        <Header />
        <Ad />
        <HotJobs/>
        <Spetialities/>
        <Services/>
        <Need/>
        <Contact/>
      </div>
    </div>
  );
};

export default HomePage;