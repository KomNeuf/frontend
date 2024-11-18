import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import langs from "@/app/[lang]/dictionaries/langs";
import CategoriesNav from "./CategoriesNav";

const Sidebar = ({
  lang,
  loginUser,
  handleLogout,
  t,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-primaryBg shadow-lg z-50 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between px-4 py-3 border-b ">
        <img
          src="/logpMain.png"
          alt="Logo"
          className="w-48 sm:w-56 h-[90%] object-cover"
        />
        <button onClick={toggleSidebar}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
        }}
        className="h-screen overflow-y-auto"
      >
        <div className="px-4 py-2">
          {loginUser ? (
            <>
              <Link
                href={`/${lang}/profile/${loginUser?._id}`}
                className="block px-3 py-2 text-base font-medium text-primaryText rounded-lg  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.profile}
              </Link>
              <Link
                href={`/${lang}/favourite`}
                className="block px-3 py-2 text-base font-medium  rounded-lg text-primaryText  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.favourites}
              </Link>
              <Link
                href={`/${lang}/order`}
                className="block px-3 py-2 text-base font-medium text-primaryText rounded-lg  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {langs[lang]?.profileMenu.myOrders}
              </Link>
              <Link
                href={`/${lang}/chat`}
                className="block px-3 py-2 text-base font-medium text-primaryText rounded-lg hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.inbox}
              </Link>
              <Link
                href={`/${lang}/settings`}
                className="block px-3 py-2 text-base font-medium text-primaryText rounded-lg  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.settings}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleSidebar();
                }}
                className="w-full text-left block px-3 py-2 text-base rounded-lg font-medium text-red-500 hover:bg-primaryGray"
              >
                {t?.logout}
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/${lang}/signup`}
                className="block px-3 py-2 text-base font-medium rounded-lg text-primaryText  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.signup}
              </Link>
              <Link
                href={`/${lang}/login`}
                className="block px-3 py-2 text-base font-medium rounded-lg text-primaryText  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.login}
              </Link>
              <Link
                href={loginUser ? `/${lang}/sell/new` : `/${lang}/login`}
                className="block px-3 py-2 text-base font-medium rounded-lg text-primaryText  hover:bg-primaryGray"
                onClick={toggleSidebar}
              >
                {t?.sellNow}
              </Link>
            </>
          )}
        </div>
        <div className="flex justify-between px-4 py-3 border-b border-t">
          <h2 className="text-xl font-bold"> {t?.categories}</h2>
        </div>
        <div className="px-4 py-2">
          <CategoriesNav lang={lang} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
