import glasses from "./../img/book-glasses.svg";

const NotFound = ({
    title,
    subTitle,
    img,
}: {
    title: string;
    subTitle: string;
    img: string;
}) => {
    return (
        <div className="">
            {title ? <h2 className="font-medium text-xl">{title}</h2> : ""}
            {subTitle ? <p className="text-md">{subTitle}</p> : ""}
            <img src={img ? img : glasses} alt="" className=" max-w-sm" />
        </div>
    );
};

export default NotFound;
