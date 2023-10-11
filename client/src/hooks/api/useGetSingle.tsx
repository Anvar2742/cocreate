import axios, { AxiosError } from "axios";
import useAxiosPrivate from "../useAxiosPrivate";

const useGetSingle = () => {
    const axiosPrivate = useAxiosPrivate();

    const getSingle = async (slug: string, itemType: string) => {
        try {
            const resp = await axiosPrivate.post(`/${itemType}`, { slug });
            // console.log(resp);

            if (resp.status === 200) {
                return resp.data;
            } else {
                throw new Error("Server is not responding");
            }
        } catch (err: Error | AxiosError | any) {
            if (axios.isAxiosError(err)) {
                // console.log(err);
                if (err.code === "ERR_NETWORK") {
                    throw new Error("Server is not responding");
                } else if (err.response?.data?.msg) {
                    throw new Error(err.response?.data?.msg);
                } else if (err.response?.status === 404) {
                    throw new Error(err.response?.data);
                } else {
                    throw new Error(err.response?.data);
                }
            } else {
                // console.log(err);
                throw new Error("Server is not responding");
            }
        }
    };

    return getSingle;
};

export default useGetSingle;
