import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { axiosInstance } from "../api/axios";
import useAuth from "./../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { IconLoader } from "@tabler/icons-react";

const Auth = () => {
    const location = useLocation();
    const { auth } = useAuth();
    interface formData {
        [key: string]: string;
    }
    const initialFormData = {
        email: "",
        password: "",
        passwordRep: "",
    };
    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const [isSignup, setIsSignup] = useState<boolean>(true);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState<formData>(initialFormData);
    const [formErrors, setFormErrors] = useState<formData>(initialFormData);
    const [generalErr, setGeneralErr] = useState<string>("");

    const toggleForm = (isSignupClick: boolean) => {
        setIsSignup(isSignupClick);
        setFormErrors(initialFormData);
        setGeneralErr("");
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

            // console.log(resp);
            if (resp.status === 200 || resp.status === 201) {
                const accessToken = resp.data?.accessToken;
                console.log(accessToken);

                setAuth({ accessToken });

                if (resp.status === 201) {
                    navigate("/onboarding");
                } else {
                    navigate(location?.state?.from);
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
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target?.name]: e.target?.value,
            };
        });
    };

    useEffect(() => {
        console.log(auth);

        if (auth?.accessToken) {
            navigate(location?.state?.from);
        }
    }, [location?.pathname]);

    return (
        <div className="text-blueGray mx-auto max-w-xs bg-white sm:pt-8 sm:pb-14 flex items-center justify-center flex-col bg-cover z-10 rounded-2xl transition-all duration-500 h-screen pt-32 pb-20 overflow-auto">
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
                    />
                    {formErrors?.email ? (
                        <p className="text-red-400 mt-2">{formErrors?.email}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="">
                    <label htmlFor="password" className="block font-semibold">
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
            <Link to="/" className="mt-10">
                Home
            </Link>
        </div>
    );
};

export default Auth;
