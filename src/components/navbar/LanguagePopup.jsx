import { useState } from "react"; // Make sure to import useState
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const LanguagePopup = ({ isOpen, onClose }) => {
  const router = useRouter();

  const languages = [
    { name: "English", code: "en" },
    { name: "Français", code: "fr" },
    { name: "العربية", code: "ar" },
  ];

  const handleLanguageSelect = (language) => {
    router.push(`/${language.code}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#F3F4F5] rounded-lg  shadow-lg w-80">
        <div className="bg-[#E1E4E7] rounded-t-lg text-primaryText p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Select Language</h2>
          <button
            onClick={onClose}
            className="text-primaryText hover:text-secondaryText"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 p-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className="px-4 py-2 bg-[#424750] text-white rounded hover:bg-[#424750]/80 transition duration-200"
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;
