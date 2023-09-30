import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { IconLoader } from "@tabler/icons-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const Onboard = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    interface formData {
        [key: string]: string;
    }
    const initialFormData = {
        userType: "tutor",
    };
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState<formData>(initialFormData);
    const [formErrors, setFormErrors] = useState<formData>(initialFormData);
    const [generalErr, setGeneralErr] = useState<string>("");

    const handleErrors = (formData: formData) => {
        const onboardErrors = { userType: "" };

        if (!formData.userType) {
            onboardErrors.userType = "Please select";
            setFormErrors(onboardErrors);
            return false;
        }

        return true;
    };

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(initialFormData);
        setGeneralErr("");

        // If user waited long enough for accessToken to expire
        await refresh();
        try {
            setIsSubmit(true);
            if (!handleErrors(formData)) {
                return;
            }
            const resp = await axiosPrivate.post("/onboarding", formData);

            console.log(resp);
            if (resp.status === 204) {
                // Update isOnboard status for user
                await refresh();
                if (location?.state?.from) {
                    navigate(location?.state?.from);
                } else {
                    navigate("/");
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

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    useEffect(() => {
        // get user and check isOnboard
        // console.log(auth);

        if (auth?.isOnboard) {
            navigate(-1);
        }
    }, [location?.pathname]);

    return (
        <section className="py-24">
            <div className="max-w-5xl px-4 m-auto">
                <h1>Onboarding</h1>
                <form onSubmit={submitForm}>
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
                        <p>You are a...</p>
                        <div className="flex">
                            <label
                                htmlFor="tutor"
                                className="block font-semibold"
                            >
                                Tutor
                            </label>
                            <input
                                type="radio"
                                id="tutor"
                                value="tutor"
                                name="userType"
                                onChange={handleFormData}
                                checked={formData.userType === "tutor"}
                            />
                            <label
                                htmlFor="student"
                                className="block font-semibold"
                            >
                                Student
                            </label>
                            <input
                                type="radio"
                                id="student"
                                value="student"
                                name="userType"
                                onChange={handleFormData}
                                checked={formData.userType === "student"}
                            />
                            {formErrors?.email ? (
                                <p className="text-red-400 mt-2">
                                    {formErrors?.email}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
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
            </div>
        </section>
    );
};

export default Onboard;
