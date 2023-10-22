const NotFound = ({ title, subTitle }: { title: string; subTitle: string }) => {
    return (
        <div>
            {title ? <h2 className="font-medium text-xl">{title}</h2> : ""}
            {subTitle ? <p className="text-md">{subTitle}</p> : ""}
        </div>
    );
};

export default NotFound;
