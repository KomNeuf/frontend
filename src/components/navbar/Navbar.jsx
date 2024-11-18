"use client";
import React, { useEffect, useState } from "react";
import { Menu, Heart, Mail, Bell } from "lucide-react";
import Link from "next/link";
import CategoriesNav from "./CategoriesNav";
import LanguageDropdown from "./LanguageDropdown";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import { loadUserFromStorage, logout } from "@/redux/slices/user.slice";

import SearchBar from "./SearchBar";
import langs from "@/app/[lang]/dictionaries/langs";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NotificationDropdown from "./NotificationDropdown";
import {
  resetFavoriteStatus,
  updateFavoriteStatus,
} from "@/redux/slices/favorites.slice";
import api from "@/redux/api";

const Navbar = ({ lang }) => {
  const t = langs[lang]?.navbar;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loginUser = useSelector((state) => state.auth.loginUser);
  const pathname = usePathname();

  const isFavoriteUpdated = useSelector(
    (state) => state.favorites.isFavoriteUpdated
  );

  const { data: likedProducts, refetch } =
    api.adminApis.useGetLikedProductsQuery(
      { userId: loginUser?._id },
      {
        skip: !loginUser?._id,
      }
    );

  useEffect(() => {
    if (loginUser?._id) {
      refetch();
    }
  }, [isFavoriteUpdated, loginUser?._id]);

  useEffect(() => {
    if (likedProducts) {
      const isFavorite = likedProducts.length > 0;
      dispatch(updateFavoriteStatus(isFavorite));
    }
  }, [likedProducts, dispatch]);

  const searchBarStyle =
    likedProducts?.length > 0 ? "text-[#EF4444] fill-[#EF4444]" : "";

  const handleLogout = () => {
    dispatch(logout());
    toast.success(t?.logoutMsg);
    router.push(`/${lang}`);
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const isLoginOrSignupPage =
    pathname === "/en/login" || pathname === "/en/signup";
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isFavoriteUpdated) {
  //     const timeout = setTimeout(() => {
  //       dispatch(resetFavoriteStatus());
  //     }, 3000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isFavoriteUpdated, dispatch]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-primaryBg top-0 sticky z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`}>
              {/* <div className="text-center">
                <p
                  className="text-2xl font-bold text-primaryText "
                  style={{
                    fontFamily: "Lobster, cursive",
                    fontStyle: "italic",
                  }}
                >
                  KomNeuf
                </p>
                <p
                  className="text-xs font-bold  text-secondaryText"
                  style={{
                    fontFamily: "Proxima Nova, sans-serif",
                    fontStyle: "italic",
                    marginTop: "-2px",
                  }}
                >
                  Quality second-hand clothes
                </p>
              </div> */}
              <img
                src="/logpMain.png"
                alt="Logo"
                className="w-40 sm:w-48 h-[80%] object-cover"
              />
            </Link>
          </div>

          <div className="flex-1  hidden md:flex items-center justify-center px-2 lg:px-6">
            <div className="w-full max-w-2xl ">
              <SearchBar lang={lang} />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {loginUser ? (
              <>
                <Link href={`/${lang}/favourite`} className=" px-4 ">
                  <Heart
                    className={`w-6 h-6  text-primaryText hover:text-secondaryText  ${searchBarStyle}`}
                  />
                </Link>
                <div className="">
                  <NotificationDropdown lang={lang} />
                </div>
                <Link href={`/${lang}/chat`} className="  px-4 ">
                  <Mail className="w-6 h-6  text-primaryText hover:text-secondaryText" />
                </Link>
                <ProfileMenu loginUser={loginUser} onLogout={handleLogout} />
              </>
            ) : (
              <div className="border border-primaryText px-3 py-1.5 rounded-lg">
                <Link
                  href={`/${lang}/signup`}
                  className="text-primaryText hover:text-secondaryText px-2  text-sm font-medium"
                >
                  {t?.signup}
                </Link>
                <span className="text-primaryText">|</span>
                <Link
                  href={`/${lang}/login`}
                  className="text-primaryText hover:text-secondaryText px-2  text-sm font-medium"
                >
                  {t?.login}
                </Link>
              </div>
            )}

            <Link
              href={loginUser ? `/${lang}/sell/new` : `/${lang}/login`}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryText"
            >
              {t?.sellNow}
            </Link>

            <div>
              <LanguageDropdown />
            </div>
          </div>
          <div className="-mr-2 flex items-center gap-2 sm:hidden">
            <LanguageDropdown />
            {loginUser && <NotificationDropdown lang={lang} />}

            <button
              // onClick={() => setIsMenuOpen(!isMenuOpen)}
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryText"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {!isLoginOrSignupPage ? (
        <div className="border-t  border-b border-gray-200 hidden sm:block ">
          <div className="max-w-screen-xl mx-auto px-4  sm:px-6 lg:px-8">
            <CategoriesNav isCatMenuOpen={isCatMenuOpen} lang={lang} />
          </div>
        </div>
      ) : (
        <div className="border-t  border-gray-200 hidden sm:block"></div>
      )}
      {isSidebarOpen && (
        <Sidebar
          lang={lang}
          loginUser={loginUser}
          handleLogout={handleLogout}
          t={t}
          isMenuOpen={isSidebarOpen}
          setIsMenuOpen={setIsSidebarOpen}
        />
      )}
    </nav>
  );
};

export default Navbar;
