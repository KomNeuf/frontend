import React, { useEffect } from "react";
import NoData from "../NoData";
import ProductCard from "../landingPage/ProductCard";
import api from "@/redux/api";
import Loading from "../Loading";
import langs from "@/app/[lang]/dictionaries/langs";

const MemberItems = ({ product, lang }) => {
  const t = langs[lang]?.memberItems;
  const {
    data: memberProducts,
    isLoading,
    refetch,
  } = api.adminApis.useGetProductsByUserIdQuery(product?.userId?._id, {
    skip: !product?.userId?._id,
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
        {t?.member} ({memberProducts?.length})
      </h2>

      {memberProducts?.length === 0 ? (
        <NoData lang={lang} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {memberProducts?.map((product) => (
            <div key={product._id} className="">
              <ProductCard product={product} lang={lang} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberItems;
