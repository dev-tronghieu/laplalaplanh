import {
    getFirestore,
    collection,
    doc,
    getDoc,
    query,
    orderBy,
    limit as FirestoreLimit,
    where,
    onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "./setup";

const db = getFirestore(firebaseApp);

export interface LlllUser {
    devices: string[];
}

type Power = "on" | "off";
type OperatingMode = "auto" | "manual";
type Effect = "single-color" | "flashing" | "rainbow";

export interface DeviceConfig {
    power: Power;
    operatingMode: OperatingMode;
    effect: Effect;
    color: string;
}

export interface LlllDevice {
    id: string;
    name: string;
    owner: string;
    config: DeviceConfig;
}

export const getUser = async (email: string) => {
    const userRef = doc(db, "Users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as LlllUser;
    } else {
        return null;
    }
};

export const getDevice = async (id: string) => {
    const deviceRef = doc(db, "Devices", id);
    const deviceSnap = await getDoc(deviceRef);

    if (deviceSnap.exists()) {
        return {
            id: deviceSnap.id,
            name: deviceSnap.data().name,
            owner: deviceSnap.data().owner,
            config: deviceSnap.data().config,
        } as LlllDevice;
    } else {
        return null;
    }
};

export interface StatusLog {
    temperature: number;
    epochTime: number;
}

export const watchStatusLogsByEpochTime = async (
    device: string,
    fromEpochTime: number,
    toEpochTime: number,
    callback: (data: StatusLog[]) => void,
    limit: number = 5
) => {
    const statusLogsRef = collection(db, "Devices", device, "StatusLogs");

    const q = query(
        statusLogsRef,
        where("epochTime", ">=", fromEpochTime),
        where("epochTime", "<=", toEpochTime),
        orderBy("epochTime", "desc"),
        FirestoreLimit(limit)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: StatusLog[] = [];

        querySnapshot.forEach((doc) => {
            data.unshift(doc.data() as StatusLog);
        });

        if (callback) {
            callback(data);
        }
    });

    return unsubscribe;
};

export const watchDevice = async (
    deviceId: string,
    callback: (data: LlllDevice) => void
) => {
    const configRef = doc(db, "Devices", deviceId);

    const unsubscribe = onSnapshot(configRef, (doc) => {
        if (doc.exists()) {
            const device: LlllDevice = {
                id: doc.id,
                name: doc.data().name,
                owner: doc.data().owner,
                config: doc.data().config,
            };
            callback(device);
        }
    });

    return unsubscribe;
};
