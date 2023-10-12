/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blueGray: "#334E68",
                secRed: "#FF1783",
                primary: "#6739FF",
                sec: "#F9F7FF",
                input: "#F0F4F8",
                primText: "#3B393F",
            },
            backgroundImage: {
                heroBg: "url('./img/hero.png')",
                test: "url(https://images.unsplash.com/photo-1544306094-e2dcf9479da3)",
            },
            boxShadow: {
                white: "0px 0px 5px 2px rgba(255,255,255,0.5)",
                modal: "0px 16px 24px -8px rgba(16, 24, 40, 0.03), 0px 48px 64px -16px rgba(16, 24, 40, 0.08)",
            },
            animation: {
                "spin-2": "spin 1.5s linear infinite",
                "pulse-2": "pulse 1.5s linear infinite",
                "pulse-3": "pulse 2s linear infinite",
                draw: "draw 1.7s ease-in-out 1",
            },
            fontFamily: {
                sans: ["Gabarito", "sans-serif"],
            },
            strokeWidth: {
                3: "3px",
                5: "5px",
            },
            transitionDuration: {
                1200: "1200ms",
            },
            keyframes: {
                draw: {
                    "0%": { "stroke-dasharray": "0 1500" },
                    "100%": { "stroke-dasharray": "1500 1500" },
                },
            },
            width: {
                100: "400px",
                110: "440px",
            },
            screens: {
                xs: "567px",
            },
            padding: {
                22: "5.75em",
            },
        },
    },
    plugins: [],
};
