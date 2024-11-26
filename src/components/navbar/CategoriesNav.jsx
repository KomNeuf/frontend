import langs from "@/app/[lang]/dictionaries/langs";
import { NavCategories } from "@/utils/data";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const CategoriesNav = ({ lang, toggleSidebar }) => {
  const t = langs[lang]?.categoriesNav;
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const dropdownRef = useRef(null);

  const handleCategoryClick = (index, category) => {
    if (activeCategory === index) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      setActiveCategory(index);
      setActiveSubcategory(category.subcategories[0]?.name || null);
    }
  };

  const handleSubcategoryClick = (event, subcategory) => {
    if (
      subcategory == "Men" ||
      subcategory == "Women" ||
      subcategory == "Traditional Wear" ||
      subcategory == "Kids"
    ) {
      router.push(
        `/${lang}/searchResult?seeAll=${encodeURIComponent(subcategory)}`
      );
    } else {
      event.stopPropagation();
      setActiveSubcategory(subcategory);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <ul className="hidden sm:flex gap-2">
        {NavCategories.map((category, index) => (
          <li
            key={category.slug}
            onClick={() => handleCategoryClick(index, category)}
            className={`relative p-3 cursor-pointer hover:bg-gray-200 ${
              activeCategory === index
                ? "border-b-2 border-primaryText bg-gray-200"
                : "border-b-2 border-transparent"
            }`}
          >
            {t[category?.name] || category?.name}
            {activeCategory === index && (
              <div className="absolute top-full left-0 mt-2 bg-primaryGray shadow-xl rounded-b-lg p-6 z-50 flex ">
                <div
                  className={`w-40   ${
                    category?.name !== "Traditional Wear"
                      ? "border-r border-darkGray"
                      : ""
                  }`}
                >
                  <ul>
                    {(category?.name === "Women" ||
                      category?.name === "Men" ||
                      category?.name === "Traditional Wear" ||
                      category?.name === "Kids") && (
                      <li className="flex items-center mb-2">
                        <p
                          onClick={(e) =>
                            handleSubcategoryClick(e, category?.name)
                          }
                          className={`text-lg cursor-pointer hover:text-primary/80 `}
                        >
                          {t?.seeAllItems}
                        </p>
                      </li>
                    )}

                    {category.subcategories.map((sub, idx) => (
                      <li key={idx} className="flex items-center mb-2">
                        <p
                          onClick={(e) => handleSubcategoryClick(e, sub.name)}
                          className={`text-lg  cursor-pointer hover:text-primary/80 ${
                            activeSubcategory === sub.name
                              ? "text-secondaryText font-medium "
                              : ""
                          }`}
                        >
                          {t[sub.name] || sub.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                {category?.name !== "Traditional Wear" && (
                  <div className="w-48 lg:w-[500px] pl-4">
                    {category.subcategories.map(
                      (sub, idx) =>
                        activeSubcategory === sub.name && (
                          <ul
                            key={idx}
                            className="grid grid-cols-1 lg:grid-cols-2"
                          >
                            {sub.subcategories.map((item, i) => (
                              <li
                                key={i}
                                className="text-lg hover:underline mb-2"
                              >
                                <Link
                                  href={`/${lang}/searchResult?category=${encodeURIComponent(
                                    category.slug
                                  )}&subcategory=${encodeURIComponent(
                                    sub.name
                                  )}&specificItem=${encodeURIComponent(item)}`}
                                >
                                  {t[item] || item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
        <li className=" p-3 cursor-pointer hover:bg-gray-200">
          <Link href={`/${lang}/how-works`} className="">
            {langs[lang]?.footer?.howItWorks}
          </Link>
        </li>
      </ul>

      <div className="sm:hidden">
        <ul className="">
          {NavCategories.map((category, index) => (
            <li
              key={category.slug}
              onClick={() => {
                handleCategoryClick(index, category);
              }}
              className={`px-4 py-2 cursor-pointer font-medium text-primaryText hover:bg-primaryGray hover:rounded-lg transition-all duration-300 ease-in-out ${
                activeCategory === index ? "bg-primaryGray rounded-lg" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="block text-md">
                  {t[category?.name] || category?.name}
                </span>
                {activeCategory === index ? (
                  <ChevronDown className="text-gray-400 cursor-pointer hover:text-primaryText" />
                ) : (
                  <ChevronRight className="text-gray-400 cursor-pointer hover:text-primaryText" />
                )}
              </div>
              {activeCategory === index && (
                <div className="ml-4 mt-2">
                  <ul className="space-y-1">
                    {(category?.name === "Women" ||
                      category?.name === "Men" ||
                      category?.name === "Traditional Wear" ||
                      category?.name === "Kids") && (
                      <li className="flex items-center ">
                        <p
                          onClick={(e) => {
                            handleSubcategoryClick(e, category?.name);
                            toggleSidebar();
                          }}
                          className={`text-sm font-semibold cursor-pointer `}
                        >
                          {t?.seeAllItems}
                        </p>
                      </li>
                    )}
                    {category.subcategories.map((sub, idx) => (
                      <li key={idx} className="group">
                        <p
                          onClick={(e) => handleSubcategoryClick(e, sub.name)}
                          className={`text-sm font-semibold cursor-pointer group-hover:text-primary transition-all duration-200 ${
                            activeSubcategory === sub.name
                              ? "text-primary font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {t[sub.name] || sub.name}
                        </p>
                        {activeSubcategory === sub.name && (
                          <ul className="pl-4 mt-2 space-y-1">
                            {sub.subcategories.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-500 hover:text-primary hover:underline transition-all duration-200"
                              >
                                <Link
                                  onClick={() => toggleSidebar()}
                                  href={`/${lang}/searchResult?category=${encodeURIComponent(
                                    category.slug
                                  )}&subcategory=${encodeURIComponent(
                                    sub.name
                                  )}&specificItem=${encodeURIComponent(item)}`}
                                >
                                  {t[item] || item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesNav;
