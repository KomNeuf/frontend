"use client";
import Loading from "@/components/Loading";
import AccountSettings from "@/components/settings/AccountSettings";
import Payments from "@/components/settings/Payments";
import ProfileDetails from "@/components/settings/ProfileDetails";
import Shipping from "@/components/settings/Shipping";
import withAuth from "@/app/middleware/withAuth";
import api from "@/redux/api";
import { login } from "@/redux/slices/user.slice";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import langs from "../../dictionaries/langs";

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profileDetails");
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.settingPage;
  const loginUser = useSelector((state) => state.auth.loginUser);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    biography: "",
    avatar: "",
    country: "",
    language: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    payoutOptions: {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    },
    shippingAddress: {
      address: "",
      city: "",
      country: "",
      city: "",
      phone: "",
    },
  });

  const [updateUser, { isSuccess, data, isLoading: updating }] =
    api.adminApis.useUpdateUserMutation();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = api.adminApis.useGetSingleUserQuery(loginUser?._id, {
    skip: !loginUser?._id,
  });

  useEffect(() => {
    if (tab && user) {
      setActiveTab(tab);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        biography: user?.biography || "",
        avatar: user?.avatar || "",
        country: user?.country || "",
        language: user?.language || "",
        city: user?.city || "",
        dateOfBirth: user?.dateOfBirth || "",
        gender: user?.gender || "",
        payoutOptions: {
          accountHolderName: user?.payoutOptions?.accountHolderName || "",
          accountNumber: user?.payoutOptions?.accountNumber || "",
          bankName: user?.payoutOptions?.bankName || "",
          accountType: user?.payoutOptions?.accountType || "",
          billingAddress: {
            fullName: user?.payoutOptions?.billingAddress?.fullName || "",
            address: user?.payoutOptions?.billingAddress?.address || "",
            postalCode: user?.payoutOptions?.billingAddress?.postalCode || "",
            country: user?.payoutOptions?.billingAddress?.country || "",
          },
        },
        shipping: {
          fullName: user?.shipping?.fullName || "",
          address: user?.shipping?.address || "",
          city: user?.shipping?.city || "",
          country: user?.shipping?.country || "",
          phone: user?.shipping?.phone || "",
        },
      });
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^06\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSave = async () => {
    const phone = formData?.shipping?.phone;
    if (phone && !validatePhoneNumber(phone)) {
      toast.error(
        "Invalid phone number. Please enter a valid phone number starting with 06."
      );
      return;
    }

    try {
      const res = await updateUser({
        userId: loginUser?._id,
        formData,
      });

      if (res?.data?.success) {
        dispatch(login(res?.data?.user));
        refetch();
        toast.success(t?.updateSuccess);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error(t?.updateError, error);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h1 className="text-3xl font-bold text-primaryText mb-6">{t?.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
        <div className="">
          <div className="mb-2">
            <button
              onClick={() => setActiveTab("profileDetails")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "profileDetails"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {t?.profileDetails}
            </button>
          </div>
          <div className="mb-2">
            <button
              onClick={() => setActiveTab("accountSettings")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "accountSettings"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {t?.accountSettings}
            </button>
          </div>
          <div className="mb-2">
            <button
              onClick={() => setActiveTab("shipping")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "shipping"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {t?.shipping}
            </button>
          </div>
          {/* <div className="mb-2">
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-2 w-full px-4 md:text-left  text-center  font-medium text-md rounded-md ${
                activeTab === "payments"
                  ? "bg-primaryText text-white"
                  : "text-gray-500 hover:text-primaryText"
              }`}
            >
              {t?.payments}
            </button>
          </div> */}
        </div>

        <div className="col-span-2 ">
          {activeTab === "profileDetails" && (
            <ProfileDetails
              lang={lang}
              loginUser={loginUser}
              formData={formData}
              onChange={handleFormChange}
              refetch={refetch}
              trasnlate={t}
            />
          )}

          {activeTab === "accountSettings" && (
            <AccountSettings
              lang={lang}
              formData={formData}
              onChange={handleFormChange}
              loginUser={loginUser}
            />
          )}
          {activeTab === "shipping" && (
            <Shipping
              lang={lang}
              formData={formData}
              onChange={handleFormChange}
            />
          )}
          {activeTab === "payments" && (
            <Payments
              lang={lang}
              formData={formData}
              onChange={handleFormChange}
            />
          )}

          <button
            onClick={handleSave}
            disabled={isLoading}
            type="submit"
            className="mt-3  px-4 py-2 float-right text-md font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText/80"
          >
            {updating ? t?.updating : t?.update}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SettingsPage);
