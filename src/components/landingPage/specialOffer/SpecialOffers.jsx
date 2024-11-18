"use client";
import React from "react";
import CarouselBox from "./CarouselBox";
import CarouselBoxCard from "./CarouselBoxCard";
import api from "@/redux/api";
import Loading from "@/components/Loading";
import langs from "@/app/[lang]/dictionaries/langs";

const SpecialOffers = ({ lang }) => {
  const t = langs[lang]?.offer;
  const {
    data: products,
    isLoading,
    error,
  } = api.adminApis.useGetAllVerifiedProductsQuery("");

  if (isLoading) return <Loading />;

  const offerProducts = products?.filter((product) => product?.price < 100);

  return (
    <div>
      <div className=" w-full xl:max-w-[2100px] mx-auto">
        <h2
          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          className="text-2xl text-primaryText font-semibold mb-2"
        >
          {t?.specialOffers}
        </h2>
        <CarouselBox
          title="Special offers"
          className="bg-offersBG"
          lang={lang}
          href="/"
        >
          {offerProducts?.map((product, index) => {
            return (
              <CarouselBoxCard key={index} product={product} lang={lang} />
            );
          })}
        </CarouselBox>
      </div>
    </div>
  );
};

export default SpecialOffers;
