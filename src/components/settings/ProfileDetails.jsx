import langs from "@/app/[lang]/dictionaries/langs";
import api from "@/redux/api";
import { login } from "@/redux/slices/user.slice";
import { countryName } from "@/utils/countyName";
import { Trash, Upload } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProfileDetails = ({
  formData,
  onChange,
  lang,
  loginUser,
  refetch,
  trasnlate,
}) => {
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const t = langs[lang]?.profileDetails;
  const dispatch = useDispatch();
  const [deleteAvatar, { isSuccess, data }] =
    api.adminApis.useDeleteAvatarMutation();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewPhoto(base64String);
        onChange({ target: { name: "avatar", value: base64String } });
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = React.createRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoDelete = async () => {
    const res = await deleteAvatar(loginUser?._id);
    if (res?.data?.success) {
      dispatch(login(res?.data?.user));
      refetch();
      setPreviewPhoto(null);
      toast.success(trasnlate?.updateSuccess);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const cityData = countryName.find((item) => item.city === selectedCity);
    const selectedCountry = cityData ? cityData.country : "";

    // Update the form data with both city and country
    onChange({
      target: { name: "city", value: selectedCity },
    });
    onChange({
      target: { name: "country", value: selectedCountry },
    });
  };
  return (
    <div className="p-6 bg-[#FCFBFF] border shadow-xl rounded-lg">
      <form>
        <h3 className="text-xl font-semibold mb-6">{t?.title}</h3>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.photoLabel}
          </label>
          <div className="flex items-center ">
            <img
              src={
                previewPhoto ||
                formData.avatar ||
                "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
              }
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border border-primaryText mr-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleClick}
                className="flex items-center text-sm justify-center bg-primaryText text-white p-2 rounded-md hover:bg-primaryText/80 transition duration-200"
              >
                <Upload className="mr-2" /> {t?.choosePhoto}
              </button>

              {formData?.avatar && (
                <button
                  type="button"
                  onClick={handlePhotoDelete}
                  className="flex items-center text-sm justify-center bg-red-500 text-white p-2 rounded-md  hover:bg-red-600 transition duration-200"
                >
                  <Trash className="mr-2" /> {t?.removePhoto || "Remove Photo"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.aboutYouLabel}
          </label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2  focus:border-primaryText"
            rows="4"
            placeholder={t?.aboutYouPlaceholder}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.cityLabel}
          </label>
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleCityChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white focus:border-primaryText"
            required
          >
            {countryName.map((item, index) => (
              <option key={index} value={item.city}>
                {item.city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.countryLabel}
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2  focus:border-primaryText"
            placeholder={t?.countryPlaceholder}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.languageLabel}
          </label>
          <select
            name="language"
            value={formData.language || ""}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white  focus:border-primaryText"
          >
            <option value="">{t?.languagePlaceholder}</option>
            <option value="english">{t?.english}</option>
            <option value="spanish">{t?.arabic}</option>
            <option value="french">{t?.french}</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
