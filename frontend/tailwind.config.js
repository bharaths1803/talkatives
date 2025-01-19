/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        link: "rgba(84, 33, 240, 1)",
      },
      backgroundColor: {
        "btn-primary": "var(--Schemes-Primary, rgba(101, 85, 143, 1))",
      },
      borderRadius: {
        custom: "25px",
      },
      boxShadow: {
        "custom-inset-light":
          "inset -43.6px 43.6px 43.6px 0px rgba(255, 255, 255, 0.1)",
        "custom-inset-dark":
          "inset 43.6px -43.6px 43.6px 0px rgba(165, 165, 165, 0.1)",

        "custom-btn-inset-light":
          "inset -16px 16px 16px 0px rgba(255, 255, 255, 0.1)",
        "custom-btn-inset-dark":
          "inset 16px -16px 16px 0px rgba(158, 165, 171, 0.1)",

        "custom-btn1": "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        "custom-btn2": "0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        custom: "87.2px",
        "custom-btn": "32px",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90.13deg, #7C72AC 0.12%, #D9EBFB 50.1%, #19072A 99.88%)",
      },
      borderColor: {
        "soft-white": "rgba(249, 249, 249, 0.51)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lightGrayTransparent: "rgba(217, 217, 217, 0.1)",
        "custom-gray": "rgba(208, 217, 225, 0.1)",
        "custom-purple": "rgba(199, 191, 218, 1)",
        "soft-purple": "rgba(161, 150, 185, 1)",
        "royal-purple": "rgba(144, 122, 192, 1)",
        "skeleton-purple": "rgba(113, 84, 150, 1)",
        "chat-purple": "rgba(142, 119, 169, 1)",
        "search-purple": "rgba(175, 164, 217, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
