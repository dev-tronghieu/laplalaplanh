import Title from "@/components/Title";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const DeviceStatus = () => {
    return (
        <div>
            <Title text="Thông số thiết bị" />

            <Line
                data={{
                    datasets: [
                        {
                            label: "Nhiệt độ",
                            data: [20, 21, 22, 23, 24, 25, 26],
                            fill: false,
                            borderColor: "#ff0000",
                            pointRadius: 0,
                            yAxisID: "temperature",
                        },
                        {
                            label: "Độ ẩm",
                            data: [40, 41, 42, 43, 44, 45, 46],
                            fill: false,
                            borderColor: "#0000ff",
                            pointRadius: 0,
                            yAxisID: "humidity",
                        },
                    ],
                }}
            />
        </div>
    );
};

export default DeviceStatus;
