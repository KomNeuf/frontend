import React, { useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import langs from "@/app/[lang]/dictionaries/langs";
import NoData from "@/components/NoData";

const CarouselBox = ({ title, className, children, href, full, lang }) => {
  const t = langs[lang]?.offer;
  const carouselBoxRef = useRef(null);
  const settings = {
    className: ` px-4 ${full ? "bg-palette-fill" : "bg-[#37bccef9]"}`,
    infinite: false,
    speed: 600,
    centerPadding: "60px",
    slidesToShow: children && children?.length > 5 ? 5 : children?.length,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const goToNextSlide = () => {
    carouselBoxRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    carouselBoxRef.current.slickPrev();
  };

  return (
    <div
      className={`w-[100%] mx-auto my-8 flex rounded-md ${
        full ? "flex-col" : "bg-[#37bccef9]"
      }`}
    >
      <div
        className={`hidden sm:flex flex-col items-center justify-start flex-grow text-sm sm:text-base  bg-cover bg-no-repeat bg-center rounded-md backdrop-blur-md ${className}`}
      ></div>
      <div
        className={`relative ${
          full ? "w-full mt-4" : "w-[100%] sm:w-[75%] md:w-[85%]"
        }`}
      >
        {(!children || children.length === 0) && (
          <div className="text-center py-6 min-h-[20rem] bg-palette-card rounded-md shadow-md">
            <NoData lang={lang} />
          </div>
        )}

        {children && children.length > 0 && (
          <>
            <Slider {...settings} ref={carouselBoxRef}>
              {children}
            </Slider>
            <div>
              <div
                onClick={goToNextSlide}
                className="hover:cursor-pointer absolute top-[45%] right-4 md:right-1 shadow-lg rounded-full bg-palette-card p-1 drop-shadow-lg text-[0.8rem] md:text-[1.8rem]"
              >
                <ChevronsRight style={{ color: "gray" }} />
              </div>
              <div
                onClick={goToPrevSlide}
                className="hover:cursor-pointer absolute top-[45%] left-4 md:-left-1 shadow-lg rounded-full bg-palette-card p-1 drop-shadow-lg text-[0.8rem] md:text-[1.8rem]"
              >
                <ChevronsLeft style={{ color: "gray" }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselBox;
