import Image from "next/image";
import frontCard from "../../public/images/bg-card-front.png";
import BGBackDesktop from "../../public/images/bg-card-back.png";
import circleCard from "../../public/images/favicon-32x32.png";
import { spaceG_500 } from "../styles/fontsSettings";

const MobileCard = ({
  dataForm: { name, cardNumber, dateMonth, dateYear, CVC },
  showCardData,
}: any) => {
  const cardNumberSpaced = () => {
    if (cardNumber) {
      return cardNumber.match(/.{1,4}/g).join(" ");
    }
  };
  return (
    <div className="w-full h-auto text-black z-10 mt-9 relative">
      {/* back card */}
      <div className="absolute w-9/12 right-4">
        <Image
          src={BGBackDesktop}
          alt="backCard"
          className="absolute"
        />
        <p className="absolute mt-[22%] right-11 text-white">
          {showCardData ? CVC : "000"}
        </p>
      </div>

      {/* front card */}
      <div className="flex w-9/12 relative left-5 mt-[23.5%]">
        <Image
          src={frontCard}
          alt="front credit card"
          className="z-1"
        />
        <Image
          src={circleCard}
          alt="circleCard"
          className="absolute z-2 top-0 left-0 mt-4 ml-4"
        />
        <div className="absolute z-2 top-0 left-0 mt-6 ml-16 border-2 border-white rounded-full w-5 h-5" />

        {/* ID Number Text */}
        <p
          className={`absolute z-2 top-0 left-0 mt-[4.8rem] ml-5  xs:text-md text-lg tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-bold`}
        >
          {showCardData ? cardNumberSpaced() : "0000 0000 0000 0000"}
        </p>

        {/* Name Text */}
        <p
          className={`absolute z-2 bottom-0 left-0 mb-5 ml-4 text-sm tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal w-4/6 overflow-hidden`}
        >
          {showCardData ? name.toUpperCase() : "Name"}
        </p>

        {/* EXP Dates */}
        <div className="flex absolute z-2 right-4 bottom-5">
          {/* Exp Date Text month*/}
          <p
            className={`text-sm tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal`}
          >
            {showCardData ? dateMonth : "12"}
          </p>
          <p className="text-white text-sm">/</p>
          {/* Exp Date Text year*/}
          <p
            className={`text-sm tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal`}
          >
            {showCardData ? dateYear : "23"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
