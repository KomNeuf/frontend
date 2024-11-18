import { useEffect, useRef, useState } from "react";

export default function ConditionDropdown({
  trans,
  formData,
  handleInputChange,
  errors,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const statusOptions = [
    {
      value: "",
      label: trans?.conditionPlaceholder,
    },
    {
      value: "New With Tags",
      label: trans?.newWithTags,
      description: trans?.newWithTagsTitle,
    },
    {
      value: "New Without Tags",
      label: trans?.newWithoutTags,
      description: trans?.newWithoutTagsTitle,
    },
    {
      value: "Very Good",
      label: trans?.veryGood,
      description: trans?.veryGoodTitle,
    },
    { value: "Good", label: trans?.good, description: trans?.goodTitle },
    {
      value: "Satisfactory",
      label: trans?.satisfactory,
      description: trans?.satisfactoryTitle,
    },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (value) => {
    handleInputChange(value);
    setIsOpen(false);
  };
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
  return (
    <div className="relative w-full " ref={dropdownRef}>
      <label
        htmlFor="condition"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {trans?.conditionLabel}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full border border-[#e5e7eb] rounded-sm  px-3 py-2 bg-white text-left focus:outline-none focus:ring-2 focus:ring-black"
        >
          {formData.condition
            ? statusOptions.find(
                (option) => option.value === formData.condition
              )?.label
            : trans?.conditionPlaceholder}
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {statusOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => selectOption(option.value)}
                className="cursor-pointer hover:bg-[#1967D2] hover:text-white p-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs hover:text-primaryBg">
                    {option.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {errors.condition && (
        <p className="text-red-500 text-xs mt-1">{errors.condition}</p>
      )}
    </div>
  );
}
