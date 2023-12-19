import Access from "@/components/Access";
import DeviceInfo from "@/components/DeviceInfo";
import Subtitle from "@/components/Subtitle";
import {
    ClaimDeviceResult,
    LlllDevice,
    claimDevice,
} from "@/services/firebase";
import { mqttActions, mqttState } from "@/valtio/mqtt";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSnapshot } from "valtio";
import { PlusCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { authState } from "@/valtio/auth";

interface SwitchDeviceProps {
    devices: LlllDevice[];
}

const SwitchDevice: FC<SwitchDeviceProps> = ({ devices }) => {
    const mqttSnap = useSnapshot(mqttState);

    const handleChangeDevice = async (e: ChangeEvent<HTMLSelectElement>) => {
        const device = devices.find((device) => device.id === e.target.value);
        if (!device) return;

        await mqttActions.setActiveDeviceInfo(device as LlllDevice);
    };

    return (
        <div className="flex items-centers gap-2">
            <Subtitle text="Thiết bị: " />
            <select
                onChange={handleChangeDevice}
                value={mqttSnap.activeDeviceInfo.id}
            >
                {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                        {device.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const AddDevice = () => {
    const [deviceId, setDeviceId] = useState("");
    const [devicePassword, setDevicePassword] = useState("");
    const authSnap = useSnapshot(authState);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!deviceId || !devicePassword)
            return toast.error("Vui lòng nhập đầy đủ thông tin!");

        const result = await claimDevice(
            deviceId,
            devicePassword,
            authSnap.profile?.email as string
        );

        switch (result) {
            case ClaimDeviceResult.Success:
                toast.success(
                    "Thêm thiết bị thành công! Vui lòng tải lại trang web để cập nhật thiết bị mới"
                );
                break;
            case ClaimDeviceResult.DeviceAlreadyClaimed:
                toast.error("Thiết bị đã có người sở hữu!");
                break;
            case ClaimDeviceResult.DeviceNotFound:
                toast.error("Thiết bị không tồn tại!");
                break;
            case ClaimDeviceResult.WrongPassword:
                toast.error("Mật khẩu không đúng!");
                break;
            default:
                toast.error("Thêm thiết bị thất bại!");
                break;
        }
    };

    return (
        <div>
            <Subtitle text="Để thêm thiết bị, vui lòng nhập ID và mật khẩu của thiết bị" />

            <form
                className="flex flex-wrap items-center gap-2"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Nhập ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={devicePassword}
                    onChange={(e) => setDevicePassword(e.target.value)}
                />
                <button
                    className="btn flex items-center gap-2 px-6"
                    type="submit"
                >
                    <PlusCircleOutlined />
                    Thêm
                </button>
            </form>
        </div>
    );
};

const ManagePage = () => {
    const mqttSnap = useSnapshot(mqttState);

    if (mqttSnap.ownedDevices.length === 0) {
        return (
            <div className="flex flex-col gap-4 text-xl text-tertiary font-semibold">
                <p>Bạn không sở hữu thiết bị nào!</p>
                <AddDevice />
            </div>
        );
    }

    const device = mqttSnap.activeDeviceInfo;

    return (
        <div className="flex flex-col gap-4">
            <SwitchDevice devices={mqttSnap.ownedDevices as LlllDevice[]} />
            <AddDevice />
            <div key={device.id}>
                <DeviceInfo
                    id={device.id}
                    name={device.name}
                    owner={device.owner}
                />
                <Access accessList={[...device.users]} id={device.id} />
            </div>
        </div>
    );
};

export default ManagePage;
