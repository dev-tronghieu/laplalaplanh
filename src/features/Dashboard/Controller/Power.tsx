import { useState } from "react";

const Power = () => {
    const [isOn, setIsOn] = useState(false);
    const baseStyle = "flex-1 rounded p-1 transition";
    const onStyle = `${baseStyle} bg-indigo-400 text-white`;
    const offStyle = `${baseStyle} bg-slate-500 text-white`;

    const handleOn = () => {
        setIsOn(true);
    };

    const handleOff = () => {
        setIsOn(false);
    };

    return (
        <div className="p-1 border border-indigo-400 rounded flex items-center gap-2">
            <button className={isOn ? baseStyle : offStyle} onClick={handleOff}>
                Tắt đèn
            </button>
            <button className={isOn ? onStyle : baseStyle} onClick={handleOn}>
                Mở đèn
            </button>
        </div>
    );
};

export default Power;
