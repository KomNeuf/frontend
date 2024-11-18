import React from "react";
import Image from "next/image";
import langs from "@/app/[lang]/dictionaries/langs";
export const benefitContent = [
  {
    imgSrc: "/benefit-icons/005-delivery-truck-2.webp",
    title: "deliver",
    color: "#ADE8F4",
  },
  {
    imgSrc: "/benefit-icons/003-cash-on-delivery.webp",
    title: "cash",
    color: "#FFDDD2",
  },
  {
    imgSrc: "/benefit-icons/004-headphones.webp",
    title: "support",
    color: "#CCD5AE",
  },
  {
    imgSrc: "/benefit-icons/006-best-seller.webp",
    title: "warrantyBenefit",
    color: "#CCE3DE",
  },
];

const Benefits = ({ lang, type }) => {
  const t = langs[lang]?.benefits;
  return (
    <div className="grid gap-4 grid-cols-12 my-8 pt-4 xl:max-w-[2100px] mx-auto">
      {benefitContent.map((benefitItem) => {
        return (
          <div
            style={{
              backgroundColor: benefitItem.color,
              clipPath:
                "polygon(0% 5%, 5% 5%, 5% 0%, 95% 0%, 95% 5%, 100% 5%, 100% 95%, 95% 95%, 95% 100%, 5% 100%, 5% 95%, 0% 95%)",
            }}
            className={`col-span-6 lg:col-span-3 flex flex-col items-center py-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105  `}
            key={benefitItem.title}
          >
            <Image
              height={48}
              width={48}
              src={benefitItem.imgSrc}
              alt={benefitItem.title}
              className="transition-transform duration-300 hover:rotate-12"
            />
            <p className="py-2 text-sm md:text-base text-palette-base/90 text-center">
              {t[`${benefitItem.title}`]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Benefits;
