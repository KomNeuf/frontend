"use client";

import langs from "@/app/[lang]/dictionaries/langs";
import { NavCategories } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ lang }) {
  const t = langs[lang]?.categoriesNav;
  return (
    <div style={{ direction: lang === "ar" ? "rtl" : "ltr" }} className="pt-12">
      <div className="flex flex-col md:flex-row gap-6">
        {NavCategories?.map((category) => {
          const categoryImages = {
            Women: "/card1.jpg",
            Men: "/mens.jpg",
            Kids: "/kids.jpg",
            "Traditional Wear": "/traditional.webp",
          };

          return (
            <div key={category.name} className="flex-1">
              <Link
                href={`/${lang}/searchResult?query=${encodeURIComponent(
                  category?.name
                )}`}
                className="group block"
              >
                <h2 className="text-2xl font-bold mb-4 text-primaryText group-hover:text-primary transition-colors duration-300">
                  {t[category?.name] || category?.name}
                </h2>
                <div className="relative overflow-hidden rounded-lg shadow-xl bg-white transition-all duration-300 group-hover:shadow-2xl">
                  <Image
                    src={categoryImages[category.name] || "/hero2.jpg"}
                    alt={`${category.name} category`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-[400px] transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                    <ul className="text-white space-y-1">
                      {category.subcategories.slice(0, 6).map((subcat) => (
                        <li key={subcat.name} className="text-sm">
                          {t[subcat.name] || subcat.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden group-hover:flex absolute inset-0 flex items-center justify-center">
                    <button className="bg-darkGray text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-darkGray/80 transition-colors duration-300">
                      {langs[lang]?.offerModal?.shopNow}
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
