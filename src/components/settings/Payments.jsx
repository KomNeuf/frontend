import langs from "@/app/[lang]/dictionaries/langs";
import React from "react";

const Payments = ({ formData, onChange, lang }) => {
  const { payoutOptions } = formData;
  const t = langs[lang]?.payments;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("payoutOptions.")) {
      const payoutField = name.split(".")[1];
      onChange({
        target: {
          name: "payoutOptions",
          value: { ...payoutOptions, [payoutField]: value },
        },
      });
    } else if (name.startsWith("billingAddress.")) {
      const billingField = name.split(".")[1];
      onChange({
        target: {
          name: "payoutOptions",
          value: {
            ...payoutOptions,
            billingAddress: {
              ...payoutOptions.billingAddress,
              [billingField]: value,
            },
          },
        },
      });
    }
  };

  return (
    <div className="p-6 bg-[#FCFBFF] border  shadow-xl rounded-lg">
      <form>
        <h3 className="text-xl font-semibold mb-6">{t?.payoutTitle}:</h3>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.accountHolderNameLabel}
          </label>
          <input
            type="text"
            name="payoutOptions.accountHolderName"
            value={payoutOptions.accountHolderName}
            onChange={handleChange}
            className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.accountNumberLabel}
          </label>
          <input
            type="text"
            name="payoutOptions.accountNumber"
            value={payoutOptions.accountNumber}
            onChange={handleChange}
            className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="">
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.bankNameLabel}
            </label>
            <input
              type="text"
              name="payoutOptions.bankName"
              value={payoutOptions.bankName}
              onChange={handleChange}
              className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="">
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.accountTypeLabel}
            </label>
            <select
              name="payoutOptions.accountType"
              value={payoutOptions.accountType}
              onChange={handleChange}
              className="px-2 py-2.5 block w-full text-gray-600 border border-gray-300 rounded-md"
              required
            >
              <option value="">{t?.selectAccountType}</option>
              <option value="checking">{t?.checking}</option>
              <option value="savings">{t?.savings}</option>
              <option value="business">{t?.business}</option>
            </select>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">{t?.billingAddressTitle}</h3>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.fullNameLabel}
          </label>
          <input
            type="text"
            name="billingAddress.fullName"
            value={payoutOptions.billingAddress.fullName}
            onChange={handleChange}
            className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t?.addressLabel}
          </label>
          <input
            type="text"
            name="billingAddress.address"
            value={payoutOptions.billingAddress.address}
            onChange={handleChange}
            className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="">
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.postalCodeLabel}
            </label>
            <input
              type="text"
              name="billingAddress.postalCode"
              value={payoutOptions.billingAddress.postalCode}
              onChange={handleChange}
              className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="">
            <label className="block text-gray-700 font-semibold mb-2">
              {t?.countryLabel}
            </label>
            <input
              type="text"
              name="billingAddress.country"
              value={payoutOptions.billingAddress.country}
              onChange={handleChange}
              className="p-2 block w-full text-gray-600 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payments;
