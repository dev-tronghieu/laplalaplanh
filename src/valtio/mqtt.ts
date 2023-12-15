import { toast } from "react-toastify";
import { proxy } from "valtio";

export interface MqttState {
    isConnected: boolean;
    devices: string[];
    activeDevice?: string;
}

export const mqttState = proxy<MqttState>({
    isConnected: false,
    devices: [],
});

export const mqttActions = {
    setConnected: (connected: boolean) => {
        mqttState.isConnected = connected;
    },
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
