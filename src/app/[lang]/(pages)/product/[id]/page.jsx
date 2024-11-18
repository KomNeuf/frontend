"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useRouter } from "next/navigation";
import Viewer from "react-viewer";
import Image from "next/image";
import { ChevronRight, Clock, InfoIcon, MapPin } from "lucide-react";
import { formatDate, getLastSeenText } from "@/utils/myFuc";
import ProductCard from "@/components/landingPage/ProductCard";
import NoData from "@/components/NoData";
import MemberItems from "@/components/product/MemberItems";
import SimilarItems from "@/components/product/SimilarItems";
import { useSelector } from "react-redux";
import RatingReview from "@/components/profile/RatingReview";
import FollowButton from "@/components/profile/FollowButton";
import langs from "@/app/[lang]/dictionaries/langs";
import Benefits from "@/components/product/Benefits";

const DetailPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.detailPage;
  const [visible, setVisible] = useState(false);
  const loginUser = useSelector((state) => state.auth?.loginUser);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [incrementViewCount, { isLoading: isToggling }] =
    api.adminApis.useIncrementViewCountMutation();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = api.adminApis.useGetProductByIdQuery(id, {
    skip: !id,
  });

  const handleOpenViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };
  useEffect(() => {
    refetch();
  }, []);
  const images = product?.photos?.map((photo, index) => ({
    src: photo,
    alt: `${product?.title + " " + index}  `,
  }));
  useEffect(() => {
    if (loginUser?._id) {
      incrementViewCount({ productId: id, userId: loginUser._id });
    }
  }, [id, loginUser]);

  const visibleThumbnails = product?.photos?.slice(1, 8) || [];
  const remainingImagesCount = product?.photos?.length - 5;

  const handleClose = () => {
    setVisible(false);
  };

  const handleOutsideClick = (event) => {
    const viewer = document.querySelector(".react-viewer-mask");
    const toolbar = document.querySelector(".react-viewer-toolbar");
    const viewList = document.querySelector(".react-viewer-list");
    const viewImage = document.querySelector(".react-viewer-image");

    if (
      viewer &&
      !viewer.contains(event.target) &&
      !toolbar.contains(event.target) &&
      !viewList.contains(event.target) &&
      !viewImage.contains(event.target)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [visible]);

  if (isLoading) return <Loading />;
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  ">
        <div className="col-span-4">
          <div
            className={`grid ${
              product?.photos?.length === 1 ? "grid-cols-1" : "grid-cols-4"
            } gap-2`}
          >
            <div
              className={`${
                product?.photos?.length === 1
                  ? "col-span-1"
                  : "col-span-3 row-span-3"
              }`}
            >
              {product?.photos?.[0] && (
                <Image
                  src={product.photos[0]}
                  alt={`Main Product Image`}
                  width={300}
                  height={300}
                  className="w-full  h-full border object-cover   rounded-lg cursor-pointer hover:border-primaryText"
                  onClick={() => handleOpenViewer(0)}
                />
              )}
            </div>
            {product?.photos?.length > 1 &&
              visibleThumbnails.map((photo, index) => {
                const isLastThumbnail = index === 6 && remainingImagesCount > 0;
                return (
                  <div key={index + 1} className="relative col-span-1">
                    <Image
                      src={photo}
                      alt={`Product Thumbnail ${index + 2}`}
                      width={120}
                      height={120}
                      className="w-full h-full rounded-lg cursor-pointer border hover:border-primaryText drop-shadow-xl object-cover"
                      onClick={() => handleOpenViewer(index + 1)}
                    />

                    {isLastThumbnail && (
                      <div
                        className="absolute border inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white text-lg font-semibold rounded-lg cursor-pointer hover:border-primaryText"
                        onClick={() => handleOpenViewer(7)}
                      >
                        +{remainingImagesCount}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="col-span-2 md:mt-0 md:ml-5 mt-4">
          <div className="w-full bg-primaryGray shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl text-primaryText font-bold">
                  {product?.price} MAD
                </p>

                {product?.status === "Sold Out" && (
                  <div className="  ">
                    <Image
                      src="/soldout.png"
                      alt="Black sweatpants with red heart design"
                      width={300}
                      height={300}
                      className=" w-32 h-16"
                    />
                  </div>
                )}
              </div>

              <div
                style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                className="space-y-2 mb-4"
              >
                {[
                  { label: t?.refNo, value: product?.referenceNumber },
                  { label: t?.brand, value: product?.brand },
                  { label: t?.condition, value: product?.condition },
                  { label: t?.materials, value: product?.materials },
                  {
                    label: t?.color,
                    value:
                      typeof product?.color === "string" && product?.color ? (
                        <div className="flex flex-wrap gap-1">
                          {product?.color?.split(",").map((col, index) => (
                            <span
                              key={index}
                              className="bg-[col] h-5 w-5"
                              style={{ backgroundColor: col }}
                            ></span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          No colors available
                        </span>
                      ),
                  },
                  {
                    label: langs[lang]?.editProduct?.size,
                    value: product?.size,
                  },
                  { label: t?.location, value: product?.userId?.country },
                  { label: t?.paymentOptions, value: t?.cash },
                  { label: t?.views, value: product?.viewCount },
                  { label: t?.uploaded, value: formatDate(product?.createdAt) },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-primaryText uppercase">
                      {item.label}
                    </span>
                    <span className="font-medium uppercase text-secondaryText">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              {product?.shippingOffer && (
                <div
                  style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                  className="font-medium uppercase text-secondaryText mb-4"
                >
                  <div className="text-sm text-green-600 font-semibold">
                    {t?.shippingOffer}
                  </div>
                </div>
              )}

              <h2 className="text-xl text-primaryText font-semibold mb-2">
                {product.title}
              </h2>
              <p className="break-words mb-4 text-secondaryText">{product.description}</p>
              {product?.userId?._id === loginUser?._id ? (
                <button className="w-full bg-primaryText text-white py-2 rounded-md ">
                  {t?.yourProductMessage}
                </button>
              ) : product?.status === "Sold Out" ? (
                <button className="w-full bg-primaryText text-white py-2 rounded-md ">
                  {langs[lang]?.productCard?.soldOut}
                </button>
              ) : (
                <button
                  onClick={() =>
                    loginUser
                      ? router.push(`/${lang}/checkout/${product?._id}`)
                      : router.push(`/${lang}/login`)
                  }
                  className="w-full bg-primaryText text-white py-2 rounded-md hover:bg-primaryText/80 transition duration-300"
                >
                  {t?.buyNow}
                </button>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={product?.userId?.avatar || "/avatar.png"}
                    alt={t?.avatarAlt}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {product?.userId?.name}
                    </h3>
                    <RatingReview userID={product?.userId?._id} lang={lang} />
                  </div>
                </div>
                <ChevronRight
                  onClick={() =>
                    router.push(`/${lang}/profile/${product?.userId?._id}`)
                  }
                  className="text-gray-400 cursor-pointer hover:text-primaryText"
                />
              </div>
              <div className="space-y-2 mb-4">
                {(product?.userId?.city || product?.userId?.country) && (
                  <div className="flex items-center text-sm text-secondaryText">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>
                      {" "}
                      {product?.userId?.city + "," + product?.userId?.country}
                    </span>
                  </div>
                )}
                <div className="flex items-center text-sm text-secondaryText">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    {getLastSeenText(product?.userId?.lastSeen, lang)}
                  </span>
                </div>
              </div>
              {loginUser && (
                <FollowButton
                  t={t}
                  loginUser={loginUser}
                  id={product?.userId?._id}
                  user={product?.userId}
                />
              )}
            </div>
          </div>
        </div>

        <Viewer
          visible={visible}
          noImgDetails={true}
          onClose={handleClose}
          images={images}
          activeIndex={currentIndex}
          onChange={(newIndex) => {
            if (newIndex >= 0 && newIndex < images?.length) {
              setCurrentIndex(newIndex);
            }
          }}
        />
      </div>
      <div className="my-8">
        <Benefits lang={lang} />
      </div>
      <MemberItems product={product} lang={lang} />
      <SimilarItems product={product} lang={lang} />
    </div>
  );
};

export default DetailPage;
