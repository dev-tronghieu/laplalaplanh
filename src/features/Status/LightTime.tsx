import Subtitle from "@/components/Subtitle";
import GaugeChart from "react-gauge-chart";

const timeToString = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours} giờ ${minutes} phút`;
};

export const LightTime = () => {
    const lightTime = 6.2;
    const lightTimePercent = lightTime / 12;

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
                <p className="font-semibold">{timeToString(lightTime)}</p>
            </div>
        </div>
    );
};

export default LightTime;
