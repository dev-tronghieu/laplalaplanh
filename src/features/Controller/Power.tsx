import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_CHANNEL, publish } from "@/services/mqtt";
import { useState } from "react";

export const Power = () => {
    const [isOn, setIsOn] = useState(false);
    const baseStyle = "flex-1 rounded p-1 transition px-8 py-1";
    const onStyle = `${baseStyle} bg-primary text-white`;
    const offStyle = `${baseStyle} bg-slate-500 text-white`;

    const handleOn = () => {
        publish(LLLL_CHANNEL.ACTION_SET_POWER, LLLL_ACTION_PARAMS.SET_POWER.ON);
        setIsOn(true);
    };

    const handleOff = () => {
        publish(
            LLLL_CHANNEL.ACTION_SET_POWER,
            LLLL_ACTION_PARAMS.SET_POWER.OFF
        );
        setIsOn(false);
    };

    return (
        <div className="flex gap-2 items-center">
            <Subtitle text="Nguồn" />

            <div className="p-1 border border-secondary rounded flex items-center gap-1">
                <button
                    className={isOn ? baseStyle : offStyle}
                    onClick={handleOff}
                >
                    Tắt
                </button>
                <button
                    className={isOn ? onStyle : baseStyle}
                    onClick={handleOn}
                >
                    Mở
                </button>
            </div>
        </div>
    );
};

export default Power;
