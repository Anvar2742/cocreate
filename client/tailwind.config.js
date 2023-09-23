/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#0075B0",
                sec: "#F26870",
            },
            backgroundImage: {
                blueOrange:
                    "linear-gradient(to right, #f26870, #e9659e, #c871c7, #8d82e3, #1291eb)",
            },
            boxShadow: {
                white: "0px 0px 5px 2px rgba(255,255,255,0.5)",
            },
        },
    },
    plugins: [],
};
