"use client";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserDetail = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const id = pathname.split("/")[3];

  const {
    data: advertisement,
    isLoading,
    error,
  } = api.adminApis.useGetSingleAdvertisementQuery(id, {
    skip: !id,
  });

  const [editAdvertisement] = api.adminApis.useEditAdvertisementMutation();
  const advertise = advertisement?.data;
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companyType: "",
    country: "",
    budget: "",
    campaign: "",
    message: "",
  });

  useEffect(() => {
    if (advertise) {
      setUpdatedUser({
        firstName: advertise.firstName || "",
        lastName: advertise.lastName || "",
        email: advertise.email || "",
        phone: advertise.phone || "",
        company: advertise.company || "",
        companyType: advertise.companyType || "",
        country: advertise.country || "",
        budget: advertise.budget || "",
        campaign: advertise.campaign || "",
        message: advertise.message || "",
      });
    }
  }, [advertise]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editAdvertisement({ id, ...updatedUser }).unwrap();
      if (res?.success) {
        toast.success("Advertisement updated successfully");
        router.push(`/dashboard/advertise`);
      }
    } catch (error) {
      toast.error("Error updating advertisement: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) return <p>Error loading advertisement details.</p>;

  return (
    <div className="p-8 my-8 overflow-x-scroll">
      {action === "update" ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800">
            Update Advertisement Details
          </h1>
          <form onSubmit={handleSubmit}>
            {Object.entries(updatedUser).map(([key, value]) => (
              <div className="mt-4" key={key}>
                <label className="block text-lg font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-primaryText text-white rounded"
            >
              Save Changes
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Advertisement Details
          </h1>
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {advertise?.title}
              </h1>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">First Name:</span>{" "}
                {advertise?.firstName}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Last Name:</span>{" "}
                {advertise?.lastName}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {advertise?.email}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {advertise?.phone}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Company:</span>{" "}
                {advertise?.company}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Company Type:</span>{" "}
                {advertise?.companyType}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Country:</span>{" "}
                {advertise?.country}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Budget:</span>{" "}
                {advertise?.budget}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Campaign:</span>{" "}
                {advertise?.campaign}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Message:</span>{" "}
                {advertise?.message}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
