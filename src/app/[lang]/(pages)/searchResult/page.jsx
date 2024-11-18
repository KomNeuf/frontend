"use client";
import ProductCard from "@/components/landingPage/ProductCard";
import Loading from "@/components/Loading";
import FilterBar from "@/components/navbar/FilterBar";
import NoData from "@/components/NoData";
import api from "@/redux/api";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import langs from "../../dictionaries/langs";

const SearchResult = ({ params }) => {
  const { lang } = params;
  const t = langs[lang]?.searchResult;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const specificItem = decodeURIComponent(searchParams.get("specificItem"));
  const [activeFilters, setActiveFilters] = useState([]);

  const queryFilters = activeFilters.reduce((acc, filter) => {
    const [key, value] = filter.split(": ");
    acc[key.toLowerCase().replace(/\s+/g, "")] = value;
    return acc;
  }, {});
  const {
    data: products,
    isLoading,
    error,
  } = api.adminApis.useGetFilteredProductsQuery(
    searchQuery && searchQuery !== "null"
      ? { ...queryFilters, searchQuery }
      : { ...queryFilters, category, subcategory, specificItem }
  );

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <h1 className="text-3xl font-bold text-primaryText mb-6">
        {t?.searchResult} &quot;
        {searchQuery || langs[lang]?.categoriesNav[specificItem]}&quot;
      </h1>
      <div className="border-t border-b py-5">
        <FilterBar
          onFilterChange={handleFilterChange}
          products={products}
          lang={lang}
        />
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-bold text-primaryText mb-8">
          {products?.length || 0} {t?.result}
        </h1>
        {isLoading ? (
          <Loading />
        ) : products?.length === 0 ? (
          <div>
            <NoData lang={lang} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products?.map((product) => (
              <div key={product._id} className="">
                <ProductCard product={product} lang={lang} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
