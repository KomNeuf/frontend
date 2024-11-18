/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: "#2e3944",
        primaryGray: "#E1E4E7",
        primaryBg: "#f3f4f5",
        primaryText: "#424750",
        secondaryText: "#6B7280",
      },
      backgroundColor: {
        palette: {
          fill: withOpacity("--color-bg"),
          card: withOpacity("--color-bg-side"),
        },
      },
      animation: {
        "pulse-orange": "pulse-orange 2s infinite",
      },
      keyframes: {
        "pulse-orange": {
          "0%, 100%": {
            transform: "scale(1)",
            backgroundColor: "#2e3944",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.1)",
            backgroundColor: "#2e3944",
            opacity: "0.8",
          },
        },
      },
      backgroundImage: {
        offersBG: "url('/carouselBox-bg/offersbg.webp')",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
