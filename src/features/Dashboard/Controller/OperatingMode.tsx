import { LLLL_ACTION_PARAMS, LLLL_CHANNEL, publish } from "@/services/mqtt";
import { useState } from "react";

const OperatingMode = () => {
    const [isManual, setIsManual] = useState(false);
    const baseStyle = "flex-1 rounded p-1 transition";
    const activeStyle = `${baseStyle} bg-indigo-400 text-white`;

    const handleManual = () => {
        publish(
            LLLL_CHANNEL.ACTION_SET_OPERATING_MODE,
            LLLL_ACTION_PARAMS.SET_OPERATING_MODE.MANUAL
        );
        setIsManual(true);
    };

    const handleAuto = () => {
        publish(
            LLLL_CHANNEL.ACTION_SET_OPERATING_MODE,
            LLLL_ACTION_PARAMS.SET_OPERATING_MODE.AUTO
        );
        setIsManual(false);
    };

    return (
        <div className="p-1 border border-indigo-400 rounded flex items-center gap-2">
            <button
                className={isManual ? activeStyle : baseStyle}
                onClick={handleManual}
            >
                Thủ công
            </button>
            <button
                className={isManual ? baseStyle : activeStyle}
                onClick={handleAuto}
            >
                Tự động
            </button>
        </div>
    );
};

export default OperatingMode;
