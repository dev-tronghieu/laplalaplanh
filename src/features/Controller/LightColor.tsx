import Subtitle from "@/components/Subtitle";
import { debounce } from "lodash";
import { LLLL_ACTION_PARAMS, LLLL_ACTION_TYPE, publish } from "@/services/mqtt";
import { useSnapshot } from "valtio";
import { mqttState } from "@/valtio/mqtt";

export const LightColor = () => {
    const mqttSnap = useSnapshot(mqttState);

    const color = "#" + mqttSnap.activeDevice.config.color;

    const handleColorChange = debounce((color: string) => {
        publish(
            LLLL_ACTION_TYPE.CHANGE_COLOR,
            LLLL_ACTION_PARAMS.CHANGE_COLOR(color.slice(1))
        );
    }, 500);

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Subtitle text="Màu sắc" />
            <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
            />
            <p>{color}</p>
        </div>
    );
};

export default LightColor;
