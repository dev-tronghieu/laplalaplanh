import { StatusLog, watchStatusLogsByEpochTime } from "@/services/firebase";
import { reSubscribe } from "@/services/mqtt";
import { toast } from "react-toastify";
import { proxy } from "valtio";

export interface MqttState {
    isConnected: boolean;
    devices: string[];
    activeDevice?: string;
    activeStatusLogs: StatusLog[];
    unsubscribe?: () => void;
    limit: number;
    toEpochTime: number;
}

export const mqttState = proxy<MqttState>({
    isConnected: false,
    devices: [],
    activeStatusLogs: [],
    limit: 8,
    toEpochTime: new Date().setHours(23, 59, 59, 999) / 1000,
});

export const mqttActions = {
    setConnected: (connected: boolean) => {
        mqttState.isConnected = connected;
    },

    setDevices: (devices: string[]) => {
        mqttState.devices = devices;
    },

    setActiveStatusLogs: (statusLogs: StatusLog[]) => {
        mqttState.activeStatusLogs = statusLogs;
    },

    setLimit: (limit: number) => {
        mqttState.limit = limit;
        mqttActions.watchStatusLogs(mqttState.activeDevice!);
    },

    setToEpochTime: (toEpochTime: number) => {
        mqttState.toEpochTime = toEpochTime;
    },

    watchStatusLogs: async (device: string) => {
        mqttState.unsubscribe?.();

        mqttState.unsubscribe = await watchStatusLogsByEpochTime(
            device,
            mqttState.toEpochTime,
            mqttActions.setActiveStatusLogs,
            mqttState.limit
        );
    },

    setActiveDevice: async (device: string) => {
        mqttActions.watchStatusLogs(device);

        mqttState.activeDevice = device;

        reSubscribe();

        toast.success(`Kết nối thiết bị: ${mqttState.activeDevice}`);
    },
};
