import Image from "next/image";
import { navRoutes } from "./data";
import { NavList } from "./_components/NavList";
import Link from "next/link";
import DashboardNav from "./_components/DashboardNav";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function DashboardLayout({ children }) {
  return (
    <div className="grid fixed w-full grid-cols-1 lg:grid-cols-[max-content_1fr]">
      <aside className="hidden lg:block max-w-[270px] w-[20vw] min-w-[250px] h-screen border-r-2 border-slate-200">
        <Link href="/" className=" flex  flex-col mt-1 ml-5">
          {/* <p
            className="text-primaryText text-3xl py-1 font-bold "
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
            className="w-48 sm:w-56 h-[95%] object-cover"
          />
        </Link>

        <NavList route={navRoutes} />
      </aside>

      <main className="w-full relative overflow-y-scroll  h-screen   ">
        <DashboardNav />
        <Toaster />
        <Suspense
          fallback={
            <div className="flex items-center justify-center ">
              <Loading />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}
