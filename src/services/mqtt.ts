import { mqttActions, mqttState } from "@/valtio/mqtt";
import mqtt from "mqtt";
import { toast } from "react-toastify";

export const LLLL_PREFIX = "laplalaplanh/";

export enum LLLL_CHANNEL {
    HELLO = LLLL_PREFIX + "hello",
}

const getTopicFromChannel = (channel: LLLL_CHANNEL) => {
    return `${channel}/${mqttState.activeDevice}`;
};

const getChannelFromTopic = (topic: string) => {
    const topicParts = topic.split("/");
    const channel = topicParts[0] + "/" + topicParts[1];
    return channel;
};

const subscribeAll = () => {
    const channels = Object.values(LLLL_CHANNEL);
    channels.forEach((channel) =>
        mqttClient.subscribe(getTopicFromChannel(channel))
    );
};

const unsubscribeAll = () => {
    const channels = Object.values(LLLL_CHANNEL);
    channels.forEach((channel) =>
        mqttClient.unsubscribe(getTopicFromChannel(channel))
    );
};

const handleReceiveMessage: mqtt.OnMessageCallback = (
    topic: string,
    payload: Buffer
) => {
    const message = payload.toString();
    const channel = getChannelFromTopic(topic);

    switch (channel) {
        case LLLL_CHANNEL.HELLO: {
            console.log(`[TOPIC: ${topic}] ${message}`);
            break;
        }
        default: {
            console.log("[UNKNOWN TOPIC]", message);
            break;
        }
    }
};

export const mqttClient = mqtt.connect(import.meta.env.VITE_MQTT, {
    connectTimeout: 5000,
});

mqttClient.on("connect", () => {
    console.log("MQTT Connected");
});

export const start = () => {
    if (!mqttState.activeDevice) {
        toast.error("Vui lòng chọn thiết bị");
        return;
    }
    subscribeAll();
    mqttClient.on("message", handleReceiveMessage);
};

export const stop = () => {
    mqttClient.end();
};

export const changeDevice = (deviceId: string) => {
    unsubscribeAll();
    mqttActions.setActiveDevice(deviceId);
    subscribeAll();
};

export const publish = (channel: LLLL_CHANNEL, message: string) => {
    mqttClient.publish(getTopicFromChannel(channel), message);
};
