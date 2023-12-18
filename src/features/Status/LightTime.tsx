import Subtitle from "@/components/Subtitle";
import { mqttState } from "@/valtio/mqtt";
import GaugeChart from "react-gauge-chart";
import { useSnapshot } from "valtio";

const timeToString = (time: number) => {
    if (time === 0) return "Đèn đang tắt";

    if (time < 0.01) return `${Math.floor(time * 60 * 60)} giây`;

    if (time < 1) {
        return `${Math.floor(time * 60)} phút`;
    }

    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours} giờ ${minutes} phút`;
};

export const LightTime = () => {
    const mqttSnap = useSnapshot(mqttState);
    const { activeStatusLogs } = mqttSnap;

    let lightTimeInSec = 0;

    try {
        lightTimeInSec =
            activeStatusLogs[activeStatusLogs.length - 1].lightTime || 0;
    } catch (error) {
        console.log("--> no light time data");
    }

    const lightTimeInHour = lightTimeInSec / 3600;
    const lightTimePercent = lightTimeInHour / 12;

    return (
        <div>
            <Subtitle text="Thời gian sáng" />

            <div className="max-w-[400px] flex flex-col items-center">
                <GaugeChart
                    nrOfLevels={3}
                    colors={["#65B741", "#FFB534", "#F05941"]}
                    arcsLength={[0.4, 0.4, 0.2]}
                    percent={lightTimePercent}
                    needleColor="#39A7FF"
                    textColor="#FF90BC"
                    hideText={true}
                />
                <p className="font-semibold">{timeToString(lightTimeInHour)}</p>
            </div>
        </div>
    );
};

export default LightTime;
