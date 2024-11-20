import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import langs from "@/app/[lang]/dictionaries/langs";

export default function FilterBar({ onFilterChange, products, lang }) {
  const t = langs[lang]?.filterBar;
  const [activeFilters, setActiveFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const derivedFilterOptions = {
    Category: [...new Set(products?.map((product) => product?.category))],
    "Sub Category": [
      ...new Set(products?.map((product) => product?.subcategory)),
    ],
    Size: [...new Set(products?.map((product) => product.size))],
    Brand: [...new Set(products?.map((product) => product.brand))],
    Condition: [...new Set(products?.map((product) => product.condition))],
    // Color: [...new Set(products?.map((product) => product.color))],
    // Material: [...new Set(products?.map((product) => product.materials))],
    Price: ["Under DH100", "DH100 - DH200", "Over DH200"],
    Sort: ["Low to High : Price", "High to Low : Price"],
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleFilterSelect = (filterName, option) => {
    const newFilter = `${filterName}: ${option}`;
    const updatedFilters = activeFilters.filter(
      (filter) => !filter.startsWith(`${filterName}:`)
    );

    if (!updatedFilters.includes(newFilter)) {
      setActiveFilters([...updatedFilters, newFilter]);
      onFilterChange([...updatedFilters, newFilter]);
    }
    setOpenDropdown(null);
  };

  const removeFilter = (filter) => {
    const updatedFilters = activeFilters.filter((f) => f !== filter);
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  const isFilterActive = (filterName) => {
    return activeFilters.some((filter) => filter.startsWith(`${filterName}:`));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.keys(derivedFilterOptions).map((filterName, index) => (
          <div key={filterName} className="relative">
            <button
              className={`px-4 py-2 border rounded-md flex items-center justify-between min-w-[120px] ${
                isFilterActive(filterName)
                  ? "bg-primaryText/50 border-primaryText/50"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => toggleDropdown(index)}
            >
              <span>{t[filterName]}</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {openDropdown === index && (
              <div className="absolute z-40 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg min-w-[180px]">
                {derivedFilterOptions[filterName].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect(filterName, option)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left "
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {activeFilters?.map((filter) => (
          <button
            key={filter}
            onClick={() => removeFilter(filter)}
            className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-md"
          >
            {filter}
            <X className="w-4 h-4 ml-1" />
          </button>
        ))}
        {activeFilters?.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-blue-600 text-sm hover:underline ml-2"
          >
            {t?.clearFilters}
          </button>
        )}
      </div>
    </div>
  );
}
