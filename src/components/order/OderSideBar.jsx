"use client";
import React, { useState } from "react";
import Sold from "./Sold";
import Bought from "./Bought";
import withAuth from "@/app/middleware/withAuth";
import api from "@/redux/api";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import OrderTab from "./OrderTab";
import langs from "@/app/[lang]/dictionaries/langs";
import SenditTracking from "./SenditTracking";

const OderSideBar = ({ lang }) => {
  const t = langs[lang]?.order;
  const loginUser = useSelector((state) => state.auth.loginUser);
  const [activeTab, setActiveTab] = useState("sold");
  const {
    data: ordersData,
    isLoading,
    refetch,
    error,
  } = api.adminApis.useGetOrdersByStatusQuery(
    {
      status: "All",
      userType: activeTab,
      userId: loginUser?._id,
    },
    {
      skip: !loginUser,
    }
  );

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-3xl font-bold text-primaryText mb-6">
        {t?.myOrders}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="">
          <div className="mb-2">
            <button
              onClick={() => setActiveTab("sold")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "sold"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {t?.sold}
            </button>
          </div>
          <div className="mb-2">
            <button
              onClick={() => setActiveTab("bought")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "bought"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {t?.bought}
            </button>
          </div>

          <div className="mb-2">
            <button
              onClick={() => setActiveTab("info")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "info"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {langs[lang]?.senditTracking?.title}
            </button>
          </div>
          {activeTab === "sold" && (
            <div
              className={`my-2 py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md bg-[#E1E4E7] text-secondaryText `}
            >
              <p>
                <strong className="mb-2">{t?.title}</strong>
                <br />
                {t?.content}
              </p>
            </div>
          )}
        </div>

        <div className="col-span-2 ">
          {activeTab === "sold" && (
            <OrderTab type="sold" orders={ordersData?.data} refetch={refetch} />
          )}
          {activeTab === "bought" && (
            <OrderTab
              type="bought"
              orders={ordersData?.data}
              refetch={refetch}
            />
          )}
          {activeTab === "info" && <SenditTracking lang={lang} />}
        </div>
      </div>
    </div>
  );
};

export default withAuth(OderSideBar);
