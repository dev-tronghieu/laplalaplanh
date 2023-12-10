import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";
import * as mqttService from "@/services/mqtt";

const Device = () => {
    const mqttSnap = useSnapshot(mqttState);

    const handleChangeDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mqttService.changeDevice(e.target.value);
    };

    const handleSayHello = () => {
        mqttService.publish(
            mqttService.LLLL_CHANNEL.HELLO,
            "Say hello from LLLL client!"
        );
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div>
                <select
                    className="border border-blue-500 p-2 rounded focus:outline-none"
                    onChange={handleChangeDevice}
                >
                    {mqttSnap.devices.map((device) => (
                        <option key={device} value={device}>
                            Mã thiết bị: {device}
                        </option>
                    ))}
                </select>
            </div>

            {mqttSnap.activeDevice && (
                <button className="btn" onClick={handleSayHello}>
                    Say hello
                </button>
            )}
        </div>
    );
};

export default Device;
