import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
            // Add your custom font, with fallbacks
            augustina: ['augustina'],
          },
      animation: {
        'typing': 'typing 1s ease-in-out ;'
      },
      keyframes: {
      'typing': {
        '0%': { width: '100%'},
        '50%': { width: '0%',},
        '100%': { width: '100%'},
      }},
      colors: {
        'jet':'#2F2F2F',
        'platinum':'#E5E5E5',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config

