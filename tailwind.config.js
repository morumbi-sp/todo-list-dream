/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        light: {
          100: '#fafafa',
          200: '#e5e5e5',
          accent: '#F37906',
          text: '#111827',
        },
        dark: {
          100: '#262842',
          200: '#1C1E3B',
          accent: '#F09034',
          text: '#f9fafb',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
