import searchSvg from "./../img/search.svg";

const NotFoundPage = () => {
    return (
        <div className=" py-44 px-5 text-center">
            <h1 className="font-bold text-4xl">Well, there is nothing in here</h1>
            <img src={searchSvg} alt="" className=" max-w-lg mx-auto" />
        </div>
    );
};

export default NotFoundPage;
