const Navbar = () => {
    return (
        <header className="py-4 bg-primary text-white">
            <div className="max-w-5xl px-4 m-auto flex justify-between items-center">
                <a href="/" className="font-extrabold text-4xl text-white">
                    CoCreate
                </a>
                <div className="flex items-center gap-10">
                    <div className="hidden sm:block">
                        <nav>
                            <ul className="flex gap-4">
                                <li>
                                    <a href="#" className="">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="">
                                        Profiles
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <button className="backdrop-blur-sm bg-white bg-opacity-40 text-white py-2 px-8 rounded-full font-semibold hover:shadow-white hover:bg-sec transition-all">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
