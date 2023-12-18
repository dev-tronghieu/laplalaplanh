import { mqttActions, mqttState } from "@/valtio/mqtt";
import mqtt from "mqtt";
import { toast } from "react-toastify";

export const LLLL_CHANNEL = "laplalaplanh/action";

export enum LLLL_ACTION_TYPE {
    SET_POWER = "set-power",
    SET_OPERATING_MODE = "set-operating-mode",
    CHANGE_EFFECT = "change-effect",
    CHANGE_COLOR = "change-color",
    RESULT = "result",
}

const actionMap = new Map<string, LLLL_ACTION_PAYLOAD>();

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
    RESULT: {
        SUCCESS: "success",
        FAILURE: "failure",
    },
};

export interface LLLL_ACTION_PAYLOAD {
    id: string;
    type: LLLL_ACTION_TYPE;
    data: string;
    timeoutAt: number;
}

export const typeToReadableAction = (type: LLLL_ACTION_TYPE, data: string) => {
    switch (type) {
        case LLLL_ACTION_TYPE.SET_POWER:
            return data === LLLL_ACTION_PARAMS.SET_POWER.ON
                ? "bật đèn"
                : "tắt đèn";
        case LLLL_ACTION_TYPE.SET_OPERATING_MODE:
            return data === LLLL_ACTION_PARAMS.SET_OPERATING_MODE.AUTO
                ? "bật chế độ tự động"
                : "tắt chế độ tự động";
        case LLLL_ACTION_TYPE.CHANGE_EFFECT:
            switch (data) {
                case LLLL_ACTION_PARAMS.CHANGE_EFFECT.SINGLE_COLOR:
                    return "đổi hiệu ứng đơn sắc";
                case LLLL_ACTION_PARAMS.CHANGE_EFFECT.FLASHING:
                    return "đổi hiệu ứng nhấp nháy";
                case LLLL_ACTION_PARAMS.CHANGE_EFFECT.RAINBOW:
                    return "đổi hiệu ứng cầu vồng";
                default:
                    return "không xác định";
            }
        case LLLL_ACTION_TYPE.CHANGE_COLOR:
            return "đổi màu #" + data;
        default:
            return "Không xác định";
    }
};

const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getTopicFromChannel = () => {
    return `${LLLL_CHANNEL}/${mqttState.activeDevice.id}`;
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

    const data = JSON.parse(message) as LLLL_ACTION_PAYLOAD;
    if (data.type === LLLL_ACTION_TYPE.RESULT) {
        const action = actionMap.get(data.id);
        if (action) {
            actionMap.delete(data.id);
            toast.dismiss(action.id);
            if (data.data === LLLL_ACTION_PARAMS.RESULT.SUCCESS) {
                toast.success(
                    `Đã ${typeToReadableAction(action.type, action.data)}`
                );
            } else {
                toast.error(
                    `${capitalize(
                        typeToReadableAction(action.type, action.data)
                    )} thất bại`
                );
            }
        }
    }
};

export const mqttClient = mqtt.connect(import.meta.env.VITE_MQTT, {
    connectTimeout: 5000,
});

mqttClient.on("connect", () => {
    mqttActions.setConnected(true);
    console.log("MQTT Connected");
});

export const start = () => {
    if (!mqttState.activeDevice.id) {
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

export const ACTION_TIMEOUT_AFTER_MS = 1000 * 30;

export const publish = (type: LLLL_ACTION_TYPE, data: string) => {
    const timeoutAt = (new Date().getTime() + ACTION_TIMEOUT_AFTER_MS) / 1000;

    const payload: LLLL_ACTION_PAYLOAD = {
        id: crypto.randomUUID(),
        type,
        data,
        timeoutAt,
    };

    actionMap.set(payload.id, payload);

    toast.promise(
        new Promise((_, reject) => {
            setTimeout(() => {
                actionMap.delete(payload.id);
                reject(new Error("timeout"));
            }, ACTION_TIMEOUT_AFTER_MS);
        }),
        {
            pending: `Đang ${typeToReadableAction(type, data)}`,
            success: `Đã ${typeToReadableAction(type, data)}`,
            error: `${capitalize(typeToReadableAction(type, data))} thất bại`,
        },
        {
            toastId: payload.id,
        }
    );

    const payloadString = JSON.stringify(payload);

    mqttClient.publish(getTopicFromChannel(), payloadString);
};
