import mqtt from "mqtt";
import { proxy } from "valtio";

export const LLLL_CHANNEL = "laplalaplanh/";

export enum LLLL_TOPIC {
    HELLO = LLLL_CHANNEL + "hello",
}

export enum ConnectionStatus {
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
}

export interface MqttState {
    connectionStatus: ConnectionStatus;
    client: mqtt.MqttClient | null;
}

export const mqttState = proxy<MqttState>({
    connectionStatus: ConnectionStatus.DISCONNECTED,
    client: null,
});

export const mqttActions = {
    connect: () => {
        console.log("--> mqtt connecting");
        mqttState.connectionStatus = ConnectionStatus.CONNECTING;

        const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
            connectTimeout: 5000,
            queueQoSZero: false,
            keepalive: 60 * 60,
        });

        client.on("connect", () => {
            console.log("--> mqtt connected");
            mqttState.connectionStatus = ConnectionStatus.CONNECTED;
            const topics = Object.values(LLLL_TOPIC);
            topics.forEach((topic) => subscribe(client, topic));
        });

        client.on("message", handleReceiveMessage);

        client.on("error", (error) => {
            console.error("--> mqtt error:", error);
        });

        client.on("close", () => {
            console.log("--> mqtt connection closed");
            mqttState.connectionStatus = ConnectionStatus.DISCONNECTED;
            mqttState.client = null;
        });
    },

    disconnect: () => {
        console.log("--> mqtt disconnecting");
        mqttState.client?.end();
        mqttState.connectionStatus = ConnectionStatus.DISCONNECTED;
        mqttState.client = null;
    },

    publish: (topic: LLLL_TOPIC, message: string) => {
        mqttState.client?.publish(topic, message);
    },
};

const subscribe = (client: mqtt.MqttClient, topic: string) => {
    client.subscribe(topic, (error) => {
        if (error) {
            console.error("--> mqtt subscribe error:", error);
        } else {
            console.log("--> mqtt subscribed to topic:", topic);
        }
    });
};

const handleReceiveMessage: mqtt.OnMessageCallback = (
    topic: string,
    payload: Buffer
) => {
    const message = payload.toString();

    switch (topic) {
        case LLLL_TOPIC.HELLO:
            console.log("received message:", message, "from topic:", topic);
            break;

        default:
            console.log(
                "received message:",
                message,
                "from topic:",
                topic,
                "but no action defined"
            );
    }
};
