"use client";

import Link from "next/link";
import { navRoutes } from "../data";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const NavList = ({ route, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const loggedInUser =
    typeof window != "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));
  const highlightActive = (arg) =>
    pathname.split(/\//).includes(arg.split(/\//)[0]);

  const handleSignOut = () => {
    if (typeof window !== "undefined" && loggedInUser) {
      localStorage.removeItem("userToken");
      router.push("/dashboard/sign-in");
    }
    toast.success("Logout Successfully");
  };

  return (
    <ul className="flex flex-col gap-y-4 my-[2vh] ">
      {route.map((item, index) => (
        <li
          key={index}
          className={`pl-4 pr-5 border-l- ${
            highlightActive(item.route)
              ? "border-l-[#070911]"
              : "border-l-white"
          }`}
        >
          <Link
            href={`/dashboard/${item.route}`}
            onClick={() => {
              setIsOpen && setIsOpen(false);
            }}
            className={`flex rounded-md flex-row  px-3 py-3.5 items-center gap-2  hover:text-[#F5F1E4]  
              hover:bg-primaryText
              // hover:bg-[#070911]
               ${
                 highlightActive(item.route)
                   ? "!bg-primaryText !text-white"
                   : "text-zinc-600"
               }`}
          >
            <span className={`flex font-medium rounded-md flex-row gap-2.5 `}>
              {item.icon}
              <p className="text-md">{item.text}</p>
            </span>
            {item.subroutes && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 ml-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </Link>
          {item.subroutes && (
            <ul className="flex fo mt-1 flex-col py-2 bg-zinc-100 text-zinc-700 inset-10 rounded-md">
              {item.subroutes.map((subroute, innerIndex) => (
                <li
                  key={innerIndex}
                  className={`py-2 ${
                    highlightActive(subroute.route)
                      ? "text-primary-red"
                      : "text-zinc-600"
                  }`}
                >
                  <Link
                    href={`/dashboard/applications/${subroute.route}`}
                    className="pl-8"
                  >
                    {subroute.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      <li className="pl-4 pr-5 border-l-white">
        <button
          onClick={handleSignOut}
          className="w-full flex rounded-md flex-row px-3 py-3.5 items-center gap-2 text-zinc-600 hover:text-[#F5F1E4] hover:bg-primaryText"
        >
          <span className="flex font-medium rounded-md flex-row gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" />
            </svg>
            <p className="text-md">Logout</p>
          </span>
        </button>
      </li>
    </ul>
  );
};
