"use client";
import langs from "@/app/[lang]/dictionaries/langs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const PaymentSuccess = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];
  const id = pathname?.split("/")[3];

  const t = langs[lang]?.successScreen;
  return (
    <div className=" min-h-screen flex jusitify-center items-center">
      <div className="bg-[#FCFBFF] p-6  mx-auto border border-primaryText rounded-lg ">
        <svg
          viewBox="0 0 24 24"
          className="text-[#2E3944] w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {t?.orderPlaced}
          </h3>
          <p className="text-gray-600 my-2">{t?.orderConfirmed}</p>
          <p>{t?.haveAGreatDay} </p>
          <div className="py-10 text-center">
            <button
              onClick={() => router.push(`/${lang}/product/${id}`)}
              className="mt-4 w-full cursor-pointer bg-primaryText text-white py-3 rounded-md hover:bg-primaryText/80 transition duration-300 px-5"
            >
              {t?.goBack}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
