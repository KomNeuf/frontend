"use client";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const searchParams = useSearchParams();

  const {
    data: product,
    isLoading,
    error,
  } = api.adminApis.useGetProductByIdQuery(id, {
    skip: !id,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );

  if (error) return <p>Error loading product details.</p>;

  return (
    <div className="p-8 my-8 overflow-x-scroll">
      <div className="flex space-x-4">
        {product?.photos?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            className="w-36 h-36 rounded object-cover border"
          />
        ))}
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          {product?.title}
        </h1>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Product Ref No:</span>{" "}
          {product?.referenceNumber}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">User Name:</span>{" "}
          {product?.userId?.name}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">User Email:</span>{" "}
          {product?.userId?.email}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {product?.category} &gt; {product?.subcategory} &gt;{" "}
          {product?.specificItem}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Description:</span>{" "}
          {product?.description}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Brand:</span>{" "}
          {product?.brand}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Size:</span>{" "}
          {product?.size}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Condition:</span>{" "}
          {product?.condition}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-whi">Colors:</span>{" "}
          {product?.color?.split(",")?.map((col, index) => (
            <span
              key={index}
              className="inline-block rounded-full mr-1 text-white px-3"
              style={{ backgroundColor: col }}
            >
              {col}
            </span>
          ))}
        </p>

        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Materials:</span>{" "}
          {product?.materials}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Status:</span>{" "}
          {product?.status}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Bank Name:</span>{" "}
          {product?.bankName}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">RIB No:</span>{" "}
          {product?.rib}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-700">Price:</span>
          {product?.price} DH
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
