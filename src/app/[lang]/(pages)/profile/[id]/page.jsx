"use client";
import React, { useEffect, useState } from "react";
import { Star, MapPin, Clock, Users, Check } from "lucide-react";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { toast } from "react-toastify";
import Link from "next/link";
import { getLastSeenText } from "@/utils/myFuc";
import RatingReview from "@/components/profile/RatingReview";
import langs from "@/app/[lang]/dictionaries/langs";

const ProfilePage = () => {
  const pathname = usePathname();
  const [isFollow, setIsFollow] = useState(false);
  const router = useRouter();
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.profile;
  const username = pathname.split("/")[3];
  const loginUser = useSelector((state) => state.auth?.loginUser);

  const {
    data: user,
    isLoading,
    error,
  } = api.adminApis.useGetSingleUserByNameQuery(username, {
    skip: !username,
  });
  const [toggleFollowUser, { isLoading: isToggling }] =
    api.adminApis.useToggleFollowUserMutation();

  useEffect(() => {
    if (
      user &&
      user?.followers?.some((follower) => follower?._id === loginUser?._id)
    ) {
      setIsFollow(true);
    }
  }, [loginUser, user, router]);
  const handleToggleFollow = async () => {
    if (loginUser) {
      try {
        const res = await toggleFollowUser({
          targetUserId: user?._id,
          loggedInUserId: loginUser?._id,
        });
        if (res?.data?.success) {
          setIsFollow(res.data.isFollow);
          toast.success(` ${res?.data?.message}`);
        }
      } catch (error) {
        toast.error(t?.failedToggleFollow);
      }
    } else {
      toast.error(t?.loginToFollow);
    }
  };

  const handleCopyProfile = () => {
    const profileUrl = `${
      window.location.origin
    }/${lang}/profile/${user?.name.replace(/ /g, "-")}`;

    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        toast.success(t?.profileCopied);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
        toast.error(t?.copyFailed || "Failed to copy profile link!");
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div>
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={
                user?.avatar ||
                "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
              }
              alt="terrymoul's profile picture"
              className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{user?.name}</h2>

              <RatingReview userID={user?._id} lang={lang} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t?.about}</h3>
                  {(user?.city || user?.country) && (
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />

                      <span>{user?.city + " " + user?.country} </span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span> {getLastSeenText(user?.lastSeen, lang)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      <Link
                        className="hover:underline"
                        href={`/${lang}/profile/${user?._id}/followers`}
                      >
                        {user?.followers?.length || 0} {t?.followers},
                      </Link>
                      <Link
                        className="hover:underline"
                        href={`/${lang}/profile/${user?._id}/following`}
                      >
                        {" "}
                        {user?.following?.length || 0} {t?.followingCount}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-700">
                <p className="mb-4">{user?.biography}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 space-x-2 flex ">
            <button
              onClick={handleCopyProfile}
              className="px-4 text-nowrap py-2 text-sm font-medium hover:text-white text-primaryText border border-primaryText rounded-md hover:bg-primaryText/80"
            >
              {t?.copyProfile}
            </button>
            {loginUser?._id === user?._id ? (
              <button
                onClick={() => {
                  loginUser
                    ? router.push(`/${lang}/settings`)
                    : router.push(`/${lang}/login`);
                }}
                className="px-4 text-nowrap py-2 text-sm font-medium hover:text-white text-primaryText border border-primaryText rounded-md hover:bg-primaryText/80"
              >
                {t?.editProfile}
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    loginUser
                      ? router.push(`/${lang}/chat?userId=${user?._id}`)
                      : router.push(`/${lang}/login`);
                  }}
                  className="px-4 py-2 hover:text-white text-sm font-medium text-primaryText border border-primaryText rounded-md hover:bg-primaryText/80"
                >
                  {t?.message}
                </button>
                <button
                  onClick={handleToggleFollow}
                  className="px-4 py-2 text-sm font-medium text-white bg-primaryText rounded-md hover:bg-primaryText/80"
                >
                  {isFollow ? t?.following : t?.follow}
                </button>
              </>
            )}
          </div>
        </div>

        <ProfileTabs userID={user?._id} lang={lang} loginUser={loginUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
