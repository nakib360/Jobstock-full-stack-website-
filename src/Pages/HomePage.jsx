import Ad from "../Components/Ad";
import Header from "../Components/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="z-30">
        <Ad />
      </div>
    </div>
  );
};

export default HomePage;