import { changeDevice } from "@/services/mqtt";
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
    setActiveDevice: async (device: string) => {
        mqttState.activeDevice = device;
        changeDevice();
        toast.success(`Kết nối thiết bị: ${mqttState.activeDevice}`);
    },
};
