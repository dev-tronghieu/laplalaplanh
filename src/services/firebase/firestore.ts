import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
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
    users: string[];
    config: DeviceConfig;
}

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

export const updateDeviceName = async (id: string, name: string) => {
    const deviceRef = doc(db, "Devices", id);

    await updateDoc(deviceRef, {
        name: name,
    });
};

export const removeAccessOfDevice = async (id: string, user: string) => {
    const deviceRef = doc(db, "Devices", id);
    const users = (await getDoc(deviceRef)).data()?.users;
    const newUsers = users.filter((u: string) => u !== user);

    await updateDoc(deviceRef, {
        users: newUsers,
    });
};

export const addAccessToDevice = async (id: string, user: string) => {
    const deviceRef = doc(db, "Devices", id);
    const users = (await getDoc(deviceRef)).data()?.users;
    const newUsers = users.concat(user);

    await updateDoc(deviceRef, {
        users: newUsers,
    });
};

export const getAccessibleDevices = async (user: string) => {
    const deviceRef = collection(db, "Devices");
    const q = query(deviceRef, where("users", "array-contains", user));

    const querySnapshot = await getDocs(q);

    const devices: LlllDevice[] = [];

    querySnapshot.forEach((doc) => {
        devices.push({
            id: doc.id,
            name: doc.data().name,
            owner: doc.data().owner,
            users: doc.data().users,
            config: doc.data().config,
        } as LlllDevice);
    });

    return devices;
};

export const getOwnedDevices = async (owner: string) => {
    const devicesRef = collection(db, "Devices");
    const q = query(devicesRef, where("owner", "==", owner));

    const querySnapshot = await getDocs(q);

    const devices: LlllDevice[] = [];

    querySnapshot.forEach((doc) => {
        devices.push({
            id: doc.id,
            name: doc.data().name,
            owner: doc.data().owner,
            users: doc.data().users,
            config: doc.data().config,
        } as LlllDevice);
    });

    return devices;
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
    const deviceRef = doc(db, "Devices", deviceId);

    const unsubscribe = onSnapshot(deviceRef, (doc) => {
        if (doc.exists()) {
            const device: LlllDevice = {
                id: doc.id,
                name: doc.data().name,
                owner: doc.data().owner,
                users: doc.data().users,
                config: doc.data().config,
            };
            callback(device);
        }
    });

    return unsubscribe;
};
