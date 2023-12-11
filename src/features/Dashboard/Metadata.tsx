import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";
import * as mqttService from "@/services/mqtt";
import { authState } from "@/valtio/auth";
import Title from "@/components/Title";
import Subtitle from "@/components/Subtitle";

const DeviceMetadata = () => {
    const mqttSnap = useSnapshot(mqttState);
    const authSnap = useSnapshot(authState);

    const handleChangeDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mqttService.changeDevice(e.target.value);
    };

    if (!authSnap.profile) return null;

    return (
        <div className="flex flex-col gap-4">
            <Title text="Thông tin thêm" />

            <div className="flex items-center gap-2">
                <Subtitle text="Người dùng: " />

                <div className="flex items-center gap-1">
                    <img
                        src={authSnap.profile.photoURL}
                        alt="avatar"
                        className="w-5 h-5 rounded-full"
                    />
                    <p>{authSnap.profile.displayName}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Subtitle text="Thiết bị: " />

                <select
                    className="border border-blue-500 p-1 rounded focus:outline-none"
                    onChange={handleChangeDevice}
                >
                    {mqttSnap.devices.map((device) => (
                        <option key={device} value={device}>
                            {device}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DeviceMetadata;
