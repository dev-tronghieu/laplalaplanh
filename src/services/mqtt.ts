import { mqttActions, mqttState } from "@/valtio/mqtt";
import mqtt from "mqtt";
import { toast } from "react-toastify";

export const LLLL_CHANNEL = "laplalaplanh/action";

export enum LLLL_ACTION_TYPE {
    SET_POWER = "set-power",
    SET_OPERATING_MODE = "set-operating-mode",
    CHANGE_EFFECT = "change-effect",
    CHANGE_COLOR = "change-color",
}

export const LLLL_ACTION_PARAMS = {
    SET_POWER: {
        ON: "on",
        OFF: "off",
    },
    SET_OPERATING_MODE: {
        AUTO: "auto",
        MANUAL: "manual",
    },
    CHANGE_EFFECT: {
        SINGLE_COLOR: "single-color",
        FLASHING: "flashing",
        RAINBOW: "rainbow",
    },
    CHANGE_COLOR: (color: string) => color,
};

export interface LLLL_ACTION_PAYLOAD {
    id: string;
    type: LLLL_ACTION_TYPE;
    data: string;
}

export const getTopicFromChannel = () => {
    return `${LLLL_CHANNEL}/${mqttState.activeDevice}`;
};

export const getChannelFromTopic = (topic: string) => {
    const topicParts = topic.split("/");
    const channel = topicParts.splice(0, topicParts.length - 1).join("/");
    return channel;
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
    mqttActions.setConnected(true);
    console.log("MQTT Connected");
});

export const start = () => {
    if (!mqttState.activeDevice) {
        toast.error("Vui lòng chọn thiết bị");
        return;
    }
    mqttClient.subscribe(getTopicFromChannel());
    mqttClient.on("message", handleReceiveMessage);
};

export const stop = () => {
    mqttClient.unsubscribe(getTopicFromChannel());
};

export const reSubscribe = () => {
    mqttClient.unsubscribe(getTopicFromChannel());
    mqttClient.subscribe(getTopicFromChannel());
};

export const publish = (type: LLLL_ACTION_TYPE, data: string) => {
    const payload: LLLL_ACTION_PAYLOAD = {
        id: crypto.randomUUID(),
        type,
        data,
    };
    const payloadString = JSON.stringify(payload);
    mqttClient.publish(getTopicFromChannel(), payloadString);
};
