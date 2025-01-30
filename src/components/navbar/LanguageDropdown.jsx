import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { name: "English", code: "en" },
    { name: "French", code: "fr" },
    { name: "Arabic", code: "ar" },
  ];
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (window.location.hostname === "KomNeuf.com") {
      const newUrl = `https://KomNeuf.ma${window.location.pathname}`;
      window.location.replace(newUrl);
      return;
    }

    const pathLanguage = pathname.split("/")[1];
    const matchedLanguage = languages.find(
      (lang) => lang.code === pathLanguage
    );

    if (matchedLanguage) {
      setSelectedLanguage(matchedLanguage.code.toUpperCase());
    } else {
      setSelectedLanguage("EN");
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code.toUpperCase());
    setIsOpen(false);
    router.push(`/${language.code}${pathname.replace(/^\/[^/]+/, "")}`);
  };

  return (
    <div className="ml-3 relative z-50 " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center primaryText hover:text-secondaryText  px-3 py-2 text-sm font-semibold"
      >
        {selectedLanguage}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-20 bg-primaryGray  shadow-lg rounded-md z-10">
          <ul className="py-1">
            {languages.map((language) => (
              <li
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className="px-4 py-2 text-sm font-medium primaryText hover:bg-primaryBg cursor-pointer"
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
