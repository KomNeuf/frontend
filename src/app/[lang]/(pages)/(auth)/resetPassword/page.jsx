"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import api from "@/redux/api";
import { toast } from "react-toastify";
import langs from "@/app/[lang]/dictionaries/langs";

const ResetPassword = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.resetPassword;
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [resetPassword, { isLoading, isSuccess, error }] =
    api.adminApis.useResetPasswordMutation();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = t?.newPasswordError;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = t?.newPasswordError;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t?.passwordsDoNotMatch;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await resetPassword({ token, newPassword }).unwrap();
        if (response.success) {
          toast.success(t?.passwordResetSuccess);
          router.push(`/${lang}/login`);
        }
      } catch (error) {
        toast.error(error?.data?.message || t?.passwordResetError);
      }
    }
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <div className="min-h-screen flex flex-col items-center pt-20  py-5 px-8">
      <h1 className="text-4xl font-bold text-center text-primaryText mb-8">
        {t?.title}
      </h1>
      <div className="bg-[#FCFBFF] shadow-xl rounded-xlx border border-primaryGray max-w-2xl w-full p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-zinc-700"
            >
              {t?.newPasswordLabel}
            </label>
            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block drop-shadow-lg w-full px-3 py-3 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder={t?.newPasswordPlaceholder}
              />
              <div
                onClick={togglePasswordVisibility1}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
              >
                {showPassword1 ? (
                  <svg
                    clipRule="evenodd"
                    fill="#000"
                    fillRule="evenodd"
                    className="h-6"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
                      fillRule="nonzero"
                    />
                  </svg>
                ) : (
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    className="h-6"
                    fill="#000"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"
                      fillRule="nonzero"
                    />
                  </svg>
                )}
              </div>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-zinc-700"
            >
              {t?.confirmPasswordLabel}
            </label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block drop-shadow-lg w-full px-3 py-3 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder={t?.confirmPasswordPlaceholder}
              />
              <div
                onClick={togglePasswordVisibility2}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
              >
                {showPassword2 ? (
                  <svg
                    clipRule="evenodd"
                    fill="#000"
                    fillRule="evenodd"
                    className="h-6"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
                      fillRule="nonzero"
                    />
                  </svg>
                ) : (
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    className="h-6"
                    fill="#000"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"
                      fillRule="nonzero"
                    />
                  </svg>
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-primaryText cursor-pointer rounded-lg font-bold border border-primaryText hover:bg-primaryText/80  px-5 py-2 hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? t?.resetButton : t?.resetPassword}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
