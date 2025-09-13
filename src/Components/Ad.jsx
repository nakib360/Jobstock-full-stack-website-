import slack from "../assets/slack.png";
import paypal from "../assets/paypal.png";
import microsoft from "../assets/microsoft.png";
import ebay from "../assets/ebay.png";
import amazon from "../assets/amazon.png";

const Ad = () => {
  return (
    <div className="bg-[#04343a] p-10 space-y-6">
      <p className="text-gray-300 text-center text-2xl">The fastest growing companies use JobStock</p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        <img className="w-50" src={slack} alt="" />
        <img className="w-50" src={paypal} alt="" />
        <img className="w-50" src={microsoft} alt="" />
        <img className="w-40" src={ebay} alt="" />
        <img className="w-50" src={amazon} alt="" />
      </div>
    </div>
  );
};

export default Ad;