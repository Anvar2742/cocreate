import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className={`bgs-primary text-black bg-[#252641] py-16`}>
            <div className="max-w-5xl px-4 m-auto text-center">
                <Link
                    to="/"
                    className="font-extrabold text-2xl sm:text-4xl text-white"
                >
                    Oxillia
                </Link>
                <p className="mt-6 text-white opacity-40">© 2023 All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
