import React from "react";
import Image from "next/image";
import Link from "next/link";
import langs from "@/app/[lang]/dictionaries/langs";

const CarouselBoxCard = ({ product, lang }) => {
  return (
    <div className="w-full h-full px-2 my-2">
      <div className="flex flex-col w-full p-3 shadow-lg backdrop-filter backdrop-blur-[10px] bg-palette-card/80 rounded-md">
        <Link href={`/${lang}/product/${product?._id}`}>
          <div className=" flex-grow">
            {product?.photos[0] && (
              <Image
                src={product?.photos[0]}
                alt="laptop image"
                width={200}
                height={185}
                className="object-contain hover:scale-105 h-[200px] transition-transform !p-2 mx-auto"
              />
            )}
            <h2 className="text-md font-semibold text-primaryText hover:underline ">
              {product?.title?.length > 15
                ? `${product.title.substring(0, 15)}...`
                : product?.title}
            </h2>
            <div className="flex justify-between w-full my-3">
              <p className="text-sm text-secondaryText">{product?.brand} </p>
              <p className="text-sm text-secondaryText ">{product?.size}</p>
            </div>

            <p className="text-xl text-primaryText font-bold">
              {product?.price} <sup>DH</sup>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CarouselBoxCard;
