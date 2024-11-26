import langs from "@/app/[lang]/dictionaries/langs";
import api from "@/redux/api";
import { updateFavoriteStatus } from "@/redux/slices/favorites.slice";
import { loadUserFromStorage } from "@/redux/slices/user.slice";
import { Edit, Heart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product, type, refetch, lang }) => {
  const t = langs[lang]?.productCard;
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(product?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const loginUser = useSelector((state) => state.auth.loginUser);

  const [toggleFavorite, { isLoading: isToggling }] =
    api.adminApis.useToggleFavoriteMutation();
  const [deleteProduct, { isSuccess: isDeleteSuccess }] =
    api.adminApis.useDeleteProductMutation();

  useEffect(() => {
    if (loginUser && product?.likes?.includes(loginUser._id)) {
      setIsLiked(true);
      setLikesCount(product?.likes?.length);
    } else {
      setIsLiked(false);
      setLikesCount(product?.likes?.length);
    }
  }, [loginUser, product, router]);

  const handleToggleFavorite = async () => {
    if (loginUser) {
      try {
        const res = await toggleFavorite({
          productId: product._id,
          userId: loginUser?._id,
        });
        if (res?.data?.success) {
          setIsLiked(res.data.isLiked);
          setLikesCount(res.data.likesCount);
          toast.success(`${res?.data?.message}`);
          dispatch(updateFavoriteStatus(res?.data?.isLiked));
          console.log("res?.data?.isLiked", res?.data?.isLiked);
          if (refetch) {
            refetch();
          } else {
            console.warn("Cannot refetch as query has not been initialized.");
          }
        }
      } catch (error) {
        toast.error("Failed to toggle like.");
      }
    } else {
      toast.error(t?.likeMessage);
      return;
    }
  };

  const handleDelete = async () => {
    const confirmToastId = toast.info(
      <div className="">
        <span>{t?.deleteConfirm}</span>
        <div className=" flex flex justify-end">
          <button
            onClick={async () => {
              toast.dismiss(confirmToastId);
              try {
                const res = await deleteProduct(product._id);
                if (res?.data?.success) {
                  toast.success(t.deleteSuccess);
                  refetch();
                } else {
                  toast.error(t.deleteFail);
                }
              } catch (error) {
                toast.error(t.deleteFail);
              }
            }}
            className="mr-2 text-red-600 border p-2 rounded"
          >
            {t?.deleteButton}
          </button>
          <button
            onClick={() => toast.dismiss(confirmToastId)}
            className="text-white border p-2 rounded"
          >
            {t?.no}
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );

    setTimeout(() => {
      toast.dismiss(confirmToastId);
    }, 30000);
  };

  return (
    <div className="max-w-sm mx-auto border bg-white shadow-xl  rounded-xl  overflow-hidden">
      <div className="relative h-[300px] bg-[#DDE0EA]   rounded-tl-xl rounded-tr-xl">
        {product?.status === "Sold Out" && (
          <div className="absolute -top-1 right-0 mx-auto  z-20">
            <Image
              src="/sold.png"
              alt="Black sweatpants with red heart design"
              width={300}
              height={300}
              className={`w-16 h-16`}
            />
          </div>
        )}
        <Link href={`/${lang}/product/${product?._id}`}>
          <Image
            src={product?.photos[0]}
            alt={product?._id}
            width={300}
            height={300}
            className={` ${
              type === "Sold" ? "blur-md" : ""
            } w-full h-[280px]  drop-shadow-xl object-contain hover:scale-110 transition-transform duration-300 ease-in-out py-2`}
          />
        </Link>
        <div className="absolute top-0 left-0 mx-auto   p-1 cursor-pointer bg-[#F3F4F5]  rounded-xl">
          {type === "closet" && product?.userId?._id === loginUser?._id && (
            <div className="flex flex-col items-center">
              <div
                onClick={() => {
                  router.push(`/${lang}/product/edit/${product._id}`);
                }}
                className="mt-3 p-1 rounded-full hover:bg-gray-200"
              >
                <Edit className="w-5 h-5 text-blue-600" />
              </div>
              <button
                type="button"
                onClick={handleDelete}
                className="mt-3 p-1 rounded-full hover:bg-gray-200"
              >
                <Trash className="w-5 h-5 text-red-600" />
              </button>
            </div>
          )}

          <div
            className="flex justify-center"
            onClick={() =>
              router.push(`/${lang}/profile/${product?.userId?._id}`)
            }
          >
            <Image
              src={product?.userId?.avatar || "/avatar.png"}
              alt="User avatar"
              width={24}
              height={24}
              className=" hover:border-red-500 mt-3 rounded-full h-8 w-8 border border-primaryGray"
            />
          </div>
          <div
            onClick={handleToggleFavorite}
            className="my-3 flex items-center   p-1 rounded-lg"
          >
            <Heart
              className={`w-5 h-5 mr-[1px] hover:text-red-500 ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
            <span className="text-sm text-secondaryText">{likesCount}</span>
          </div>
        </div>
      </div>

      <Link href={`/${lang}/product/${product?._id}`}>
        <div className="p-4">
          {product?.visibleStatus === "Rejected" && product?.adminComment && (
            <p className="my-2 text-md text-red-500">
              <span className="font-semibold">{t?.rejectedDue} </span>{" "}
              {product.adminComment}
            </p>
          )}
          <h2 className="text-nowrap capitalize text-lg font-semibold text-primaryText hover:underline leading-4">
            {product?.title?.length > 20
              ? `${product.title.substring(0, 20)}...`
              : product?.title}
          </h2>

          <div className="flex justify-between w-full my-3">
            <p className="text-sm text-secondaryText capitalize">
              {product?.brand}{" "}
            </p>
            <p className="text-sm text-secondaryText capitalize ">
              {product?.size}
            </p>
          </div>

          <p className="text-xl text-primaryText font-bold">
            {product?.price} <sup>DH</sup>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
