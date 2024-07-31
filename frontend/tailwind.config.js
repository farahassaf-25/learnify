/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C2C7C',
        'primary-light': '#1E3A8A', 
        secondary: '#EC5C2E',
        'secondary-light': '#F59E0B', 
        bgColor: '#E1F4FF',
        textColor: '#252B42',
      },
      fontFamily: {
        lora: ['Lora', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(10px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0C2C7C",
          secondary: "#EC5C2E",
          bgColor: "#E1F4FF",
          textColor: "#252B42"
        }
      }
    ]
  }
}
