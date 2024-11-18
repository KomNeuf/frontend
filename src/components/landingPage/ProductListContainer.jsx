"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "../Loading";
import api from "@/redux/api";
import NoData from "../NoData";
import langs from "@/app/[lang]/dictionaries/langs";

const ProductListContainer = ({ lang }) => {
  const t = langs[lang]?.productList;
  const [limit, setLimit] = useState(20);

  const {
    data: products,
    isLoading,
    refetch,
  } = api.adminApis.useGetAllVerifiedProductsQuery({ limit });

  const handleLoadMore = () => {
    setLimit((prev) => prev + 20);
  };

  useEffect(() => {
    refetch();
  }, [limit, refetch]);

  if (isLoading) return <Loading />;

  const availableProducts = products?.filter(
    (product) => product.status === "Available"
  );
  return (
    <div className="mb-8">
      <h2
        style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
        className="text-2xl text-primaryText font-semibold mb-4"
      >
        {t?.newsfeed}
      </h2>

      {availableProducts?.length === 0 ? (
        <NoData lang={lang} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableProducts?.map((product) => (
            <div key={product._id} className="">
              <ProductCard product={product} lang={lang} refetch={refetch} />
            </div>
          ))}
        </div>
      )}
      {availableProducts?.length >= limit && (
        <div className="mt-3 text-center">
          <button
            onClick={handleLoadMore}
            className="  px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText/80 "
          >
            {t?.loadMore}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListContainer;
