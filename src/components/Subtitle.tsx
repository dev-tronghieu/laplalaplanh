interface SubtitleProps {
    text: string;
}

const Subtitle = ({ text }: SubtitleProps) => {
    return <p className="text-lg font-semibold text-tertiary">{text}</p>;
};

export default Subtitle;
