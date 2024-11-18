"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import api from "@/redux/api";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import langs from "@/app/[lang]/dictionaries/langs";

const Signup = () => {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];
  const t = langs[lang]?.signup;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    recievedOffer: false,
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginUser = useSelector((state) => state.auth.loginUser);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [signUp] = api.adminApis.useSignUpMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = t?.errorMsg;
    }
    if (!formData.email) {
      newErrors.email = t?.errorMsg;
    }
    // if (!formData.password) {
    //   newErrors.password = t?.errorMsg;
    // }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = t?.errorMsg;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        t?.passwordStrengthError ||
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      try {
        const response = await signUp(formData).unwrap();
        if (response.success) {
          setIsSuccess(true);
          toast.success(t?.SignupSuccess);
          setTimeout(() => {
            router.push(`/${lang}/login`);
          }, 1000);
        }
      } catch (err) {
        toast.error(err.data.message);
        setError(t?.SignupError);
        console.error("Signup failed:", err?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loginUser) {
      router.push(`/${lang}`);
    }
  }, [loginUser, router]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  py-5  px-8">
      <div className="bg-[#FCFBFF] shadow-xl rounded-xl max-w-2xl w-full border border-primaryGray">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-primaryText mb-8">
            {t?.title}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-semibold ${
                  errors.name ? "text-red-500" : "text-primaryText"
                }`}
              >
                {t?.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-3 border ${
                  errors.name ? "border-red-500" : "border-zinc-300"
                } rounded-md drop-shadow-lg placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                placeholder={t?.nameLabel}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-semibold ${
                  errors.email ? "text-red-500" : "text-primaryText"
                }`}
              >
                {t?.emaiLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-3 border ${
                  errors.email ? "border-red-500" : "border-zinc-300"
                } rounded-md drop-shadow-lg placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                placeholder={t?.emaiLabel}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-semibold ${
                  errors.password ? "text-red-500" : "text-primaryText"
                }`}
              >
                {t?.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-3 border ${
                    errors.password ? "border-red-500" : "border-zinc-300"
                  } rounded-md drop-shadow-lg placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  placeholder={t?.passwordLabel}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                >
                  {showPassword ? (
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="flex ">
                <input
                  type="checkbox"
                  name="recievedOffer"
                  checked={formData.recievedOffer}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 text-primary focus:ring-primary border-zinc-300 rounded"
                />
                <span className="ml-2 text-sm text-primaryText">
                  {t?.receive} <br /> {t?.latest}
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-zinc-300 rounded"
                />
                <span className="ml-2 text-sm text-primaryText">
                  {t?.acceptLabel}
                </span>
              </label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="text-primaryText cursor-pointer rounded-lg font-bold border border-primaryText hover:bg-primaryText hover:text-white px-5 py-2 hover:shadow-lg hover:shadow-primaryText/80"
                disabled={isLoading}
              >
                {isLoading ? t?.loading : t?.button}
              </button>
              {isSuccess && (
                <p className="text-green-500 text-sm mt-2">{t?.success}</p>
              )}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </form>
          <div className="text-center mt-3">
            {t?.text}?
            <Link
              href={`/${lang}/login`}
              className="ml-1 text-primaryText hover:underline font-semibold"
            >
              {t?.link}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;