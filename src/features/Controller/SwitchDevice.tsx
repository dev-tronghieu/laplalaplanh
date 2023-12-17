import Subtitle from "@/components/Subtitle";
import { mqttActions, mqttState } from "@/valtio/mqtt";
import { ChangeEvent } from "react";
import { useSnapshot } from "valtio";

export const SwitchDevice = () => {
    const mqttSnap = useSnapshot(mqttState);

    const handleChangeDevice = async (e: ChangeEvent<HTMLSelectElement>) => {
        const device = mqttSnap.devices.find(
            (device) => device.id === e.target.value
        );

        if (!device) return;

        await mqttActions.setActiveDevice(device);
    };

    return (
        <div className="flex items-centers gap-2">
            <Subtitle text="Thiết bị: " />

            <select onChange={handleChangeDevice}>
                {mqttSnap.devices.map((device) => (
                    <option key={device.id} value={device.id}>
                        {device.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SwitchDevice;
