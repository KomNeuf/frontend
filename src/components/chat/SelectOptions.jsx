import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SelectOptions = ({
  onArchive,
  onMarkAsImportant,
  onDelete,
  user,
  currentUser,
  isArchived,
  translate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleOptionClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className=" relative z-40" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center primaryText hover:text-secondaryText px-3 py-2 text-sm font-semibold"
      >
        <EllipsisVertical className="h-6 w-6 text-white" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-auto text-nowrap bg-primaryGray shadow-lg rounded-md z-10">
          <ul className="py-1">
            <li
              onClick={() => handleOptionClick(onArchive)}
              className="px-4 py-2 text-sm font-medium primaryText hover:bg-primaryBg cursor-pointer"
            >
              {isArchived ? translate?.unarchive : translate?.archive}
            </li>
            <li
              onClick={() => handleOptionClick(onMarkAsImportant)}
              className="px-4 py-2 text-sm font-medium primaryText hover:bg-primaryBg cursor-pointer"
            >
              {currentUser?.importantChats.includes(user._id)
                ? translate?.unmarkAsImportant
                : translate?.markAsImportant}
            </li>
            <li
              onClick={() => handleOptionClick(onDelete)}
              className="px-4 py-2 text-sm font-medium primaryText hover:bg-primaryBg cursor-pointer"
            >
              {translate?.deleteChat}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectOptions;
