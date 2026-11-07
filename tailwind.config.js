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
        gold: {
          400: '#F4C430',
          500: '#D4AF37',
          600: '#B8860B',
        },
        holographic: '#00D4FF',
      },
      backgroundImage: {
        'holographic-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #D4AF37 100%)',
      },
    },
  },
  plugins: [],
};