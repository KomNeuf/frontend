"use client";

import ErrorBlock from "@/components/dashoard/ErrorBlock";
import LoadingButton from "@/components/dashoard/LoadingButton";
import api from "@/redux/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [signIn, { isLoading, isSuccess, error, data }] =
    api.adminApis.useAdminLoginMutation();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("userToken", JSON.stringify(data.user));
      toast.success("Login Successfully");
      setTimeout(() => {
        router.push("/dashboard/overview");
      }, 1000);
    }
  }, [isSuccess, data, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(formData);
    if (response.success) {
      toast.success("Login successful!");
    }
  };

  return (
    <main className="">
      <div className="grid  grid-cols-1 max-md:grid-cols-1 min-h-screen">
        <div className="flex   relative flex-col items-stretch px-4 max-md:w-full">
          {router?.query?.message && (
            <div className="bg-red-200 p-3 text-center rounded-md max-w-md absolute w-full left-0 top-[10%] right-0 mx-auto">
              {router.query.message?.replace(/_/g, " ")}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="items-center max-w-md w-full mx-auto flex flex-col my-auto"
          >
            <div className="self-stretch  text-center text-3xl font-semibold leading-10 tracking-tighter mt-6 max-md:max-w-full     text-primaryText">
              Welcome back
            </div>
            <div className="self-stretch text-gray-500 text-center text-base leading-6 mt-3 max-md:max-w-full">
              {" "}
              Welcome back! Please enter your details.{" "}
            </div>

            <div className="my-6 w-full flex flex-col gap-y-5">
              <label htmlFor="email" className="w-full">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  EMAIL ADDRESS
                </p>
                <input
                  id="email"
                  name="email"
                  required
                  onChange={handleInput}
                  type="email"
                  className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-4 rounded-md items-start max-md:pr-5"
                />
              </label>

              <label htmlFor="password" className="w-full">
                <p className="text-neutral-700 mb-1 text-xs leading-4 tracking-widest uppercase">
                  Password
                </p>
                <span className="relative">
                  <input
                    id="password"
                    name="password"
                    required
                    onChange={handleInput}
                    type={isVisible.password ? "text" : "password"}
                    className="text-neutral-500 w-full text-lg leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center px-3 lg:px-4 py-4 pr-12 rounded-md items-start max-md:pr-5"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsVisible({
                        ...isVisible,
                        password: !isVisible.password,
                      })
                    }
                    className="absolute top-0 bottom-0 h-max my-auto right-4"
                  >
                    {isVisible.password ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </span>
              </label>
            </div>

            <ErrorBlock error={error} className="w-full mt-4" />
            <LoadingButton
              loading={isLoading}
              sucess={isSuccess}
              successText="Sucessful!"
              type="submit"
              className="text-white bg-primaryText text-center duration-300 text-base font-medium leading-6 justify-center items-center self-stretch hover:text-[#F5F1E4]  mt-9 px-16 py-4 rounded-lg max-md:max-w-full max-md:px-5"
            >
              Sign In
            </LoadingButton>
          </form>
        </div>
      </div>
    </main>
  );
}
