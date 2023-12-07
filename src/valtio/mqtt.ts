import { proxy } from "valtio";

export enum ConnectionStatus {
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
}

export interface MqttState {
    connectionStatus: ConnectionStatus;
    deviceId?: string;
}

export const mqttState = proxy<MqttState>({
    connectionStatus: ConnectionStatus.DISCONNECTED,
    deviceId: "test",
});

export const mqttActions = {
    updateConnectionStatus: (status: ConnectionStatus) => {
        mqttState.connectionStatus = status;
    },
    updateDeviceId: (deviceId: string) => {
        mqttState.deviceId = deviceId;
    },
};
