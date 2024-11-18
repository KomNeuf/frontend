"use client";
import React from "react";
import Loading from "../Loading";
import NoData from "../NoData";
import api from "@/redux/api";
import ProductCard from "../landingPage/ProductCard";
import langs from "@/app/[lang]/dictionaries/langs";

const PendingProducts = ({ userID, lang }) => {
  const t = langs[lang]?.closetCompoonent;
  const {
    data: products,
    isLoading,
    refetch,
  } = api.adminApis.useGetProductsByUserIdQuery(userID, {
    skip: !userID,
  });
  const pendingProducts =
    products?.filter((product) => product.visibleStatus === "Pending") || [];
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold  text-primaryText mb-1">
          {pendingProducts?.length || 0} {t?.items}
        </h1>
        <p className="text-md  text-secondaryText mb-6">{t?.pendingMsg}</p>
        {pendingProducts?.length === 0 ? (
          <NoData lang={lang} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pendingProducts?.map((product) => (
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

export default PendingProducts;
