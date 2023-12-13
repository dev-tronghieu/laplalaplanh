import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_CHANNEL, publish } from "@/services/mqtt";
import { useState } from "react";

export const OperatingMode = () => {
    const [isManual, setIsManual] = useState(false);
    const baseStyle = "flex-1 rounded transition whitespace-nowrap px-8 py-1";
    const activeStyle = `${baseStyle} bg-primary text-white`;

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
        <div className="flex gap-2 items-center">
            <Subtitle text="Chế độ" />

            <div className="p-1 border border-secondary rounded flex items-center gap-1">
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
        </div>
    );
};

export default OperatingMode;
