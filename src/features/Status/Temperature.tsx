import Subtitle from "@/components/Subtitle";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { Line } from "react-chartjs-2";
import { useSnapshot } from "valtio";
import { mqttActions, mqttState } from "@/valtio/mqtt";
import { debounce } from "lodash";

const SAFE_THRESHOLD = 40;
const WARNING_THRESHOLD = 56;

const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Biểu đồ nhiệt độ đèn",
        },
    },
    maintainAspectRatio: true,
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: "Thời gian",
            },
            grid: {
                display: false,
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: "Nhiệt độ (°C)",
            },
            ticks: {
                callback: (value) => {
                    if ((value as number) === SAFE_THRESHOLD)
                        return `${value} (Cảnh báo)`;
                    if ((value as number) === WARNING_THRESHOLD)
                        return `${value} (Nguy hiểm)`;
                    return value;
                },
                color: (value) => {
                    if (value.tick.value < SAFE_THRESHOLD) return "#000000";
                    if (value.tick.value < WARNING_THRESHOLD) return "#FFA500";
                    return "#FF0000";
                },
                stepSize: 2,
            },
        },
    },
};

export const Temperature = () => {
    const mqttSnap = useSnapshot(mqttState);

    const debounceSetLimit = debounce((limit: number) => {
        mqttActions.setLimit(limit);
    }, 500);

    const handleSetFromDatetime = (datetime: string) => {
        const epochTime = new Date(datetime).getTime() / 1000;
        mqttActions.setFromEpochTime(epochTime);
    };

    const handleSetToDatetime = (datetime: string) => {
        const epochTime = new Date(datetime).getTime() / 1000;
        mqttActions.setToEpochTime(epochTime);
    };

    return (
        <div className="max-w-2xl">
            <Subtitle text="Nhiệt độ đèn" />

            <Line
                options={lineChartOptions}
                data={{
                    labels: mqttSnap.activeStatusLogs.map((log) => {
                        const date = new Date(0);
                        date.setUTCSeconds(log.epochTime);
                        return date.toLocaleTimeString("vi-VN");
                    }),
                    datasets: [
                        {
                            label: "Nhiệt độ",
                            data: mqttSnap.activeStatusLogs.map(
                                (log) => log.temperature
                            ),
                            borderColor: "#39A7FF",
                            backgroundColor: "#39A7FF",
                        },
                    ],
                }}
            />

            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-wrap items-center gap-2">
                    <label>Số dữ liệu hiển thị:</label>
                    <input
                        type="number"
                        defaultValue={mqttSnap.limit}
                        onChange={(e) =>
                            debounceSetLimit(parseInt(e.target.value) || 8)
                        }
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <label>Từ thời điểm</label>
                    <input
                        type="datetime-local"
                        onChange={(e) => handleSetFromDatetime(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <label>Tới thời điểm</label>
                    <input
                        type="datetime-local"
                        onChange={(e) => handleSetToDatetime(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
