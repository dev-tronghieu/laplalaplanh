import {
    getAccessibleDevices,
    getOwnedDevices,
    signInWithGoogle,
    signOut,
} from "@/services/firebase";
import { proxy } from "valtio";
import { toast } from "react-toastify";
import { mqttActions } from "./mqtt";
import * as mqttService from "@/services/mqtt";
import { type User } from "firebase/auth";

export interface AuthProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    profile?: AuthProfile;
}

export const authState = proxy<AuthState>({
    isLoggedIn: false,
});

export const authActions = {
    login: signInWithGoogle,
    persistentLogin: async (persistentUser: User) => {
        if (!persistentUser.email) {
            return toast.error("Email chưa được đăng ký");
        }

        const devices = await getAccessibleDevices(persistentUser.email);
        const ownedDevices = await getOwnedDevices(persistentUser.email);

        mqttActions.setOwnedDevices(ownedDevices);
        mqttActions.setDevices(devices);

        devices.length > 0 && (await mqttActions.setActiveDevice(devices[0]));
        ownedDevices.length > 0 && (await mqttActions.setActiveDeviceInfo(ownedDevices[0]));

        authState.profile = {
            uid: persistentUser.uid,
            email: persistentUser.email ?? "No email",
            displayName: persistentUser.displayName ?? "User",
            photoURL: persistentUser.photoURL ?? "https://picsum.photos/200",
        };

        authState.isLoggedIn = true;

        mqttService.start();
    },

    logout: async () => {
        await signOut();
        authState.isLoggedIn = false;
        authState.profile = undefined;
        mqttService.stop();
    },
};
