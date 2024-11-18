"use client";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { formatDateNotification } from "@/utils/myFuc";
import React from "react";
import { useSelector } from "react-redux";

const NotificationsPage = () => {
  const loginUser = useSelector((state) => state.auth.loginUser);
  const {
    data: notifications,
    isLoading,
    error,
  } = api.adminApis.useGetUserNotificationsQuery(loginUser?._id, {
    skip: !loginUser,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h1 className="text-3xl text-darkGray font-bold mb-6">Notifications</h1>
      {notifications?.data?.length === 0 ? (
        <p className="text-lg text-center text-gray-500">
          No notifications yet.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications?.data?.map((notification) => (
            <li
              key={notification.id}
              className="p-4 flex items-start hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <img
                src={notification?.senderId?.avatar}
                alt="Sender Avatar"
                className="w-12 h-12 rounded-full mr-4 shadow"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-md text-gray-800">
                  {notification?.message}
                </h3>
                <p className="text-sm text-gray-600">{notification?.detail}</p>
                <p className="text-xs text-gray-400 my-2">
                  {formatDateNotification(notification?.time)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
