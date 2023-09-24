import { MouseEventHandler, useState } from "react";
import { CloseIcon } from "../assets/svgIcons";

const AuthModal = ({
    toggleAuthModal,
}: {
    toggleAuthModal: MouseEventHandler<HTMLButtonElement>;
}) => {
    const [isSignup, setIsSignup] = useState(true);

    const toggleForm = () => {
        setIsSignup((prev) => !prev);
    };

    return (
        <div
            className={`text-white fixed top-1/2 -translate-y-1/2 left-0 right-0 mx-auto max-w-xs bg-primary pt-8 pb-12 flex items-center flex-col bg-cover z-10 rounded-2xl transition-all ${
                isSignup ? " max-h-96  duration-500" : " max-h-64 duration-300"
            }`}
        >
            <div className="flex justify-center bg-white bg-opacity-30 backdrop-blur-sm text-white rounded-2xl">
                <button
                    onClick={toggleForm}
                    className={`font-semibold py-2 px-8 border-2 rounded-2xl transition-all ${
                        isSignup
                            ? "border-white bg-white bg-opacity-50 text-gray-900"
                            : "border-transparent"
                    }`}
                >
                    Sign up
                </button>
                <button
                    onClick={toggleForm}
                    className={`font-semibold py-2 px-8 border-2 rounded-2xl transition-all ${
                        !isSignup
                            ? "border-white bg-white bg-opacity-50 text-gray-900"
                            : "border-transparent"
                    }`}
                >
                    Log in
                </button>
            </div>
            <form className="mt-4 w-full px-10 flex flex-col gap-2">
                <div>
                    <label htmlFor="email" className="block font-semibold">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="bg-input text-blueGray py-1 px-3 rounded-lg mt-1 w-full"
                        placeholder="Your email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-input text-blueGray py-1 px-3 rounded-lg mt-1 w-full"
                        placeholder="Not 1234 please:)"
                    />
                </div>
                <div
                    className={`transition-all ${
                        !isSignup
                            ? "translate-y-8 opacity-0 pointer-events-none -z-10 select-none"
                            : ""
                    }`}
                >
                    <label htmlFor="password" className="block font-semibold">
                        Repeat password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-input text-blueGray py-1 px-3 rounded-lg mt-1 w-full"
                        placeholder="Repeat the same password"
                    />
                </div>
            </form>
            <button
                className="absolute -bottom-3 bg-secRed w-9 h-9 flex items-center justify-center rounded-full"
                onClick={toggleAuthModal}
            >
                <CloseIcon className="w-6 h-6 stroke-white" />
            </button>
        </div>
    );
};

export default AuthModal;
