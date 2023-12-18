import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_ACTION_TYPE, publish } from "@/services/mqtt";
import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

const optionToReadable = (option: string) => {
    switch (option) {
        case LLLL_ACTION_PARAMS.CHANGE_EFFECT.SINGLE_COLOR:
            return "Đơn sắc";
        case LLLL_ACTION_PARAMS.CHANGE_EFFECT.FLASHING:
            return "Nhấp nháy";
        case LLLL_ACTION_PARAMS.CHANGE_EFFECT.RAINBOW:
            return "Cầu vồng";
        default:
            return "Không xác định";
    }
};

export const LightEffect = () => {
    const mqttSnap = useSnapshot(mqttState);
    const options = Object.values(LLLL_ACTION_PARAMS.CHANGE_EFFECT);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        publish(LLLL_ACTION_TYPE.CHANGE_EFFECT, event.target.value);
    };

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Subtitle text="Hiệu ứng" />

            <select
                value={mqttSnap.activeDevice.config.effect}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {optionToReadable(option)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LightEffect;
