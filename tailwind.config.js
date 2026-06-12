/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#1a3a2a',
        'aged-gold': '#c9a84c',
        'dark-gold': '#a8872e',
        'white': '#FFFFFF',
      },
      fontFamily: {
        'fraunces': ['Fraunces', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      scale: {
        '108': '1.08',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c9a84c40',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#c9a84c80',
          },
        },
      })
    },
  ],
}
