import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { NavList } from "./NavList";
import { navRoutes } from "../data";

const MobileNavMenuModal = memo(({ isOpen, setIsOpen }) => {
  if (isOpen) {
    return (
      <aside className=" z-[1] fixed md:hidden bottom-0 left-0 w-full h-full border border-r-slate-200 bg-[#F3F4F5]">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link href="/" className=" flex flex-col">
          {/* <p
            className="text-3xl font-bold text-primaryText "
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
          </p> */}
          <img
            src="/logpMain.png"
            alt="Logo"
            className="w-48 sm:w-56 h-[95%] "
          />
        </Link>

        <NavList setIsOpen={setIsOpen} route={navRoutes} />
      </aside>
    );
  }
});

MobileNavMenuModal.displayName = "MobileNavMenuModal";
export default MobileNavMenuModal;
