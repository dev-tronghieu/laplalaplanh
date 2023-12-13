import Subtitle from "@/components/Subtitle";
import { LLLL_ACTION_PARAMS, LLLL_CHANNEL, publish } from "@/services/mqtt";

const ReportInterval = () => {
    const options = Object.values(LLLL_ACTION_PARAMS.UPDATE_REPORT_INTERVAL);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        publish(LLLL_CHANNEL.ACTION_UPDATE_REPORT_INTERVAL, value);
    };

    return (
        <div>
            <Subtitle text="Báo cáo định kỳ" />

            <select
                className="border border-gray-300 rounded p-1"
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ReportInterval;
