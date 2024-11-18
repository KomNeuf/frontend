"use client";
import React from "react";
import Slider from "react-slick";

import { brandContent } from "@/utils/mockData";
import Image from "next/image";
import langs from "@/app/[lang]/dictionaries/langs";
const PopularBrands = ({ lang }) => {
  const t = langs[lang]?.popular;
  const settings = {
    infinite: true,
    speed: 6000,
    slidesToShow: 8,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    cssEase: "linear",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div
      style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
      className="p-1 my-4 md:my-8 "
    >
      <h2 className="text-2xl text-primaryText font-semibold mb-6">
        {t?.popularBrands}
      </h2>
      <Slider {...settings}>
        {brandContent.map((brandItem) => {
          return (
            <div key={brandItem.id} className="flex justify-center">
              <div className="relative flex items-center justify-center h-32 w-32 bg-white border border-gray-300 overflow-hidden p-2 ">
                <Image
                  src={brandItem.imgSrc}
                  width={300}
                  height={175}
                  alt={brandItem.name}
                  className="object-contain h-full w-full transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PopularBrands;
