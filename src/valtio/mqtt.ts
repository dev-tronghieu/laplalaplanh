import {
    DeviceConfig,
    LlllDevice,
    StatusLog,
    watchConfig,
    watchStatusLogsByEpochTime,
} from "@/services/firebase";
import { reSubscribe } from "@/services/mqtt";
import { toast } from "react-toastify";
import { proxy } from "valtio";

export interface MqttState {
    isConnected: boolean;
    devices: LlllDevice[];
    activeDevice: LlllDevice;
    activeStatusLogs: StatusLog[];
    unsubscribeStatusLogs?: () => void;
    logLimit: number;
    fromEpochTime: number;
    toEpochTime: number;
    config: DeviceConfig;
    unsubscribeConfig?: () => void;
}

export const mqttState = proxy<MqttState>({
    isConnected: false,
    devices: [],
    activeDevice: {
        id: "",
        name: "",
        owner: "",
    },
    activeStatusLogs: [],
    logLimit: 8,
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

    setDevices: (devices: LlllDevice[]) => {
        mqttState.devices = devices;
    },

    setActiveStatusLogs: (statusLogs: StatusLog[]) => {
        mqttState.activeStatusLogs = statusLogs;
    },

    setLimit: (limit: number) => {
        mqttState.logLimit = limit;
        mqttActions.watchStatusLogs(mqttState.activeDevice.id);
    },

    setFromEpochTime: (fromEpochTime: number) => {
        mqttState.fromEpochTime = fromEpochTime;
        mqttActions.watchStatusLogs(mqttState.activeDevice.id);
    },

    setToEpochTime: (toEpochTime: number) => {
        mqttState.toEpochTime = toEpochTime;
        mqttActions.watchStatusLogs(mqttState.activeDevice.id);
    },

    watchStatusLogs: async (device: string) => {
        mqttState.unsubscribeStatusLogs?.();

        mqttState.unsubscribeStatusLogs = await watchStatusLogsByEpochTime(
            device,
            mqttState.fromEpochTime,
            mqttState.toEpochTime,
            mqttActions.setActiveStatusLogs,
            mqttState.logLimit
        );
    },

    watchConfig: async (deviceId: string) => {
        mqttState.unsubscribeConfig?.();

        mqttState.unsubscribeConfig = await watchConfig(deviceId, (config) => {
            mqttState.config = config;
        });
    },

    setActiveDevice: async (device: LlllDevice) => {
        mqttActions.watchStatusLogs(device.id);
        mqttActions.watchConfig(device.id);
        mqttState.activeDevice = device;
        reSubscribe();
        toast.success(`Kết nối thiết bị: ${mqttState.activeDevice.name}`);
    },
};
