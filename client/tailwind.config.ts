/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                border: '#ced4da',
                grey: '#495057',
            },
            fontFamily: { poppins: ['Poppins', 'sans-serif'] },
        },
    },
    plugins: [],
}
