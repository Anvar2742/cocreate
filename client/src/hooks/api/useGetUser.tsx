import useAxiosPrivate from "../useAxiosPrivate";

const useGetUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const getUser = async () => {
        try {
            const resp = await axiosPrivate.get("/user");
            console.log(resp);
            return resp?.data;
        } catch (err) {
            console.log(err);
        }
    };

    return getUser;
};

export default useGetUser;
