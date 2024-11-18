import React, { useEffect } from "react";
import Loading from "../Loading";
import api from "@/redux/api";
import ProductCard from "../landingPage/ProductCard";
import NoData from "../NoData";
import langs from "@/app/[lang]/dictionaries/langs";

const SimilarItems = ({ product, lang }) => {
  const t = langs[lang]?.similarItems;
  const {
    data: similarProducts,
    isLoading,
    refetch,
  } = api.adminApis.useGetSimilarProductsQuery(product?._id, {
    skip: !product?._id,
  });
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div className="my-8">
      <h2
        style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
        className="text-2xl font-semibold mb-4"
      >
        {t?.similar}
      </h2>

      {similarProducts?.length === 0 ? (
        <NoData lang={lang} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {similarProducts?.map((product) => (
            <div key={product._id} className="">
              <ProductCard product={product} lang={lang} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarItems;
