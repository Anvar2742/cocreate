import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const UserActivate = () => {
    const location = useLocation();
    const [searchParams, _setSearchParams] = useSearchParams();
    const [activateToken, setActivateToken] = useState<string | null>(null);

    useEffect(() => {
        console.log(searchParams);
        setActivateToken(searchParams.get("token"));
    }, [location?.pathname]);

    useEffect(() => {
        console.log(activateToken);
    }, [activateToken]);

    return (
        <section className="py-20">
            <div className="max-w-5xl px-4 m-auto">
                <h1 className="font-bold text-5xl">
                    Account UserActivate required
                </h1>
                <p className="text-2xl mt-4">Please check your email</p>
            </div>
        </section>
    );
};

export default UserActivate;
