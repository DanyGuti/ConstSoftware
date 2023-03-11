/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html, js, css}",
            "./views/*.ejs",
            "./views/partials/*.ejs",
            "./views/partials/*.html",
            "./views/partials/*.{html, ejs}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss')
  ],
}
