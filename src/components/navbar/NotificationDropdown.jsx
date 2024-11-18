"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import api from "@/redux/api";
import { formatDateNotification } from "@/utils/myFuc";
import Link from "next/link";
const socket = io("http://localhost:5000");
// const socket = io("https://kiff-new-backend.vercel.app");
const NotificationDropdown = ({ lang }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loginUser = useSelector((state) => state.auth.loginUser);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const beepSound = useRef(new Audio("/beepSound.wav"));
  const {
    data: fetchedNotifications,
    isLoading,
    refetch,
    error,
  } = api.adminApis.useGetUserNotificationsQuery(loginUser?._id, {
    skip: !loginUser,
  });

  const [createNotification, { isLoading: isNotificationLoading }] =
    api.adminApis.useUpdateNotificationMutation();

  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications?.data);
      setUnreadCount(fetchedNotifications?.data?.filter((n) => !n.read).length);
    }
  }, [fetchedNotifications]);
  useEffect(() => {
    socket.on("newNotification", async (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      if (beepSound.current) {
        await beepSound.current.play();
      }
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const handleClicked = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    await createNotification({ id: loginUser._id });
    refetch();
  };

  useEffect(() => {
    if (loginUser?._id) {
      socket.emit("joinRoom", loginUser._id);
    }
  }, [loginUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-max mx-auto">
      <div className="relative">
        <Bell
          onClick={handleClicked}
          className="w-6 h-6 text-primaryText hover:text-secondaryText cursor-pointer"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute block right-0 shadow-lg bg-primaryGray py-4 z-[1000] min-w-full rounded-lg w-64 sm:w-[410px] max-h-[500px] overflow-auto mt-4"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="flex items-center justify-between px-4 pb-2 border-b border-primaryBg">
            <p className="text-xl text-darkGray font-semibold">Notifications</p>
            <X
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          {notifications?.length === 0 ? (
            <div className="min-h-32 flex justify-center items-center">
              <p className="text-center text-xl font-semibold text-secondaryText ">
                No Notifications Yet.
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-primaryBg">
                {notifications?.slice(0, 8)?.map((notification) => (
                  <li
                    key={notification?._id}
                    className="p-4 flex items-center hover:bg-primaryBg cursor-pointer"
                  >
                    <img
                      src={notification?.senderId?.avatar}
                      className="w-12 h-12 rounded-full shrink-0"
                    />
                    <div className="ml-6">
                      <h3 className="text-sm text-primaryText font-semibold">
                        {notification?.message}
                      </h3>
                      <p className="text-xs text-secondaryText mt-2">
                        {notification?.detail}
                      </p>
                      <p className="text-xs text-darkGray leading-3 mt-2">
                        {formatDateNotification(notification?.time)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Link
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  href={`/${lang}/notifications`}
                  className="text-sm  px-4 mt-6 mb-4 text-darkGray cursor-pointer hover:underline"
                >
                  View all Notifications
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
