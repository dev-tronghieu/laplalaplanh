interface SubtitleProps {
    text: string;
}

const Subtitle = ({ text }: SubtitleProps) => {
    return <p className="text-lg font-semibold text-indigo-400">{text}</p>;
};

export default Subtitle;
