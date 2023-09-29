import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { IconLoader, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const TitleCreateModal = ({
    toggleCreateModal,
    isCreateModal,
}: {
    toggleCreateModal: CallableFunction;
    isCreateModal: boolean;
}) => {
    interface formData {
        [key: string]: string;
    }
    const initialFormData = {
        title: "",
        description: "",
    };

    const refresh = useRefreshToken();

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState<formData>(initialFormData);
    const [formErrors, setFormErrors] = useState<formData>(initialFormData);
    const [generalErr, setGeneralErr] = useState<string>("");
    const navigate = useNavigate();

    const handleFormData = async (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target?.name]: e.target?.value,
            };
        });
    };

    const handleErrors = (formData: formData) => {
        const titleCreateErrors = initialFormData;

        if (!formData.title) {
            titleCreateErrors.title = "Please enter a title";
            setFormErrors(titleCreateErrors);
            return false;
        }

        if (!formData.description) {
            titleCreateErrors.description = "Please enter a description";
            setFormErrors(titleCreateErrors);
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
            const resp = await axiosPrivate.post(
                `/${true ? "courses" : "lessons"}/create`,
                formData,
                {
                    withCredentials: true,
                }
            );

            console.log(resp);
            if (resp.status === 201) {
                navigate(resp?.data?.slug);
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

    useEffect(() => {
        if (isCreateModal) {
            refresh();
        }
    }, [isCreateModal]);

    return (
        <>
            <div
                className={`w-screen h-screen backdrop-blur-sm bg-black top-0 bg-opacity-20 fixed left-0 transition-all duration-300 z-40 ${
                    isCreateModal ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`text-blueGray fixed translate-y-1/2 left-0 right-0 mx-auto max-w-xs bg-white pt-8 pb-14 flex items-center flex-col bg-cover z-50 rounded-2xl transition-all duration-500 ${
                    isCreateModal ? "bottom-1/2" : "-bottom-full"
                }`}
            >
                <h2 className="font-bold text-2xl">Your courses</h2>
                <form
                    className={`mt-4 w-full px-10 flex flex-col relative ${
                        isSubmit ? "opacity-70 pointer-events-none" : ""
                    }`}
                    onSubmit={submitForm}
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
                        <label htmlFor="title" className="block font-semibold">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md"
                            placeholder="Title"
                            name="title"
                            onChange={handleFormData}
                            value={formData.title}
                        />
                        {formErrors?.title ? (
                            <p className="text-red-400 mt-2">
                                {formErrors?.title}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="description"
                            className="block font-semibold"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md"
                            placeholder="Description"
                            name="description"
                            onChange={handleFormData}
                            value={formData.description}
                        />
                        {formErrors?.description ? (
                            <p className="text-red-400 mt-2">
                                {formErrors?.description}
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

                <button
                    className="absolute -bottom-3 bg-secRed w-9 h-9 flex items-center justify-center rounded-full"
                    onClick={() => toggleCreateModal()}
                >
                    <IconX color="white" />
                </button>
            </div>
        </>
    );
};

export default TitleCreateModal;
