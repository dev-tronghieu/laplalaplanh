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
import { useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { debounce } from "lodash";

import { Line } from "react-chartjs-2";

const getLabelsByMinute = (period: number, columns: number) => {
    const now = new Date();
    const labels = [];

    for (
        let i = now.getMinutes() - (now.getMinutes() % period);
        i >= now.getMinutes() - period * (columns + 1);
        i -= period
    ) {
        const date = new Date(now);
        date.setMinutes(i);
        labels.unshift(
            date.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    }

    return labels;
};

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
};

export const Temperature = () => {
    const [minute, setMinute] = useState(10);
    const [columns, setColumns] = useState(10);

    const debouncedMinuteChange = debounce((value) => {
        setMinute(value);
    }, 200);

    const debouncedColumnsChange = debounce((value) => {
        setColumns(value);
    }, 200);

    return (
        <div className="max-w-2xl">
            <Subtitle text="Nhiệt độ đèn" />

            <Line
                options={lineChartOptions}
                data={{
                    labels: getLabelsByMinute(minute, columns),
                    datasets: [
                        {
                            label: "Nhiệt độ",
                            data: getLabelsByMinute(minute, columns).map(
                                () => Math.random() * 20 + 20
                            ),
                            borderColor: "#39A7FF",
                            backgroundColor: "#39A7FF",
                        },
                    ],
                }}
            />

            <div className="flex flex-col gap-2 max-w-[300px]">
                <div className="flex flex-col gap-2">
                    <label>Khoảng thời gian: {minute} phút</label>
                    <input
                        type="range"
                        onChange={(e) =>
                            debouncedMinuteChange(Number(e.target.value))
                        }
                        min={5}
                        max={60}
                        step={5}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Số cột hiển thị: {columns}</label>
                    <input
                        type="range"
                        onChange={(e) =>
                            debouncedColumnsChange(Number(e.target.value))
                        }
                        min={6}
                        max={18}
                        step={1}
                    />
                </div>
            </div>
        </div>
    );
};
