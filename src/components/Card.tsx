import Image from "next/image";
import frontCard from "../../public/images/bg-card-front.png";
import BGBackDesktop from "../../public/images/bg-card-back.png";
import circleCard from "../../public/images/favicon-32x32.png";
import { spaceG_500 } from "../styles/fontsSettings";
import { useEffect } from "react";

const Card = ({
  dataForm: { name, cardNumber, dateMonth, dateYear, CVC },
  showCardData,
}) => {
  const cardNumberSpaced = () => {
    if (cardNumber) {
      const cardNumberGanti = cardNumber.match(/.{1,4}/g).join(" "); // Make Regex. Masih bingung cara kerjana, tapi ges tiap 4 number di tambah " " spasi
      return cardNumberGanti;
    } else {
      console.log("failed");
      return "0000 0000 0000 0000";
    }
  };

  // run cardNumberSpaced function when showCardData value change
  useEffect(() => {
    if (showCardData) {
      cardNumberSpaced();
    }
  }, [showCardData]);
  
  return (
    <div className="w-fit h-fit items-center justify-center text-black z-10 relative left-36 top-24 ">
      {/* front card */}
      <div className="flex min-w-fit min-h-fit relative mb-6">
        <Image
          src={frontCard}
          alt="front credit card"
          className="z-1"
        />
        <Image
          src={circleCard}
          alt="circleCard"
          className="absolute z-2 top-0 left-0 mt-4 ml-6"
        />
        <div className="absolute z-2 top-0 left-0 mt-6 ml-20 border-2 border-white rounded-full w-5 h-5" />

        {/* ID Number Text */}
        <p
          className={`absolute z-2 top-0 left-0 mt-32 ml-5 text-3xl tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-bold`}
        >
          {showCardData ? cardNumberSpaced() : "0000 0000 0000 0000"}
        </p>

        {/* Name Text */}
        <p
          className={`absolute z-2 bottom-0 left-0 mb-6 ml-9 text-xl tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal w-4/6 overflow-hidden`}
        >
          {showCardData ? name.toUpperCase() : "Name"}
        </p>

        {/* EXP Dates */}
        <div className="flex absolute z-2 right-9 bottom-6">
          {/* Exp Date Text month*/}
          <p
            className={`text-xl tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal`}
          >
            {showCardData ? dateMonth : "12"}
          </p>
          <p className="text-white">/</p>
          {/* Exp Date Text year*/}
          <p
            className={`text-xl tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal`}
          >
            {showCardData ? dateYear : "23"}
          </p>
        </div>
      </div>

      <div className="relative left-28">
        <Image
          src={BGBackDesktop}
          alt="backCard"
          className="absolute"
        />
        <p className="absolute z-1 right-14 top-[6.5rem] text-xl tracking-widest text-white ${spaceG_500.variable} font-spaceGrotesque_500 font-normal">
          {showCardData ? CVC : "000"}
        </p>
      </div>
    </div>
  );
};

export default Card;
