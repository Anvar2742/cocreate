import { IconLoader } from "@tabler/icons-react";

const Loader = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <IconLoader
                size={100}
                className="stroke-primary drop-shadow-xl animate-spin-2"
            />
        </div>
    );
};

export default Loader;
