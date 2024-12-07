/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#39509D",
        "secondary": "#80BA48",
        "complementary-1": "#3F3F3F",
        "complementary-2": "#F2F4F1",
        "complementary-3": "#007F8C",
        "hv-primary": "#2B3C76",
        "hv-complementary-1": "#2F2F2F",
        "hv-complementary-3": "#005F69"
      }
    },
  },
  plugins: [],
}

