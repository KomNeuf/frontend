"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import langs from "../../app/[lang]/dictionaries/langs";
import { useSelector } from "react-redux";

const Hero = ({ lang }) => {
  const loginUser = useSelector((state) => state.auth.loginUser);
  const t = langs[lang]?.hero;
  // h-[calc(100vh-114px)]
  return (
    <div className="relative  h-screen">
      <img
        src="/main.jpeg"
        alt="Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
        className="relative hidden sm:block z-20 pt-12 pl-12 max-w-xl text-center"
      >
        <h2 className="uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl text-3xl font-bold ">
          {t?.title}
        </h2>
      </div>
      <div className=" relative z-20 h-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center p-6">
        <h2 className="uppercase sm:hidden text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-5xl text-3xl font-bold ">
          {t?.title}
        </h2>
        <Link
          href={loginUser ? `/${lang}/sell/new` : `/${lang}/login`}
          className="mt-8 text-lg uppercase font-semibold py-2.5 px-5 hover:bg-primaryText/80   bg-primaryText text-white rounded-lg"
        >
          {t?.buttonSell}
        </Link>
      </div>
    </div>
  );
};

export default Hero;
