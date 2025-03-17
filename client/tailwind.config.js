/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens:{
        xxs: '364px',
        xlg: '812px',
        xlg: '1150px'
      },
      fontFamily: {
        sans: ['Merriweather Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

