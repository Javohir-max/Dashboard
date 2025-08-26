/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js,vue}",
    "./src/views/*.{html,js,vue}",
    "./src/components/*.{html,js,vue}",
    "./src/Site/*.{html,js,vue}",
    "./src/MyComponents/*.{html,js,vue}"
  ],
  theme: {
    extend: {},
    screens: {
      'phone': {'max': '415px'},
    },
  },
  plugins: [],
}