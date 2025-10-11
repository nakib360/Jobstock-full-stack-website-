import slack from "../assets/slack.png";
import paypal from "../assets/paypal.png";
import microsoft from "../assets/microsoft.png";
import ebay from "../assets/ebay.png";
import amazon from "../assets/amazon.png";

const Ad = () => {
  return (
    <div className="bg-[#04343a] space-y-6">
      <p className="text-gray-300 text-center text-lx md:text-2xl pt-5 px-2">The fastest growing companies use JobStock</p>
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 p-10 pt-0">
        <img className="w-30 md:w-50" src={slack} alt="" />
        <img className="w-30 md:w-50" src={paypal} alt="" />
        <img className="w-30 md:w-50" src={microsoft} alt="" />
        <img className="w-20 md:w-30" src={ebay} alt="" />
        <img className="w-20 md:w-40" src={amazon} alt="" />
      </div>
    </div>
  );
};

export default Ad;