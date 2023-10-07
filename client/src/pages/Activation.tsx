import { IconMailOpened } from "@tabler/icons-react";

const Activation = () => {
    return (
        <section className="py-20">
            <div className="max-w-5xl px-4 m-auto">
                <h1 className="font-bold text-5xl flex items-center gap-2">
                    Email verification required <IconMailOpened size={40} />
                </h1>
                <p className="text-2xl mt-4">We've sent an email with a verification link.</p>
            </div>
        </section>
    );
};

export default Activation;
