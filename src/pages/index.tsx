import Image from "next/image";
import BGPictureDesktop from "../../public/images/bg-main-desktop.png";
import BGPictureMobile from "../../public/images/bg-main-mobile.png";
import SuccessIcon from "../../public/images/Check.png";
import { spaceG_500 } from "../styles/fontsSettings";
import { Card, MobileCard } from "../components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import MobileCard from "@/components/MobileCard";
import { error } from "console";

export default function Home() {
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      heigth: 0,
      widht: 0,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          heigth: window.innerHeight,
          widht: window.innerWidth,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  };
  const windowSizeIs = useWindowSize();

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [showCardData, setShowCardData] = useState(false);
  const formData = watch();
  const getFormData = getValues();

  // handleSubmit dapat data dari ...register --> simpan di submittedData, di submittedData ges aya data formna jeng bisa nyien kondisi men data ges diterima jiga make show dihandap ie --> tampilkan menggunakan watch atau formData
  const submittedData = (cardData: any) => {
    if (validateForm()) {
      setShowCardData(true);
    }
  };

  const onInvalid = (errors: any) => {
    setShowCardData(false);
    console.log(errors);
  };

  // fungsi untuk verifikasi data - data form sudah sesuai format
  const validateForm = () => {
    const letters = /^[A-Za-z ]+$/;
    const name = document.getElementById("name") as HTMLInputElement;

    if (name.value.match(letters)) {
      return true;
    } else {
      alert("Name only accepts alphabet letters");
      return false;
    }
  };

  const handleCardDetailsFinish = () => {
    setShowCardData(false);
  };

  return (
    <main className="flex flex-col h-screen md:min-h-screen bg-white relative">
      {/* background */}
      {windowSizeIs.widht > 650 ? (
        <Image
          src={BGPictureDesktop}
          alt="gradient background"
          className="absolute w-2/6 lg:w-max z-1 h-screen overflow-hidden"
        />
      ) : (
        <Image
          src={BGPictureMobile}
          alt="gradient background"
          className="absolute top-0 left-0 z-1 w-full overflow-hidden"
        />
      )}

      {/* cards */}
      {windowSizeIs.widht > 650 ? (
        <Card
          dataForm={getFormData}
          showCardData={showCardData}
        />
      ) : (
        <MobileCard
          dataForm={getFormData}
          showCardData={showCardData}
        />
      )}

      {/* Formulir dan confirmation */}

      {!showCardData ? (
        <form
          name="cardForm"
          onSubmit={handleSubmit(submittedData, onInvalid)}
          method="POST"
          className="flex flex-col lg:w-3/12 lg:right-36 xl:right-80 md:top-1/3 md:absolute text-black p-5 md:p-0"
        >
          <div className="flex flex-col ">
            {/* cardholder name wrapper */}
            <div className="mb-4">
              <label
                className={`text-black text-xs md:text-base font-bold ${spaceG_500.variable} font-spaceGrotesque_500 `}
              >
                CARDHOLDER NAME
              </label>{" "}
              <br />
              <input
                type="text"
                id="name"
                className={`border-2 border-gray-300 rounded-md md:rounded-lg px-2 my-2 justify-center h-8 w-11/12 text-sm md:text-lg md:font-bold ${spaceG_500.variable} font-spaceGrotesque_500 uppercase`}
                placeholder="e.g Yoga Pangestu"
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z ]*/,
                })}
              />
              {errors.name && (
                <p className="text-red-700">Card Name only accept alphabet</p>
              )}
            </div>

            {/* Card Number wrapper */}
            <div>
              <label
                className={`text-black text-xs md:text-base mb-2 font-bold ${spaceG_500.variable} font-spaceGrotesque_500`}
              >
                CARD NUMBER
              </label>{" "}
              <br />
              <input
                id="cardNumber"
                placeholder="e.g 1234 5678 9123 0000"
                maxLength={16}
                className={`border-2 border-gray-300 rounded-md md:rounded-lg px-2 my-2 justify-center h-8 w-11/12 text-sm md:text-lg md:font-bold ${spaceG_500.variable} font-spaceGrotesque_500`}
                {...register("cardNumber", {
                  required: true,
                  minLength: 16,
                  maxLength: 16,
                  pattern: /^[0-9 ]+$/,
                })}
              />
              {errors.cardNumber && (
                <p className="text-red-700">Card Number Only Accept Numbers</p>
              )}
            </div>

            {/* Date and CVC wrapper */}
            <div className="flex flex-row">
              {/* Expire Date */}
              <div className="">
                <label
                  className={`text-black text-xs md:text-base mb-2 font-bold ${spaceG_500.variable} font-spaceGrotesque_500 `}
                >
                  EXP.DATE (MM/YY)
                </label>{" "}
                <br />
                <input
                  type="text"
                  id="dateMonth"
                  placeholder="03"
                  maxLength={2}
                  className={`border-2 border-gray-300 rounded-lg px-2 my-2 justify-center h-8 w-12 md:w-14 text-sm md:text-lg mr-2 font-medium ${spaceG_500.variable} font-spaceGrotesque_500`}
                  {...register("dateMonth", {
                    required: true,
                    minLength: 2,
                    maxLength: 2,
                    pattern: /^[0-9 ]+$/,
                  })}
                />
                <input
                  type="text"
                  id="dateYear"
                  placeholder="07"
                  maxLength={2}
                  className={`border-2 border-gray-300 rounded-lg px-2 my-2 justify-center h-8 w-12 md:w-14 text-sm md:text-lg font-medium ${spaceG_500.variable} font-spaceGrotesque_500`}
                  {...register("dateYear", {
                    required: true,
                    minLength: 2,
                    maxLength: 2,
                    pattern: /^[0-9 ]+$/,
                  })}
                />
                {errors.dateMonth && (
                  <p className="text-red-700">Accept Numbers Only</p>
                )}
                {errors.dateYear && (
                  <p className="text-red-700">Accept Numbers Only</p>
                )}
              </div>

              {/* CVC */}
              <div className="ml-4 md:mt-5">
                <label
                  className={`text-black text-xs md:text-base mb-2 font-bold ${spaceG_500.variable} font-spaceGrotesque_500`}
                >
                  CVC
                </label>{" "}
                <br />
                <input
                  type="text"
                  id="CVC"
                  placeholder="e.g. 123"
                  maxLength={4}
                  className={`border-2 border-gray-300 rounded-lg px-2 my-2 justify-center h-8 w-10/12 text-sm md:text-lg font-medium ${spaceG_500.variable} font-spaceGrotesque_500`}
                  {...register("CVC", {
                    required: true,
                    maxLength: 4,
                    pattern: /^[0-9 ]+$/,
                  })}
                />
                {errors.CVC && (
                  <p className="text-red-700">Accept Numbers Only</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`rounded-md bg-[#220930] text-white text-lg h-9 my-5 w-11/12 font-medium ${spaceG_500.variable} font-spaceGrotesque_500 hover:bg-gradient-to-b from-[#220930] to-[#4c4652]`}
            >
              Confirm
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col lg:w-3/12 lg:right-36 xl:right-80 md:top-1/3 md:absolute text-black p-5 md:p-0 items-center justify-center">
          {/* Ikon Ceklist */}
          <div className="">
            <Image
              src={SuccessIcon}
              alt="success"
              className="p-4"
            />
            <p
              className={`text-center font-bold text-black ${spaceG_500.variable} font-spaceGrotesque_500 uppercase`}
            >
              THANK YOU !
            </p>
          </div>
          <p
            className={`text-center font-bold text-gray-500 ${spaceG_500.variable} font-spaceGrotesque_500`}
          >
            We&apos;ve added your card details
          </p>
          <button
            onClick={handleCardDetailsFinish}
            className={`rounded-md bg-[#220930] text-white text-lg h-9 my-5 w-11/12 font-medium ${spaceG_500.variable} font-spaceGrotesque_500 hover:bg-gradient-to-b from-[#220930] to-[#4c4652]`}
          >
            Continue
          </button>
        </div>
      )}
    </main>
  );
}
