import { FC } from "react";

interface ToggleProps {
    active: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export const Toggle: FC<ToggleProps> = ({ active, onToggle, disabled }) => {
    let containerStyle =
        "w-12 h-6 rounded-full shadow outline-none focus:outline-none transition duration-200 ease-in-out";

    let dotStyle =
        "w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out";

    containerStyle += active ? " bg-primary" : " bg-dark";
    dotStyle += active ? " translate-x-7" : " translate-x-1";

    const disabledStyle = "grayscale opacity-50 cursor-not-allowed";
    containerStyle += disabled ? ` ${disabledStyle}` : "";

    return (
        <button
            className={containerStyle}
            onClick={onToggle}
            disabled={disabled}
        >
            <div className={dotStyle} />
        </button>
    );
};
