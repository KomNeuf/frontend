import langs from "@/app/[lang]/dictionaries/langs";
import api from "@/redux/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AccountSettings = ({ formData, onChange, loginUser, lang }) => {
  const t = langs[lang]?.accountSettings;
  const [changePassword] = api.adminApis.useChangePasswordMutation();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t?.passwordMismatchError);
      return;
    }

    try {
      const res = await changePassword({
        userId: loginUser?._id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (res?.data?.success) {
        toast.success(t?.passwordChangeSuccess);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(res?.data?.message || t?.passwordChangeFailure);
      }
    } catch (error) {
      console.error("Error changing password", error);
      toast.error(t?.passwordChangeError);
    }
  };

  return (
    <div className="p-6 bg-[#FCFBFF] border  shadow-xl rounded-lg">
      <form>
        <h3 className="text-xl font-semibold mb-6">{t?.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.nameLabel}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.phoneNumberLabel}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.genderLabel}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                {t?.genderPlaceholder}
              </option>
              <option value="male">{t?.male}</option>
              <option value="female">{t?.female}</option>
              <option value="other">{t?.other}</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.dobLabel}
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={onChange}
              className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.changePasswordLabel}
          </label>
          <input
            type="password"
            name="currentPassword"
            placeholder={t?.currentPasswordPlaceholder}
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="newPassword"
            placeholder={t?.newPasswordPlaceholder}
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md mt-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder={t?.confirmPasswordPlaceholder}
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md mt-2"
          />
          <button
            type="button"
            onClick={handlePasswordSubmit}
            className="mt-4 bg-primaryText text-white p-2 rounded-md hover:bg-primaryText/80 transition duration-200"
          >
            {t?.changePasswordButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
