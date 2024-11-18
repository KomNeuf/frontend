"use client";
import { useState, memo, useEffect } from "react";
import MobileNavMenuModal from "./MobileNavModal";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DashboardNav = memo(() => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const loggedInUser =
    typeof window != "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    if (typeof window !== "undefined" && !loggedInUser)
      router.push("/dashboard/sign-in ");
  }, [loggedInUser]);

  const rootReducer = useSelector((RootReducer) => RootReducer);

  useEffect(() => {
    if (typeof window != "undefined") {
      if (!loggedInUser) router.push("/dashboard/sign-in");
    }
  }, [rootReducer, typeof window]);

  return (
    <nav className="w-full z-40 sticky top-0  flex justify-between  py-2 md:py-3 px-3 md:px-4 xl:px-6 shadow items-center bg-[#F3F4F5]" >
      <div className="flex flex-col items-center gap-x-1.5">
        <h1
          className="text-2xl font-bold -mb-1 text-slate-700 
         text-primaryText
        capitalize"
        >
          Hi {loggedInUser?.firstName || ""} {loggedInUser?.lastName || ""}
        </h1>
        <p className="text-zinc-500 text-sm">Welcome back!</p>
      </div>

      <button
        onClick={() => setIsNavOpen(true)}
        className="block md:hidden text-primary border border-primary/60 px-2 py-0.5 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <MobileNavMenuModal isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
    </nav>
  );
});

DashboardNav.displayName = "DashboardNav";
export default DashboardNav;
