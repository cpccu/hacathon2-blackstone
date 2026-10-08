/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oxford: {
          50: '#f0f5fa',
          100: '#e1ebf5',
          200: '#c2d7eb',
          300: '#94bcdf',
          400: '#5e9bd0',
          500: '#387ec0',
          600: '#2764a3',
          700: '#205085',
          800: '#002e63',
          900: '#002147', // Oxford Navy Primary
          950: '#00142e',
        },
        gold: {
          50: '#fbf8ee',
          100: '#f6efd5',
          200: '#ecddab',
          300: '#dfc37a',
          400: '#d2aa4f',
          500: '#c5a059', // Oxford Academic Gold
          600: '#a6803b',
          700: '#85622e',
          800: '#6d4f29',
          900: '#5c4126',
        },
        parchment: '#fcfbf7',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(0, 33, 71, 0.08), 0 2px 6px -1px rgba(0, 33, 71, 0.04)',
        'academic-lg': '0 10px 30px -4px rgba(0, 33, 71, 0.12), 0 4px 12px -2px rgba(0, 33, 71, 0.06)',
      }
    },
  },
  plugins: [],
}
