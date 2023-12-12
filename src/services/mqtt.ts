import { mqttActions, mqttState } from "@/valtio/mqtt";
import mqtt from "mqtt";
import { toast } from "react-toastify";

export const LLLL_PREFIX = "laplalaplanh/";

export enum LLLL_CHANNEL {
    HELLO = LLLL_PREFIX + "hello",
    ACTION_POWER = LLLL_PREFIX + "action/power",
    ACTION_OPERATION_MODE = LLLL_PREFIX + "action/operation-mode",
    ACTION_BRIGHTNESS = LLLL_PREFIX + "action/brightness",
    ACTION_LIGHT_MODE = LLLL_PREFIX + "action/light-mode",
    ACTION_REPORT_INTERVAL = LLLL_PREFIX + "action/report-interval",
}

export const LLLL_ACTION_PARAMS = {
    POWER: {
        ON: "on",
        OFF: "off",
    },
    OPERATION_MODE: {
        AUTO: "auto",
        MANUAL: "manual",
    },
    BRIGHTNESS: {
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high",
    },
    LIGHT_MODE: {
        EFFECT: {
            SINGLE_COLOR: "single-color",
            FLASHING: "flashing",
            PULSE: "pulse",
            RAINBOW: "rainbow",
            PARTY: "party",
        },
        COLOR: (color: string) => {
            return color;
        },
    },
    REPORT_INTERVAL: {
        THIRTY_SECONDS: "30s",
        ONE_MINUTE: "1m",
        THREE_MINUTES: "3m",
        FIVE_MINUTES: "5m",
        TEN_MINUTES: "10m",
    },
};

export const getTopicFromChannel = (channel: LLLL_CHANNEL) => {
    return `${channel}/${mqttState.activeDevice}`;
};

export const getChannelFromTopic = (topic: string) => {
    const topicParts = topic.split("/");
    const channel = topicParts.splice(0, topicParts.length - 1).join("/");
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
    console.log(`[${topic}] ${message}`);
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
    unsubscribeAll();
};

export const changeDevice = (deviceId: string) => {
    unsubscribeAll();
    mqttActions.setActiveDevice(deviceId);
    subscribeAll();
};

export const publish = (channel: LLLL_CHANNEL, message: string) => {
    mqttClient.publish(getTopicFromChannel(channel), message);
};
