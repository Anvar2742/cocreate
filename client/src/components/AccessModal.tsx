import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { IconLoader, IconX } from "@tabler/icons-react";
import useRefreshToken from "../hooks/useRefreshToken";

const AccessModal = ({
    toggleAccessModal,
    isAccessModal,
    courseId,
}: {
    toggleAccessModal: CallableFunction;
    isAccessModal: boolean;
    courseId: string;
}) => {
    interface formData {
        [key: string]: string;
    }
    const initialFormData = {
        email: "",
        courseId,
    };

    const refresh = useRefreshToken();

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [formData, setFormData] = useState<formData>(initialFormData);
    const [formErrors, setFormErrors] = useState<formData>(initialFormData);
    const [generalErr, setGeneralErr] = useState<string>("");

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

    const handleErrors = (formData: formData) => {
        const accessCreateErrors = initialFormData;

        if (!formData.email) {
            accessCreateErrors.email = "Please enter an email";
            setFormErrors(accessCreateErrors);
            return false;
        }

        return true;
    };

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(initialFormData);
        setGeneralErr("");

        if (isSuccess) {
            return;
        }
        try {
            setIsSubmit(true);
            if (!handleErrors(formData)) {
                return;
            }

            const resp = await axiosPrivate.post(`/courses/access`, formData, {
                withCredentials: true,
            });

            console.log(resp);
            if (resp.status === 204) {
                setIsSuccess(true);
            }
        } catch (err: Error | AxiosError | any) {
            if (axios.isAxiosError(err)) {
                // Access to config, request, and response
                console.log(err);
                if (err.code === "ERR_NETWORK") {
                    setGeneralErr("Server is not responding");
                } else if (err.response?.data?.msg) {
                    setGeneralErr(err.response?.data?.msg);
                } else {
                    setFormErrors(err.response?.data);
                }
            } else {
                setGeneralErr("Server is not responding");
                console.log(err);
            }
        } finally {
            setIsSubmit(false);
        }
    };

    useEffect(() => {
        if (isAccessModal) {
            refresh();
        }
    }, [isAccessModal]);

    const handleIsSuccess = () => {
        toggleAccessModal();
        setIsSuccess(false);
        setFormData(initialFormData);
    };

    return (
        <>
            <div
                className={`w-screen h-screen backdrop-blur-sm bg-black top-0 bg-opacity-20 fixed left-0 transition-all duration-300 z-40 ${
                    isAccessModal ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`text-blueGray fixed translate-y-1/2 left-0 right-0 mx-auto max-w-xs bg-white pt-8 pb-14 flex items-center flex-col bg-cover z-50 rounded-2xl transition-all duration-500 ${
                    isAccessModal ? "bottom-1/2" : "-bottom-full"
                }`}
            >
                <form
                    className={`mt-4 w-full px-10 flex flex-col relative ${
                        isSubmit ? "opacity-70 pointer-events-none" : ""
                    }`}
                    onSubmit={submitForm}
                >
                    {isSuccess ? (
                        <div className="w-full h-full absolute top-0 left-0 bg-white z-10 flex items-center justify-center flex-col px-6">
                            <h3 className="text-2xl font-bold">
                                Access granted!
                            </h3>
                            <p className="text-md font-medium mt-2 text-center">
                                Now a student with this email
                                <b className="font-bold inline">
                                    {` ${formData?.email} `}
                                </b>
                                has access to your course!
                            </p>
                            <button
                                onClick={handleIsSuccess}
                                className="border-2 border-primary rounded-lg px-5 mt-4"
                            >
                                OK
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
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
                        <label
                            htmlFor="studentEmail"
                            className="block font-semibold"
                        >
                            Student email
                        </label>
                        <input
                            type="email"
                            id="studentEmail"
                            className="bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md"
                            placeholder="Student email"
                            name="email"
                            onChange={handleFormData}
                            value={formData.email}
                        />
                        {formErrors?.email ? (
                            <p className="text-red-400 mt-2">
                                {formErrors?.email}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    {generalErr ? (
                        <p className="text-red-400 mt-2">{generalErr}</p>
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

                <button
                    className="absolute -bottom-3 bg-secRed w-9 h-9 flex items-center justify-center rounded-full"
                    onClick={() => toggleAccessModal()}
                >
                    <IconX color="white" />
                </button>
            </div>
        </>
    );
};

export default AccessModal;
