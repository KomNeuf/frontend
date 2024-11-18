import langs from "@/app/[lang]/dictionaries/langs";

import Image from "next/image";
import React from "react";

const DiscoverSection = ({ lang }) => {
  const t = langs[lang]?.discover;
  return (
    <div className="my-6 ">
      <div className="my-6 rounded-lg relative w-full h-[300px] md:h-[350px] overflow-hidden bg-primaryGray flex">
        <div className="relative flex-1 p-6 md:px-12 flex flex-col justify-center">
          <p className="text-primaryText text-md md:text-base uppercase font-semibold tracking-wider">
            {t?.new}
          </p>
          <h2 className="flex-1 text-primaryText text-3xl md:text-4xl font-bold max-w-md">
            {t?.title}
          </h2>
          <div className="w-fit bg-darkGray px-3 text-white hidden sm:block  py-2 px-3 rounded-lg text-md md:text-lg">
            {t?.buttonText}
          </div>
        </div>
        <div className="relative   w-1/2">
          <Image
            src="/bgDiscover.png"
            alt="Discover Fashion"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;
