import { toast } from "react-toastify";
import { proxy } from "valtio";

export interface MqttState {
    devices: string[];
    activeDevice?: string;
}

export const mqttState = proxy<MqttState>({
    devices: [],
});

export const mqttActions = {
    setDevices: (devices: string[]) => {
        mqttState.devices = devices;
    },

    setActiveDevice: (device: string) => {
        mqttState.activeDevice = device;
        toast.success(
            `Kết nối thành công tới thiết bị: ${mqttState.activeDevice}`
        );
    },
};
