"use client";
import React, { useState } from "react";
import api from "@/redux/api";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import langs from "@/app/[lang]/dictionaries/langs";

const ForgotPassword = () => {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];
  const [email, setEmail] = useState("");
  const t = langs[lang]?.forgotPassword;
  const [emailSent, setEmailSent] = useState(false);
  const [forgotPassword, { isLoading, isSuccess, error, data }] =
    api.adminApis.useForgotPasswordMutation();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error(t?.emptyEmailError);
      return;
    }

    try {
      const response = await forgotPassword({ email, lang }).unwrap();
      if (response.success) {
        toast.success(t?.resetSuccess);
        setEmailSent(true);
      }
    } catch (error) {
      toast.error(error?.data?.message || t?.resetError);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20  py-5 px-8">
      <h1 className="text-4xl font-bold text-center text-primaryText mb-8">
        {t?.title}
      </h1>

      {emailSent ? (
        <div className="bg-[#FCFBFF] shadow-xl rounded-xl max-w-2xl w-full p-8 text-center border border-primaryGray">
          <p className="text-lg text-primaryText font-bold">
            {t?.emailSentMessage}
          </p>
        </div>
      ) : (
        <div className="bg-[#FCFBFF] shadow-xl rounded-xl max-w-2xl w-full p-8  border border-primaryGray">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-primaryText text-sm font-semibold "
              >
                {t?.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="mt-1 block drop-shadow-lg w-full px-3 py-3 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder={t?.emailPlaceholder}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-primaryText cursor-pointer rounded-lg font-bold border border-primaryText hover:bg-primaryText/80  px-5 py-2 hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? t?.sendingButton : t?.submitButton}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
