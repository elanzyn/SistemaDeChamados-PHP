/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
        colors: {
            navy: {
                900: '#0f172a',
                800: '#1e293b',
                700: '#334155',
            }
        },
    },
  },
  plugins: [],
}