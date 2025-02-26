/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
// cuando se carga estilos que no esta en la carpeta app ya que se encuentra en otra carpeta 
//lo que tenemos que hacer es cargar la ubicacion de la otra carpeta
//esto en el caso en el que no se ve o no se carga los estilos
