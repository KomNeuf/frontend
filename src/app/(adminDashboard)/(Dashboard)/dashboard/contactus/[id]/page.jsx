"use client";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactDetail = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const id = pathname.split("/")[3];

  const {
    data: contact,
    isLoading,
    error,
  } = api.adminApis.useGetSingleContactQuery(id, {
    skip: !id,
  });

  const [editContact] = api.adminApis.useEditContactMutation();
  const contactData = contact?.data;

  const [updatedContact, setUpdatedContact] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (contactData) {
      setUpdatedContact({
        name: contactData.name || "",
        email: contactData.email || "",
        subject: contactData.subject || "",
        phone: contactData.phone || "",
        message: contactData.message || "",
      });
    }
  }, [contactData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editContact({ id, ...updatedContact }).unwrap();
      if (res?.success) {
        toast.success("Contact updated successfully");
        router.push(`/dashboard/contactus`);
      }
    } catch (error) {
      toast.error("Error updating contact: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) return <p>Error loading contact details.</p>;

  return (
    <div className="p-8 my-8 overflow-x-scroll">
      {action === "update" ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800">
            Update Contact Details
          </h1>
          <form onSubmit={handleSubmit}>
            {Object.entries(updatedContact).map(([key, value]) => (
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
            Contact Details
          </h1>
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {contactData?.name || "Contact Info"}
              </h1>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Name:</span>{" "}
                {contactData?.name}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {contactData?.email}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Subject:</span>{" "}
                {contactData?.subject}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {contactData?.phone}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Message:</span>{" "}
                {contactData?.message}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactDetail;
