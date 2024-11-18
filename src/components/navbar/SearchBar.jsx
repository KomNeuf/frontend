"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import api from "@/redux/api";
import Loading from "../Loading";
import { usePathname, useRouter } from "next/navigation";
import langs from "@/app/[lang]/dictionaries/langs";
import { resetFavoriteStatus } from "@/redux/slices/favorites.slice";

const SearchBar = ({ lang }) => {
 
  const t = langs[lang]?.searchBar;
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const {
    data: products,
    isLoading,
    error,
  } = api.adminApis.useGetSearchProductsQuery(searchQuery, {
    skip: searchQuery.length < 1,
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemClick = (itemTitle) => {
    setShowDropdown(false);
    setSearchQuery("");
    router.push(`/${lang}/searchResult?query=${itemTitle}`);
  };

  useEffect(() => {
    setShowDropdown(searchQuery.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  return (
    <div className="relative ">
      <label htmlFor="search" className="sr-only">
        {t?.search}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-primaryText" aria-hidden="true" />
        </div>
        <input
          autoComplete="off"
          name="search"
          className={`block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-primaryGray placeholder-secondaryText  focus:outline-none font-medium focus:ring-none focus:border-none sm:text-sm`}
          placeholder={t?.placeholder}
          type="search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-40 mt-1 w-full bg-primaryGray  rounded-md shadow-lg"
        >
          {isLoading ? (
            <Loading />
          ) : products && products.length > 0 ? (
            <ul>
              {products.map((item) => (
                <li
                  onClick={() => handleItemClick(item.title)}
                  key={item._id}
                  className="px-4 py-3 hover:bg-primaryBg border-b border-primaryBg text-lg cursor-pointer"
                >
                  {item.title}
                </li>
              ))}

              <div className="px-4 py-2 font-semibold text-primaryText text-lg">
                {t?.search} &quot;{searchQuery}&quot;
              </div>
            </ul>
          ) : (
            <div className="px-4 py-2 font-semibold text-primaryText">
              {t?.noProduct}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
