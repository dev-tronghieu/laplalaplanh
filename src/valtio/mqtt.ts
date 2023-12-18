import {
    LlllDevice,
    StatusLog,
    watchDevice,
    watchStatusLogsByEpochTime,
} from "@/services/firebase";
import { reSubscribe as mqttResubscribe } from "@/services/mqtt";
import { toast } from "react-toastify";
import { proxy } from "valtio";

export interface MqttState {
    isConnected: boolean;
    devices: LlllDevice[];
    ownedDevices: LlllDevice[];
    activeDevice: LlllDevice;
    activeStatusLogs: StatusLog[];
    unsubscribeDevice?: () => void;
    unsubscribeStatusLogs?: () => void;
    logLimit: number;
    fromEpochTime: number;
    toEpochTime: number;
}

export const mqttState = proxy<MqttState>({
    isConnected: false,
    devices: [],
    ownedDevices: [],
    activeDevice: {
        id: "",
        name: "",
        owner: "",
        config: {
            power: "off",
            operatingMode: "auto",
            effect: "single-color",
            color: "#ffffff",
        },
    },
    activeStatusLogs: [],
    logLimit: 8,
    fromEpochTime: new Date().setHours(0, 0, 0, 0) / 1000,
    toEpochTime: new Date().setHours(23, 59, 59, 999) / 1000,
});

export const mqttActions = {
    setConnected: (connected: boolean) => {
        mqttState.isConnected = connected;
    },

    setDevices: (devices: LlllDevice[]) => {
        mqttState.devices = devices;
    },

    setOwnedDevices: (devices: LlllDevice[]) => {
        mqttState.ownedDevices = devices;
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

    watchDevice: async (deviceId: string) => {
        mqttState.unsubscribeDevice?.();
        mqttState.unsubscribeDevice = await watchDevice(deviceId, (device) => {
            mqttState.devices = mqttState.devices.map((d) =>
                d.id === device.id ? device : d
            );

            mqttState.activeDevice = device;
        });
    },

    setActiveDevice: async (device: LlllDevice) => {
        mqttActions.watchStatusLogs(device.id);
        mqttActions.watchDevice(device.id);
        mqttState.activeDevice = device;
        mqttResubscribe();
        toast.success(`Kết nối thiết bị: ${mqttState.activeDevice.name}`);
    },
};
