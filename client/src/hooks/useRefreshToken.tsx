import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
            });
            setAuth((prev) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {
                    ...prev,
                    accessToken: response.data.accessToken,
                };
            });
            return response.data.accessToken;
        } catch (error) {
            console.log(error);
            setAuth((prev) => {
                return {
                    ...prev,
                    accessToken: false,
                };
            });
        }
    };

    return refresh;
};

export default useRefreshToken;
