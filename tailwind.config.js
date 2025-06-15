/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'eggplant': '#614051',
          'beige': '#F5E6D3',
          'beige-pink': '#F5E1D8',
          'warm-beige': '#E8D5C4',
        },
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }