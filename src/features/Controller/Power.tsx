import { Toggle } from "@/components";
import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_ACTION_TYPE, publish } from "@/services/mqtt";
import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

export const Power = () => {
    const mqttSnap = useSnapshot(mqttState);
    const isOn = mqttSnap.config.power === LLLL_ACTION_PARAMS.SET_POWER.ON;

    const handleOn = () => {
        publish(LLLL_ACTION_TYPE.SET_POWER, LLLL_ACTION_PARAMS.SET_POWER.ON);
    };

    const handleOff = () => {
        publish(LLLL_ACTION_TYPE.SET_POWER, LLLL_ACTION_PARAMS.SET_POWER.OFF);
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
