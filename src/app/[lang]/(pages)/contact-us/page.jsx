"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "@/redux/api";
import langs from "../../dictionaries/langs";

const ContactUsPage = ({ params }) => {
  const { lang } = params;
  const t = langs[lang]?.contactUs;
  const [createContactUs, { isLoading }] =
    api.adminApis.useCreateContactUsMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
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

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await createContactUs(formData);
        if (res.data.success) {
          toast.success("Message sent successfully");
          setFormData({
            name: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {t?.title}
        </h2>
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t?.form?.name}
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={t?.form?.namePlaceholder}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t?.form?.email}
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t?.form?.emailPlaceholder}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              {t?.form?.subject}
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t?.form?.subjectPlaceholder}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              {t?.form?.phone}
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t?.form?.phonePlaceholder}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              {t?.form?.message}
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t?.form?.messagePlaceholder}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="p-2  bg-primaryText text-white rounded cursor-pointer hover:bg-primaryText/80"
            >
              {isLoading ? t?.form?.submitting : t?.form?.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
