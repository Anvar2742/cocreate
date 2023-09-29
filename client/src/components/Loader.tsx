import { IconLoader } from "@tabler/icons-react";

const Loader = () => {
    return (
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 z-50 bg-white">
            <IconLoader
                size={100}
                className="stroke-primary drop-shadow-xl animate-spin-2"
            />
        </div>
    );
};

export default Loader;
