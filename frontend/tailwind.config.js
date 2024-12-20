/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#009EE2",
        "primary-color-light": "#E7F2F5",
        "secondary-color": "#F2F2F2",
        "text-color": "#333333",
        "error-color": "#EA4335",
        "success-color": "#34A853",
        "warning-color": "#FBBC04",
        "secondary-white": "#F2F2F2"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        dancingScript: ["Dancing Script", "cursive"]
      }
    }
  },
  plugins: []
};
