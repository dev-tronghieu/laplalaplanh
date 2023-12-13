/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FF90BC",
                secondary: "#FFC0D9",
                tertiary: "#AEDEFC",
                background: "#FFF6F6",
            },
        },
    },
    plugins: [],
};
