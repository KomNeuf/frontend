import langs from "@/app/[lang]/dictionaries/langs";
import { countryName } from "@/utils/countyName";
import React from "react";
const Shipping = ({ formData, onChange, lang }) => {
  const { fullName, address, city, country, phone } = formData?.shipping;
  const t = langs[lang]?.shipping;
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("shipping.")) {
      const shippingField = name.split(".")[1];
      let updatedValue = value;

      if (shippingField === "city") {
        const selectedCity = countryName.find((item) => item.city === value);
        updatedValue = {
          ...formData.shipping,
          city: value,
          country: selectedCity ? selectedCity.country : "",
        };
      } else {
        updatedValue = { ...formData.shipping, [shippingField]: value };
      }

      onChange({
        target: {
          name: "shipping",
          value: updatedValue,
        },
      });
    } else {
      onChange({ target: { name, value } });
    }
  };

  return (
    <div className="p-6 bg-[#FCFBFF] border  shadow-xl rounded-lg">
      <form>
        <h3 className="text-xl font-semibold mb-6">{t?.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="">
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.fullNameLabel}
            </label>
            <input
              type="text"
              name="shipping.fullName"
              value={fullName}
              onChange={handleChange}
              className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="">
            <label className="block text-gray-700 font-semibold mb-2">
              {langs[lang]?.accountSettings.phoneNumberLabel}
            </label>
            <input
              type="text"
              name="shipping.phone"
              value={phone}
              onChange={handleChange}
              className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
              placeholder="06XXXXXXXX"
              maxLength={10}
             
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.addressLabel}
          </label>
          <input
            type="text"
            name="shipping.address"
            value={address}
            onChange={handleChange}
            className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.postalCodeLabel || "City"}
          </label>
          <select
            name="shipping.city"
            value={city}
            onChange={handleChange}
            className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a city</option>
            {countryName.map((item, index) => (
              <option key={index} value={item.city}>
                {item.city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.countryLabel}
          </label>
          <input
            type="text"
            name="shipping.country"
            value={country}
            onChange={handleChange}
            className="p-2 block w-full  text-gray-600 border border-gray-300 rounded-md"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Shipping;
