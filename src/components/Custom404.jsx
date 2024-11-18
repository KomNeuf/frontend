import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div>
      <main className="h-screen w-full flex flex-col justify-center items-center hero">
        <h1 className="text-9xl font-extrabold text-black tracking-widest">404</h1>
        <div className="bg-primaryText px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-primaryText group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primaryText group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 text-black py-3 bg-primaryText border border-current">
              <Link href="/">Go Home</Link>
            </span>
          </a>
        </button>
      </main>
    </div>
  );
};

export default Custom404;
