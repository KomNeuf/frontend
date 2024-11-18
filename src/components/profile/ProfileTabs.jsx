import React, { useState } from "react";
import ReviewsComponent from "./ReviewsComponent";
import ClosetCompoonent from "./ClosetCompoonent";
import langs from "@/app/[lang]/dictionaries/langs";
import InappropriateProduct from "./InappropriateProduct";
import PendingProducts from "./PendingProducts";

const ProfileTabs = ({ userID, lang, loginUser }) => {
  const t = langs[lang]?.profileTabs;
  const [activeTab, setActiveTab] = useState("closet");

  return (
    <div>
      <ul className="flex gap-2 border-b border-gray-200">
        <li
          className={` p-3 cursor-pointer hover:bg-gray-200 ${
            activeTab === "closet"
              ? "border-b-2 border-primaryText bg-gray-200"
              : "border-b-2 border-transparent"
          }`}
          onClick={() => setActiveTab("closet")}
        >
          {t?.closet}
        </li>

        <li
          className={` p-3 cursor-pointer hover:bg-gray-200 ${
            activeTab === "reviews"
              ? "border-b-2 border-primaryText bg-gray-200"
              : "border-b-2 border-transparent"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          {t?.reviews}
        </li>
        {loginUser?._id === userID && (
          <>
            <li
              className={` p-3 cursor-pointer hover:bg-gray-200 ${
                activeTab === "rejected"
                  ? "border-b-2 border-primaryText bg-gray-200"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("rejected")}
            >
              {t?.rejectedItems}
            </li>
            <li
              className={` p-3 cursor-pointer hover:bg-gray-200 ${
                activeTab === "pending"
                  ? "border-b-2 border-primaryText bg-gray-200"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              {t?.pendingItems || "Pending Items"}
            </li>
          </>
        )}
      </ul>

      <div className="mt-4">
        {activeTab === "closet" && (
          <ClosetCompoonent userID={userID} lang={lang} />
        )}

        {activeTab === "reviews" && (
          <ReviewsComponent userID={userID} lang={lang} />
        )}

        {activeTab === "rejected" && (
          <InappropriateProduct userID={userID} lang={lang} />
        )}
        {activeTab === "pending" && (
          <PendingProducts userID={userID} lang={lang} />
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;
