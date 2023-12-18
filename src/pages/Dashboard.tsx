import {
    LightColor,
    LightEffect,
    OperatingMode,
    Power,
    SwitchDevice,
} from "@/features/Controller";
import { Temperature } from "@/features/Status";
import LightTime from "@/features/Status/LightTime";
import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

const DashboardPage = () => {
    const mqttSnap = useSnapshot(mqttState);

    if (mqttSnap.devices.length === 0)
        return (
            <div>
                <p className="text-xl text-tertiary font-semibold">
                    Bạn chưa có quyền truy cập bất kỳ thiết bị nào!
                </p>
            </div>
        );

    return (
        <div className="flex flex-col gap-x-32 gap-y-8">
            <SwitchDevice />

            <div className="flex flex-wrap gap-x-8 gap-y-4">
                <Power />
                <OperatingMode />
                <LightColor />
                <LightEffect />
            </div>

            <Temperature />

            <LightTime />
        </div>
    );
};

export default DashboardPage;
