interface SubtitleProps {
    text: string;
}

const Subtitle = ({ text }: SubtitleProps) => {
    return <p className="text-lg font-semibold text-primary">{text}</p>;
};

export default Subtitle;
