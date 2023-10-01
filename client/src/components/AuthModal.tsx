import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { axiosInstance } from "../api/axios";
import useAuth from "./../hooks/useAuth";
import { IconLoader, IconX } from "@tabler/icons-react";
import axios, { AxiosError } from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AuthModal = ({
    toggleAuthModal,
    isAuthModal,
    isAuthPage,
}: {
    toggleAuthModal: CallableFunction | null;
    isAuthModal: boolean | null;
    isAuthPage: boolean;
}) => {
    interface formData {
        [key: string]: string;
    }
    const initialFormData = {
        email: "",
        password: "",
        passwordRep: "",
    };

    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();

    const [isSignup, setIsSignup] = useState<boolean>(true);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState<formData>(initialFormData);
    const [formErrors, setFormErrors] = useState<formData>(initialFormData);
    const [generalErr, setGeneralErr] = useState<string>("");

    const toggleForm = (isSignupClick: boolean) => {
        setIsSignup(isSignupClick);
        setFormErrors(initialFormData);
    };

    const handleErrors = (formData: formData) => {
        const authErrors = { email: "", password: "", passwordRep: "" };

        if (!formData.email) {
            authErrors.email = "Please enter an email";
            setFormErrors(authErrors);
            return false;
        }

        if (!formData.password) {
            authErrors.password = "Please enter a password";
            setFormErrors(authErrors);
            return false;
        }

        if (!formData.passwordRep && isSignup) {
            authErrors.passwordRep = "Repeat your password please";
            setFormErrors(authErrors);
            return false;
        }

        if (!(formData.password === formData.passwordRep) && isSignup) {
            authErrors.passwordRep = "Passwords don't match";
            setFormErrors(authErrors);
            return false;
        }

        return true;
    };

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(initialFormData);
        setGeneralErr("");
        try {
            setIsSubmit(true);
            if (!handleErrors(formData)) {
                return;
            }
            const resp = await axiosInstance.post(
                isSignup ? "/signup" : "/login",
                formData,
                {
                    withCredentials: true,
                }
            );

            console.log(resp);
            if (resp.status === 200 || resp.status === 201) {
                const accessToken = resp.data?.accessToken;
                setAuth({
                    accessToken,
                    isOnboard: resp.data.isOnboard,
                    userType: resp.data.userType,
                });
                if (isAuthPage) {
                    if (resp.status === 201) {
                        navigate("/onboarding");
                    } else {
                        navigate(location?.state?.from);
                    }
                }
                if (toggleAuthModal) {
                    toggleAuthModal();
                }
            }
        } catch (err: Error | AxiosError | any) {
            if (axios.isAxiosError(err)) {
                // Access to config, request, and response
                console.log(err);
                if (err.code === "ERR_NETWORK") {
                    setGeneralErr("Server error");
                } else {
                    setFormErrors(err.response?.data);
                }
            } else {
                setGeneralErr("Server error");
                console.log(err);
            }
        } finally {
            setIsSubmit(false);
        }
    };

    const handleFormData = async (e: ChangeEvent<HTMLInputElement>) => {
        setFormErrors(initialFormData);
        setGeneralErr("");
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target?.name]: e.target?.value,
            };
        });
    };

    useEffect(() => {
        setFormData(initialFormData);
        setFormErrors(initialFormData);
    }, [isAuthModal]);

    return (
        <div
            className={
                isAuthPage
                    ? "w-screen h-screen bg-sec flex items-center justify-center"
                    : ""
            }
        >
            <div
                className={`w-screen h-screen backdrop-blur-sm bg-black top-0 bg-opacity-20 fixed left-0 transition-all duration-300 z-40 ${
                    isAuthModal ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`text-blueGray left-0 right-0 mx-auto max-w-xs bg-white pt-8 flex items-center flex-col bg-cover z-50 rounded-2xl transition-all duration-500 ${
                    isAuthPage
                        ? "static translate-y-0 shadow-lg pb-6"
                        : "fixed translate-y-1/2 pb-14"
                } ${
                    isAuthModal && !isAuthPage ? "bottom-1/2" : "-bottom-full"
                }`}
            >
                <div className="flex justify-center bg-primary bg-opacity-60 backdrop-blur-sm text-white rounded-2xl mb-4">
                    <button
                        onClick={() => toggleForm(true)}
                        className={`font-semibold py-2 px-8 border-2 rounded-2xl transition-all ${
                            isSignup
                                ? " bg-primary bg-opacity-100 border-primary"
                                : "border-transparent"
                        }`}
                    >
                        Sign up
                    </button>
                    <button
                        onClick={() => toggleForm(false)}
                        className={`font-semibold py-2 px-8 border-2 rounded-2xl transition-all ${
                            !isSignup
                                ? " bg-primary bg-opacity-100 border-primary"
                                : "border-transparent"
                        }`}
                    >
                        Log in
                    </button>
                </div>
                <form
                    className={`mt-4 w-full px-10 flex flex-col relative ${
                        isSubmit ? "opacity-70 pointer-events-none" : ""
                    }`}
                    onSubmit={(e) => submitForm(e)}
                >
                    <div
                        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${
                            isSubmit ? "block" : "hidden"
                        }`}
                    >
                        <IconLoader
                            size="40"
                            className={`${isSubmit ? "animate-spin" : ""}`}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md"
                            placeholder="Your email"
                            name="email"
                            onChange={handleFormData}
                            value={formData.email}
                            autoComplete="username"
                        />
                        {formErrors?.email ? (
                            <p className="text-red-400 mt-2">
                                {formErrors?.email}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="">
                        <label
                            htmlFor="password"
                            className="block font-semibold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md"
                            placeholder="Password"
                            name="password"
                            onChange={handleFormData}
                            value={formData.password}
                            autoComplete={
                                isAuthPage ? "current-password" : "new-password"
                            }
                        />
                        {formErrors?.password ? (
                            <p className="text-red-400 mt-2">
                                {formErrors?.password}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <Link
                        to="/password"
                        className={`transition-all ${
                            isSignup
                                ? " opacity-0 pointer-events-none -z-10 select-none max-h-0"
                                : " max-h-60 mt-2"
                        }`}
                        tabIndex={isSignup ? -1 : 0}
                    >
                        Forgot password?
                    </Link>
                    <div
                        className={`transition-all ${
                            !isSignup
                                ? " opacity-0 pointer-events-none -z-10 select-none max-h-0"
                                : " max-h-60 mt-2"
                        }`}
                    >
                        <label
                            htmlFor="passwordRep"
                            className="block font-semibold"
                        >
                            Repeat password
                        </label>
                        <input
                            type="password"
                            id="passwordRep"
                            className="bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md"
                            placeholder="Repeate password"
                            name="passwordRep"
                            onChange={handleFormData}
                            value={formData.passwordRep}
                            tabIndex={!isSignup ? -1 : 0}
                        />
                        {formErrors?.passwordRep ? (
                            <p className="text-red-400 mt-2">
                                {formErrors?.passwordRep}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    {generalErr ? (
                        <p className="text-red-400 mt-2">
                            Server is not responding
                        </p>
                    ) : (
                        ""
                    )}
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-8 rounded-xl text-lg font-semibold mt-6"
                    >
                        Submit
                    </button>
                </form>
                {isAuthPage ? (
                    <Link to="/" className="mt-8">
                        Home
                    </Link>
                ) : (
                    <button
                        className="absolute -bottom-3 bg-secRed w-9 h-9 flex items-center justify-center rounded-full"
                        onClick={() =>
                            toggleAuthModal ? toggleAuthModal() : ""
                        }
                    >
                        <IconX color="white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
