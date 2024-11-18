"use client";
import langs from "@/app/[lang]/dictionaries/langs";
import { categoryLgContent } from "@/utils/mockData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryGoods = ({ lang }) => {
  const t = langs[lang]?.category;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className=" my-4 md:my-8"
      style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
    >
      <h2 className="text-2xl text-primaryText font-semibold mb-6">
        {t?.categoryOfGoods}
      </h2>

      <div className="grid  gap-4 grid-cols-1 md:grid-cols-9 w-full  mx-auto">
        {categoryLgContent.map(
          ({
            name,
            title,
            description,
            mobileStyles,
            styles,
            href,
            imgSrc,
            imgWidth,
            imgHeight,
          }) => {
            const appliedStyles = isMobile ? mobileStyles : styles;
            return (
              <div
                key={title}
                className="flex justify-around items-center rounded-md shadow-lg overflow-hidden"
                style={appliedStyles}
              >
                <div className={`mx-[0.5rem] ${isMobile ? "text-center" : ""}`}>
                  <h3 className="text-xl 2xl:text-2xl font-medium">
                    {t[`${title}`]}
                  </h3>
                  <p className="text-sm mt-2">{t[`${description}`]}</p>
                  {/* <Link
                    href={href}
                    className="text-sm inline-block py-2 px-2 2xl:px-4 my-3 bg-darkGray hover:scale-105 transition-transform duration-300 shadow-xl ltr:text-sm rtl:text-xs text-white rounded-lg"
                  >
                    {t?.seeAll}
                  </Link> */}
                </div>
                <Image
                  src={imgSrc}
                  alt={name}
                  width={isMobile ? 200 : imgWidth}
                  height={isMobile ? 200 : imgHeight}
                  className={` drop-shadow-lg hover:scale-95 transition-transform duration-300`}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default CategoryGoods;
