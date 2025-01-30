"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight, Clock, MapPin, Star } from "lucide-react";
import { useSelector } from "react-redux";
import api from "@/redux/api";
import Loading from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import { getLastSeenText } from "@/utils/myFuc";
import RatingReview from "@/components/profile/RatingReview";
import FollowButton from "@/components/profile/FollowButton";
import langs from "@/app/[lang]/dictionaries/langs";

const FollowDetailPage = () => {
  const loginUser = useSelector((state) => state.auth?.loginUser);
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.followDetailPage;
  const id = pathname.split("/")[3];
  const query = pathname.split("/")[4];
  const {
    data: user,
    isLoading,
    error,
  } = api.adminApis.useGetSingleUserQuery(id, {
    skip: !id,
  });
  if (isLoading) return <Loading />;
  const usersToDisplay =
    query === "followers" ? user?.followers : user?.following;
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
      <div className="md:w-1/3 ">
        <div className="flex items-center justify-between mb-4  border-b border-gray-200">
          <div className="flex items-center">
            <Image
              src={user?.avatar || "/avatar.png"}
              alt="User avatar"
              width={72}
              height={72}
              className="rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <RatingReview userID={user?._id} lang={lang} />
            </div>
          </div>
          <ChevronRight
            onClick={() =>
              router.push(`/${lang}/profile/${user?.name.replace(/ /g, "-")}`)
            }
            className="text-gray-400  cursor-pointer hover:text-primaryText"
          />
        </div>
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
          {(user?.city || user?.country) && (
            <div className="flex items-center text-gray-600 mb-1 capitalize">
              <MapPin className="w-4 h-4 mr-2" />

              <span>{user?.city + " " + user?.country} </span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-md ">
              {getLastSeenText(user?.lastSeen, lang)}
            </span>
          </div>
        </div>
        {loginUser && (
          <FollowButton loginUser={loginUser} id={id} user={user} />
        )}
      </div>

      <div className="md:w-2/3">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-4">
          {user?.name} {query}
        </h3>
        <div className="flex flex-wrap gap-6">
          {usersToDisplay?.map((follower, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={follower?.avatar}
                alt={`${follower.name} Avatar`}
                width={72}
                height={72}
                className="rounded-full border border-primaryText"
              />
              <h4 className="mt-2 text-lg font-semibold">{follower?.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowDetailPage;
