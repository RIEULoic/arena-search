/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      //tailwind va générer des classes qui s'appellent "font-title" et "font-category" qui vont utiliser les fonts définies dans le fichier layout.js
      fontFamily: {
        title: ["var(--font-title-local)", "sans-serif"],
        category: ["var(--font-category-local)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
