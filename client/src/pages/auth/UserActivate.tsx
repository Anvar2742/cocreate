import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useGetUser from "../../hooks/api/useGetUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader";
import useRefreshToken from "../../hooks/useRefreshToken";

const UserActivate = () => {
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken();
    const getUser = useGetUser();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchParams, _setSearchParams] = useSearchParams();
    const [activateToken, setActivateToken] = useState<string | null>(null);
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const [isActivated, setIsActivated] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const updateUser = async (isActive: boolean) => {
        try {
            const resp = await axiosPrivate.put("/user", { isActive });
            console.log(resp);

            if (resp.status === 204) {
                setIsActivated(true);
                await refresh();
            }
        } catch (err) {
            console.log(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(searchParams);
        setActivateToken(searchParams.get("token"));
    }, [location?.pathname]);

    useEffect(() => {
        if (activateToken) {
            getUser()
                .then((user) => {
                    const userActivateToken = user.activateToken;
                    if (userActivateToken === activateToken) {
                        setIsValidToken(true);
                    } else {
                        setIsValidToken(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [activateToken]);

    useEffect(() => {
        if (isValidToken !== null) {
            if (isValidToken) {
                // update isActive for user
                updateUser(true);
            } else {
                // something went wrong
            }
        }
    }, [isValidToken]);

    return (
        <section className="py-20">
            <div className="max-w-5xl px-4 m-auto">
                {isLoading ? <Loader /> : ""}
                {isActivated ? (
                    <>
                        <h1 className="font-bold text-5xl">Great, all done!</h1>
                        <p className="text-2xl mt-4">We verified your email.</p>
                    </>
                ) : isError ? (
                    <>
                        <h1 className="font-bold text-5xl">Something went wrong...</h1>
                        {/* <p className="text-2xl mt-4"></p> */}
                    </>
                ) : (
                    <>
                        <h1 className="font-bold text-5xl">
                            Email not activated
                        </h1>
                        {/* <p className="text-2xl mt-4">Please check your email</p> */}
                    </>
                )}
            </div>
        </section>
    );
};

export default UserActivate;
