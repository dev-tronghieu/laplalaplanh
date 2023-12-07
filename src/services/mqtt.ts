import { ConnectionStatus, mqttActions, mqttState } from "@/valtio/mqtt";
import mqtt from "mqtt";

export const LLLL_PREFIX = "laplalaplanh/";

export enum LLLL_CHANNEL {
    HELLO = LLLL_PREFIX + "hello",
}

const getTopicFromChannel = (channel: LLLL_CHANNEL) => {
    return `${channel}/${mqttState.deviceId}`;
};

const getChannelFromTopic = (topic: string) => {
    const topicParts = topic.split("/");
    const channel = topicParts[0] + "/" + topicParts[1];
    return channel;
};

const handleReceiveMessage: mqtt.OnMessageCallback = (
    topic: string,
    payload: Buffer
) => {
    const message = payload.toString();
    const channel = getChannelFromTopic(topic);

    switch (channel) {
        case LLLL_CHANNEL.HELLO: {
            console.log(`[TOPIC: ${channel}] ${message}`);
            break;
        }
        default: {
            console.log("[UNKNOWN TOPIC]", message);
            break;
        }
    }
};

export const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
    connectTimeout: 5000,
});

mqttClient.on("connect", () => {
    console.log("MQTT Connected");
});

export const start = () => {
    if (!mqttState.deviceId) {
        console.error("[ERROR] Device ID is not set");
        return;
    }
    mqttActions.updateConnectionStatus(ConnectionStatus.CONNECTED);

    const channels = Object.values(LLLL_CHANNEL);
    channels.forEach((channel) =>
        mqttClient.subscribe(getTopicFromChannel(channel))
    );
    mqttClient.on("message", handleReceiveMessage);
};

export const stop = () => {
    mqttClient.removeAllListeners();
    mqttActions.updateConnectionStatus(ConnectionStatus.DISCONNECTED);
};

export const publish = (channel: LLLL_CHANNEL, message: string) => {
    mqttClient.publish(getTopicFromChannel(channel), message);
};
