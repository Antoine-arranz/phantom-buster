module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Qanelas"],
      },
      boxShadow: {
        "3xl": "0 13px 30px 0px rgb(0 0 0 / 0.25);",
      },
      colors: {
        "bcg-primary": "rgb(245, 241, 239)",
        "bcg-white": "rgb(255 255 255)",
        "primary-text": "black",
        "secondary-text": "rgb(115 112 110)",
        "bcg-filter": "rgb(82 115 232)",
        "bcg-filter-hover": "rgb(59 86 186)",
        white: "rgb(255 255 255)",
      },
    },
  },
};
