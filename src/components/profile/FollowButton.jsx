import langs from "@/app/[lang]/dictionaries/langs";
import api from "@/redux/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FollowButton = ({ loginUser, id, user }) => {
  const [isFollow, setIsFollow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.followButton;
  const [toggleFollowUser, { isLoading: isToggling }] =
    api.adminApis.useToggleFollowUserMutation();

  useEffect(() => {
    if (
      user &&
      user?.followers?.some(
        (follower) => (follower?._id || follower) === loginUser?._id
      )
    ) {
      setIsFollow(true);
    }
  }, [loginUser, user, router]);
  const handleToggleFollow = async () => {
    try {
      const res = await toggleFollowUser({
        targetUserId: id,
        loggedInUserId: loginUser?._id,
      });
      if (res?.data?.success) {
        setIsFollow(res.data.isFollow);
        toast.success(` ${res?.data?.message}`);
      }
    } catch (error) {
      toast.error("Failed to toggle follow.");
    }
  };

  if (loginUser?._id === id) return null;

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => router.push(`/${lang}/chat?userId=${id}`)}
        className="flex-1 bg-primaryText text-white py-2 px-4 rounded-md hover:bg-primaryText/80 transition duration-300"
      >
        {t?.message}
      </button>
      <button
        onClick={handleToggleFollow}
        className="flex-1 bg-primaryBg text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
      >
        {isFollow ? t?.following : t?.follow}
      </button>
    </div>
  );
};

export default FollowButton;
