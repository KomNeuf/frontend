"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import { sliderContent } from "@/utils/mockData";

const CarouselComponent = ({ lang }) => {
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    cssEase: "linear",

    appendDots: (dots) => (
      <div className="bg-transparent !pb-[40px] ">
        <ul> {dots} </ul>
      </div>
    ),
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="relative my-8">
      <Slider {...settings} ref={sliderRef}>
        {sliderContent.map((slideContent) => {
          return <Slide key={slideContent.ID} {...slideContent} lang={lang} />;
        })}
      </Slider>
      <>
        <div
          onClick={goToNextSlide}
          className=" hover:cursor-pointer absolute top-1/2 right-4 md:right-3 lg:right-8 shadow-lg rounded-full bg-palette-card/80 p-1 drop-shadow-lg text-[0.8rem] md:text-[1.8rem]"
        >
          <ChevronRight />
        </div>
        <div
          onClick={goToPrevSlide}
          className=" hover:cursor-pointer absolute top-1/2 left-4  md:left-3 lg:left-8 shadow-lg rounded-full bg-palette-card/80 p-1 drop-shadow-lg text-[0.8rem] md:text-[1.8rem]"
        >
          <ChevronLeft />
        </div>
      </>
    </div>
  );
};

export default CarouselComponent;
