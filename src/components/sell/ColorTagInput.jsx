import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";

const ColorTagInput = ({ colors, onChange }) => {
  const [color, setColor] = useState("#fff");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    if (colors && colors?.length > 0) {
      setColor(colors[colors?.length - 1]);
    }
  }, [colors]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const addColorTag = () => {
    if (color && !colors?.includes(color)) {
      const updatedColors = [...colors, color];
      onChange(updatedColors);
      setColor("#fff");
    }
  };

  const removeColorTag = (colorToRemove) => {
    const updatedColors = colors?.filter((col) => col !== colorToRemove);
    onChange(updatedColors);
  };

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const clearColorTags = () => {
    onChange([]);
  };

  return (
    <div className="relative">
      <div
        onClick={togglePicker}
        className="w-full p-1.5 border rounded cursor-pointer transition duration-300 ease-in-out bg-white"
      >
        {colors?.length > 0 ? (
          colors?.map((col, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                backgroundColor: col,
                color: "#fff",
                padding: "2px 4px",
                margin: "2px",
                fontSize: "14px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => removeColorTag(col)}
            >
              {col} &#10005;
            </span>
          ))
        ) : (
          <div className="text-gray-500 py-3.5"></div>
        )}
      </div>
      {isPickerVisible && (
        <div className="absolute z-10" style={{ marginTop: "5px" }}>
          <ChromePicker color={color} onChangeComplete={handleColorChange} />
          <div className="mt-2 flex gap-5">
            <button
              type="button"
              onClick={addColorTag}
              className="w-1/2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText/80 focus:outline-none focus:ring-primaryText"
            >
              Add Color
            </button>
            <button
              type="button"
              onClick={clearColorTags}
              className="w-1/2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryText hover:bg-primaryText/80 focus:outline-none focus:ring-primaryText"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorTagInput;
