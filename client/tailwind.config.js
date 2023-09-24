/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#6739FF",
                sec: "#F9F7FF",
            },
            backgroundImage: {
                heroBg: "url('./img/hero.png')"
            },
            boxShadow: {
                white: "0px 0px 5px 2px rgba(255,255,255,0.5)",
            },
        },
    },
    plugins: [],
};
