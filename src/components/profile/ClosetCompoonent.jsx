"use client";
import React, { useEffect } from "react";
import Loading from "../Loading";
import NoData from "../NoData";
import api from "@/redux/api";
import ProductCard from "../landingPage/ProductCard";
import langs from "@/app/[lang]/dictionaries/langs";

const ClosetCompoonent = ({ userID, lang }) => {
  const t = langs[lang]?.closetCompoonent;
  const {
    data: products,
    isLoading,
    refetch,
  } = api.adminApis.useGetProductsByUserIdQuery(userID, {
    skip: !userID,
  });
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loading />;
  const approvedProducts =
    products?.filter((product) => product.visibleStatus === "Approved") || [];
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold  text-darkGray mb-6">
          {approvedProducts?.length || 0} {t?.items}
        </h1>

        {approvedProducts?.length === 0 ? (
          <NoData lang={lang} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {approvedProducts?.map((product) => (
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

export default ClosetCompoonent;
