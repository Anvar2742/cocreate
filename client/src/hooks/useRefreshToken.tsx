import { axiosInstance } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosInstance.get("/refresh", {
                withCredentials: true,
            });
            setAuth((prev) => {
                // console.log(JSON.stringify(prev));
                // console.log(response.data.accessToken);
                return {
                    ...prev,
                    accessToken: response.data.accessToken,
                    isOnboard: response.data.isOnboard,
                };
            });
            return response.data.accessToken;
        } catch (error) {
            // console.log(error);
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
