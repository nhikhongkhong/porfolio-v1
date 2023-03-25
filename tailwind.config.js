/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '.src//views/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#0a192f',
        secondaryBg: '#112240',
        lightestNavy: '#233554',
        primary: '#64ffda',
        white: '#e6f1ff',
        secondaryText: '#a2accb',
        slate: '#8892b0',
        lightSlate: '#a8b2d1',
        lightestSlate: '#adb8d6',
      },
    },
  },
  plugins: [],
};
