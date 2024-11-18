"use client";
import ProductCard from "@/components/landingPage/ProductCard";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import withAuth from "@/app/middleware/withAuth";
import api from "@/redux/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import langs from "../../dictionaries/langs";

const FavoritedPage = ({ params }) => {
  const { lang } = params;
  const [limit, setLimit] = useState(20);
  const t = langs[lang]?.favorited;
  const loginUser = useSelector((state) => state.auth.loginUser);
  const {
    data: likedProducts,
    isLoading,
    refetch,
    error,
  } = api.adminApis.useGetLikedProductsQuery(
    { userId: loginUser?._id, limit },
    {
      skip: !loginUser?._id,
    }
  );

 
  const handleLoadMore = () => {
    setLimit((prev) => prev + 20);
  };

  useEffect(() => {
    refetch();
  }, [limit, refetch]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <h1 className="text-3xl font-bold  text-primaryText mb-6">
          {t?.title}
        </h1>
        {likedProducts?.length === 0 ? (
          <NoData lang={lang} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {likedProducts?.map((product) => (
              <div key={product._id} className="">
                <ProductCard lang={lang} product={product} refetch={refetch} />
              </div>
            ))}
          </div>
        )}
        {likedProducts?.length >= limit && (
          <div className="mt-3 text-center">
            <button
              onClick={handleLoadMore}
              className="  px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText/80 "
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(FavoritedPage);
