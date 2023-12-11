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

import { Line } from "react-chartjs-2";

const getLabelsByMinute = (period: number, columns: number) => {
    const now = new Date();
    const labels = [];

    for (
        let i = now.getMinutes() - (now.getMinutes() % period);
        i >= now.getMinutes() - period * columns;
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
};

const Temperature = () => {
    const [minute, setMinute] = useState(10);
    const [columns, setColumns] = useState(10);

    return (
        <div>
            <Line
                redraw={true}
                options={lineChartOptions}
                data={{
                    labels: getLabelsByMinute(minute, columns),
                    datasets: [
                        {
                            label: "Nhiệt độ",
                            data: getLabelsByMinute(minute, columns).map(
                                () => Math.random() * 20 + 20
                            ),
                            borderColor: "rgb(75, 192, 192)",
                        },
                    ],
                }}
            />

            <div className="flex gap-4">
                <div className="flex flex-1 gap-2 items-center">
                    <label>Phút</label>
                    <input
                        type="number"
                        value={minute}
                        onChange={(e) => setMinute(Number(e.target.value))}
                    />
                </div>

                <div className="flex flex-1 gap-2 items-center">
                    <label>Số cột</label>
                    <input
                        type="number"
                        value={columns}
                        onChange={(e) => setColumns(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default Temperature;
