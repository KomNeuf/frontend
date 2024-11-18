"use client";

import api from "@/redux/api";
import { useState } from "react";
import { toast } from "react-toastify";
import langs from "../../dictionaries/langs";

const AdvertisePage = ({ params }) => {
  const { lang } = params;
  const t = langs[lang]?.advertisePage;

  const [createAdvertise, { isLoading }] =
    api.adminApis.useCreateAdvertiseMutation();
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = t?.validation?.firstName;
    if (!formData.lastName) newErrors.lastName = t?.validation?.lastName;
    if (!formData.email) newErrors.email = t?.validation?.email;
    if (!formData.phone) newErrors.phone = t?.validation?.phone;
    if (!formData.company) newErrors.company = t?.validation?.company;
    if (!formData.companyType)
      newErrors.companyType = t?.validation?.companyType;
    if (!formData.country) newErrors.country = t?.validation?.country;
    if (!formData.budget) newErrors.budget = t?.validation?.budget;
    if (!formData.campaign) newErrors.campaign = t?.validation?.campaign;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await createAdvertise(formData);
        if (res.data.success) {
          toast.success(t?.successMessage);
          setFormData({
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
        }
      } catch (error) {
        console.error(t?.errorMessage, error.response?.data || error.message);
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };
  return (
    <div>
      <div className="py-24 relative grid grid-cols-1 md:grid-cols-2 bg-darkGray text-white p-10 md:px-20 lg:px-32">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">
            {t?.title}
          </h1>
          <p className="text-lg md:text-xl mb-4 text-center sm:text-left">
            {t?.intro}
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/Advertising.png"
            alt="KomNeuf"
            className="w-72 h-auto rounded-md"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <svg
            id="wave"
            viewBox="0 0 1440 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#F3F4F5"
              d="M0,40L21.8,38.3C43.6,37,87,33,131,40C174.5,47,218,63,262,65C305.5,67,349,53,393,41.7C436.4,30,480,20,524,15C567.3,10,611,10,655,13.3C698.2,17,742,23,785,33.3C829.1,43,873,57,916,55C960,53,1004,37,1047,31.7C1090.9,27,1135,33,1178,41.7C1221.8,50,1265,60,1309,55C1352.7,50,1396,30,1440,28.3C1483.6,27,1527,43,1571,48.3C1614.5,53,1658,47,1702,36.7C1745.5,27,1789,13,1833,21.7C1876.4,30,1920,60,1964,61.7C2007.3,63,2051,37,2095,25C2138.2,13,2182,17,2225,21.7C2269.1,27,2313,33,2356,45C2400,57,2444,73,2487,78.3C2530.9,83,2575,77,2618,61.7C2661.8,47,2705,23,2749,26.7C2792.7,30,2836,60,2880,61.7C2923.6,63,2967,37,3011,25C3054.5,13,3098,17,3120,18.3L3141.8,20L3141.8,100L3120,100C3098.2,100,3055,100,3011,100C2967.3,100,2924,100,2880,100C2836.4,100,2793,100,2749,100C2705.5,100,2662,100,2618,100C2574.5,100,2531,100,2487,100C2443.6,100,2400,100,2356,100C2312.7,100,2269,100,2225,100C2181.8,100,2138,100,2095,100C2050.9,100,2007,100,1964,100C1920,100,1876,100,1833,100C1789.1,100,1745,100,1702,100C1658.2,100,1615,100,1571,100C1527.3,100,1484,100,1440,100C1396.4,100,1353,100,1309,100C1265.5,100,1222,100,1178,100C1134.5,100,1091,100,1047,100C1003.6,100,960,100,916,100C872.7,100,829,100,785,100C741.8,100,698,100,655,100C610.9,100,567,100,524,100C480,100,436,100,393,100C349.1,100,305,100,262,100C218.2,100,175,100,131,100C87.3,100,44,100,22,100L0,100Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className=" max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t?.formTitle}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.firstName}
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.lastName}
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.phone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.company}
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">{errors.company}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="companyType"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.companyType}
                </label>
                <select
                  id="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="">{t?.selectCompanyType}</option>
                  <option value="agency">{t?.agency}</option>
                  <option value="brand">{t?.brand}</option>
                  <option value="other">{t?.other}</option>
                </select>
                {errors.companyType && (
                  <p className="text-red-500 text-sm">{errors.companyType}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.country}
                </label>
                <input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.budget}
                </label>
                <input
                  id="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter your estimated budget"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm">{errors.budget}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="campaign"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.campaign}
                </label>
                <select
                  id="campaign"
                  value={formData.campaign}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="">{t?.selectCampaignObjective}</option>
                  <option value="awareness">{t?.awareness}</option>
                  <option value="consideration">{t?.consideration}</option>
                  <option value="conversion">{t?.conversion}</option>
                </select>
                {errors.campaign && (
                  <p className="text-red-500 text-sm">{errors.campaign}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t?.message}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap">
                <p className="text-sm text-gray-500">{t?.privacyPolicy}</p>
                <button
                  type="submit"
                  className="p-2 bg-primaryText text-white rounded cursor-pointer hover:bg-primaryText/80"
                >
                  {isLoading ? t?.submitting : t?.submit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertisePage;
