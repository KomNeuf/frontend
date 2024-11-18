import langs from "@/app/[lang]/dictionaries/langs";
import { X } from "lucide-react";
import React from "react";

const OfferModal = ({ isVisible, onClose, lang }) => {
  if (!isVisible) return null;
  const t = langs[lang]?.offerModal;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4  z-40">
      <div
        style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
        className="bg-primaryBg rounded-lg shadow-xl max-w-lg w-full relative overflow-hidden"
      >
        <div className="bg-[#E1E4E7] text-primaryText p-4 text-center">
          <h2 className="text-2xl font-bold"> {t?.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primaryText hover:text-secondaryText"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">{t?.close}</span>
        </button>
        <div className="p-6">
          <p className="text-lg mb-4">
            {t?.freeShipping}
            <span className="font-bold text-primaryText"> {t?.boldText} </span>
            {t?.conditions}
          </p>
          <p className="mb-6">{t?.exclusiveDeal}</p>
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-primaryText hover:bg-primaryText/80 text-white px-6 py-2 rounded-lg font-semibold  transition-colors"
            >
              {t?.shopNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
