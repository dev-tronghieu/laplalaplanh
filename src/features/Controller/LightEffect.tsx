import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_CHANNEL, publish } from "@/services/mqtt";

export const LightEffect = () => {
    const options = Object.values(LLLL_ACTION_PARAMS.CHANGE_EFFECT);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        publish(LLLL_CHANNEL.ACTION_CHANGE_EFFECT, event.target.value);
    };

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Subtitle text="Hiệu ứng" />

            <select onChange={handleChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LightEffect;
