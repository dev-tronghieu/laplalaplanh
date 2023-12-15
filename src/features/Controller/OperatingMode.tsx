import { Toggle } from "@/components";
import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_ACTION_TYPE, publish } from "@/services/mqtt";
import { useState } from "react";

export const OperatingMode = () => {
    const [isManual, setIsManual] = useState(false);

    const handleManual = () => {
        publish(
            LLLL_ACTION_TYPE.SET_OPERATING_MODE,
            LLLL_ACTION_PARAMS.SET_OPERATING_MODE.MANUAL
        );
        setIsManual(true);
    };

    const handleAuto = () => {
        publish(
            LLLL_ACTION_TYPE.SET_OPERATING_MODE,
            LLLL_ACTION_PARAMS.SET_OPERATING_MODE.AUTO
        );
        setIsManual(false);
    };

    const handleToggle = () => {
        if (isManual) {
            handleAuto();
        } else {
            handleManual();
        }
    };

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Subtitle text="Tự động" />

            <Toggle active={!isManual} onToggle={handleToggle} />
        </div>
    );
};

export default OperatingMode;
