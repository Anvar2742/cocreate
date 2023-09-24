/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blueGray: "#334E68",
                secRed: "#FF1783",
            },
            backgroundColor: {
                primary: "#6739FF",
                sec: "#F9F7FF",
                input: "#F0F4F8",
            },
            backgroundImage: {
                heroBg: "url('./img/hero.png')",
                test: "url(https://images.unsplash.com/photo-1544306094-e2dcf9479da3)",
            },
            boxShadow: {
                white: "0px 0px 5px 2px rgba(255,255,255,0.5)",
                modal: "0px 16px 24px -8px rgba(16, 24, 40, 0.03), 0px 48px 64px -16px rgba(16, 24, 40, 0.08)",
            },
        },
    },
    plugins: [],
};
