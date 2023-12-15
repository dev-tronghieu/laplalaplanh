import Subtitle from "@/components/Subtitle";
import { useState } from "react";
import { debounce } from "lodash";
import { LLLL_ACTION_PARAMS, LLLL_ACTION_TYPE, publish } from "@/services/mqtt";

export const LightColor = () => {
    const [color, setColor] = useState<string>("#ffffff");

    const handleColorChange = debounce((color: string) => {
        setColor(color);
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
