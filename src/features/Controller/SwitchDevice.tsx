import Subtitle from "@/components/Subtitle";
import { changeDevice } from "@/services/mqtt";
import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

export const SwitchDevice = () => {
    const mqttSnap = useSnapshot(mqttState);

    const handleChangeDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeDevice(e.target.value);
    };

    return (
        <div className="flex items-centers gap-2">
            <Subtitle text="Thiết bị: " />

            <select onChange={handleChangeDevice}>
                {mqttSnap.devices.map((device) => (
                    <option key={device} value={device}>
                        {device}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SwitchDevice;
