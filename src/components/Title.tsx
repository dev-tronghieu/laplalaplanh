interface TitleProps {
    text: string;
}

const Title = ({ text: title }: TitleProps) => {
    return (
        <h2 className="text-pink-400 text-2xl font-semibold mb-2">{title}</h2>
    );
};

export default Title;
