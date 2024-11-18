"use client";
import React from "react";
import Loading from "../Loading";
import NoData from "../NoData";
import api from "@/redux/api";
import ProductCard from "../landingPage/ProductCard";
import langs from "@/app/[lang]/dictionaries/langs";

const InappropriateProduct = ({ userID, lang }) => {
  const t = langs[lang]?.closetCompoonent;
  const {
    data: products,
    isLoading,
    refetch,
  } = api.adminApis.useGetProductsByUserIdQuery(userID, {
    skip: !userID,
  });
  const inappropriateProducts =
    products?.filter((product) => product.visibleStatus === "Rejected") || [];
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold  text-primaryText mb-1">
          {inappropriateProducts?.length || 0} {t?.items}
        </h1>
        <p className="text-md  text-secondaryText mb-6">{t?.rejectedMsg}</p>
        {inappropriateProducts?.length === 0 ? (
          <NoData lang={lang} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {inappropriateProducts?.map((product) => (
              <div key={product._id} className="">
                <ProductCard
                  product={product}
                  type={"closet"}
                  refetch={refetch}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InappropriateProduct;
