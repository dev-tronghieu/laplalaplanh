import {
    DeviceConfig,
    StatusLog,
    watchConfig,
    watchStatusLogsByEpochTime,
} from "@/services/firebase";
import { reSubscribe } from "@/services/mqtt";
import { toast } from "react-toastify";
import { proxy } from "valtio";

export interface MqttState {
    isConnected: boolean;
    devices: string[];
    activeDevice?: string;
    activeStatusLogs: StatusLog[];
    unsubscribeStatusLogs?: () => void;
    limit: number;
    fromEpochTime: number;
    toEpochTime: number;
    config: DeviceConfig;
    unsubscribeConfig?: () => void;
}

export const mqttState = proxy<MqttState>({
    isConnected: false,
    devices: [],
    activeStatusLogs: [],
    limit: 8,
    fromEpochTime: new Date().setHours(0, 0, 0, 0) / 1000,
    toEpochTime: new Date().setHours(23, 59, 59, 999) / 1000,
    config: {
        power: "off",
        operatingMode: "auto",
        effect: "single-color",
        color: "#ffffff",
    },
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

    setFromEpochTime: (fromEpochTime: number) => {
        mqttState.fromEpochTime = fromEpochTime;
        mqttActions.watchStatusLogs(mqttState.activeDevice!);
    },

    setToEpochTime: (toEpochTime: number) => {
        mqttState.toEpochTime = toEpochTime;
        mqttActions.watchStatusLogs(mqttState.activeDevice!);
    },

    watchStatusLogs: async (device: string) => {
        mqttState.unsubscribeStatusLogs?.();

        mqttState.unsubscribeStatusLogs = await watchStatusLogsByEpochTime(
            device,
            mqttState.fromEpochTime,
            mqttState.toEpochTime,
            mqttActions.setActiveStatusLogs,
            mqttState.limit
        );
    },

    watchConfig: async (device: string) => {
        mqttState.unsubscribeConfig?.();

        mqttState.unsubscribeConfig = await watchConfig(device, (config) => {
            mqttState.config = config;
        });
    },

    setActiveDevice: async (device: string) => {
        mqttActions.watchStatusLogs(device);
        mqttActions.watchConfig(device);

        mqttState.activeDevice = device;

        reSubscribe();

        toast.success(`Kết nối thiết bị: ${mqttState.activeDevice}`);
    },
};
