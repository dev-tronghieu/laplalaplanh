import { Toggle } from "@/components";
import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_ACTION_TYPE, publish } from "@/services/mqtt";
import { useState } from "react";

export const Power = () => {
    const [isOn, setIsOn] = useState(false);

    const handleOn = () => {
        publish(LLLL_ACTION_TYPE.SET_POWER, LLLL_ACTION_PARAMS.SET_POWER.ON);
        setIsOn(true);
    };

    const handleOff = () => {
        publish(LLLL_ACTION_TYPE.SET_POWER, LLLL_ACTION_PARAMS.SET_POWER.OFF);
        setIsOn(false);
    };

    const handleToggle = () => {
        if (isOn) {
            handleOff();
        } else {
            handleOn();
        }
    };

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Subtitle text="Nguồn" />
            <Toggle active={isOn} onToggle={handleToggle} />
        </div>
    );
};

export default Power;
