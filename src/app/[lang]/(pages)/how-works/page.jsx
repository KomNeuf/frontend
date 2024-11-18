"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import langs from "../../dictionaries/langs";

const WorksPage = () => {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const t = langs[lang]?.worksPage;
  return (
    <div>
      <div className=" relative grid grid-cols-1 md:grid-cols-2 bg-darkGray text-white pt-12 md:px-20 lg:px-32">
        <div
          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 px-4 md:px-0">
            {t?.title}
          </h1>
          <p className="text-lg md:text-xl mb-4 t px-4 md:px-0">
            {t?.description}
          </p>
        </div>
        <div className="flex justify-center">
          <img src="/work/header.png" alt="KomNeuf" className="w-72 h-auto " />
        </div>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
          <path
            fill="#2E3944"
            d="M0,64L13.3,58.7C26.7,53,53,42.5,80,37.3C106.7,32,133,32,160,42.7C186.7,53,213,74.5,240,82.7C266.7,90.5,293,85.5,320,88C346.7,90.5,373,101.5,400,106.7C426.7,112,453,112,480,98.7C506.7,85.5,533,58.5,560,61.3C586.7,64,613,96,640,104C666.7,112,693,96,720,82.7C746.7,69.5,773,58.5,800,56C826.7,53,853,58.5,880,56C906.7,53,933,42.5,960,56C986.7,69.5,1013,106.5,1040,109.3C1066.7,112,1093,80,1120,56C1146.7,32,1173,16,1200,34.7C1226.7,53,1253,106.5,1280,120C1306.7,133.5,1333,106.5,1360,106.7C1386.7,106.5,1413,133.5,1427,146.7L1440,160L1440,0L1426.7,0C1413.3,0,1387,0,1360,0C1333.3,0,1307,0,1280,0C1253.3,0,1227,0,1200,0C1173.3,0,1147,0,1120,0C1093.3,0,1067,0,1040,0C1013.3,0,987,0,960,0C933.3,0,907,0,880,0C853.3,0,827,0,800,0C773.3,0,747,0,720,0C693.3,0,667,0,640,0C613.3,0,587,0,560,0C533.3,0,507,0,480,0C453.3,0,427,0,400,0C373.3,0,347,0,320,0C293.3,0,267,0,240,0C213.3,0,187,0,160,0C133.3,0,107,0,80,0C53.3,0,27,0,13,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div
          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          className="mb-12"
        >
          <h2 className="text-center text-3xl font-semibold mb-12 text-primaryText">
            {t?.sellingTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/work/how-to-sell-step1.png"
                alt="List for free"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-primaryText text-lg mb-4">
                {t?.listTitle}
              </h3>
              <p className="text-primaryText">{t?.listDescription}</p>
            </div>

            <div className="text-center">
              <img
                src="/work/how-to-sell-step2.png"
                alt="Sell it, ship it"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-primaryText text-lg mb-4">
                {t?.sellTitle}
              </h3>
              <p className="text-primaryText">{t?.sellDescription}</p>
            </div>

            <div className="text-center">
              <img
                src="/work/how-to-sell-step3.png"
                alt="It's payday"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-primaryText text-lg mb-4">
                {t?.paydayTitle}
              </h3>
              <p className="text-primaryText">{t?.paydayDescription}</p>
            </div>
          </div>
          <div className="text-center my-12">
            <Link
              href={`/${lang}/sell/new`}
              className=" bg-primaryText text-white py-3 px-6 rounded-md hover:bg-primaryText/80 transition duration-200"
            >
              {t?.startSelling}
            </Link>
          </div>
        </div>

        <div
          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          className="mb-12"
        >
          <h2 className="text-center text-3xl font-semibold mb-12 text-primaryText">
            {t?.shoppingTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/work/shopping-step1.png"
                alt="Find it"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-primaryText text-lg mb-4">
                {t?.findTitle}
              </h3>
              <p className="text-primaryText">{t?.findDescription}</p>
            </div>

            <div className="text-center">
              <img
                src="/work/shopping-step2.png"
                alt="Buy it"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-primaryText text-lg mb-4">
                {t?.buyTitle}
              </h3>
              <p className="text-primaryText">{t?.buyDescription}</p>
            </div>

            <div className="text-center">
              <img
                src="/work/shopping-step3.png"
                alt="Get it"
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-primaryText text-lg mb-4">
                {t?.getTitle}
              </h3>
              <p className="text-primaryText">{t?.getDescription}</p>
            </div>
          </div>
          <div className="text-center my-12">
            <Link
              href={`/${lang}`}
              className=" bg-primaryText text-white py-3 px-6 rounded-md hover:bg-primaryText/80 transition duration-200"
            >
              {t?.startShopping}
            </Link>
          </div>
        </div>

        <div
          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          className="mb-12"
        >
          <h2 className="text-center text-3xl font-semibold mb-12 text-primaryText">
            {t?.safetyTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" flex gap-5">
              <img src="/work/safe.svg" alt="icon" className="w-10 h-10" />
              <div>
                <h2 className="mb-2 text-xl font-semibold text-primaryText flex items-center">
                  {t?.mindTitle}
                </h2>
                <p className=" text-lg text-secondaryText max-w-xl mx-auto">
                  {t?.buyerDescription}
                </p>
              </div>
            </div>
            <div className=" flex gap-5">
              <img src="/work/guarantee.svg" alt="icon" className="w-10 h-10" />
              <div>
                <h2 className="mb-2 text-xl font-semibold text-primaryText flex items-center">
                  {t?.titleReliable}
                </h2>
                <p className=" text-lg text-secondaryText max-w-xl mx-auto">
                  {t?.descriptionOrder}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative w-[100%] h-[50vh] mb-12 bg-cover bg-center"
        style={{ backgroundImage: "url(/work/footer-bg.png)" }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex gap-4">
            <Link
              href={`/${lang}/sell/new`}
              className=" bg-primaryBg text-primaryText py-3 px-6 rounded-md hover:bg-primaryBg/80 transition duration-200"
            >
              {t?.startSelling}
            </Link>
            <Link
              href={`/${lang}`}
              className=" bg-primaryText text-white py-3 px-6 rounded-md hover:bg-primaryText/80 transition duration-200"
            >
              {t?.startShopping}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;
