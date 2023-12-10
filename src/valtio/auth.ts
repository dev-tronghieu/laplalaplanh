import { getUser, signInWithGoogle, signOut } from "@/services/firebase";
import { proxy } from "valtio";
import { toast } from "react-toastify";
import { mqttActions } from "./mqtt";
import * as mqttService from "@/services/mqtt";

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
    login: async () => {
        try {
            const userCredential = await signInWithGoogle();
            if (!userCredential.user.email) {
                return toast.error("No email");
            }

            const user = await getUser(userCredential.user.email);
            if (!user) {
                return toast.error(
                    "Tài khoản chưa được đăng ký, vui lòng liên hệ chủ thiết bị."
                );
            }

            mqttActions.setDevices(user.devices);
            user.devices.length > 0 &&
                mqttActions.setActiveDevice(user.devices[0]);

            authState.profile = {
                uid: userCredential.user.uid,
                email: userCredential.user.email ?? "No email",
                displayName: userCredential.user.displayName ?? "User",
                photoURL:
                    userCredential.user.photoURL ?? "https://picsum.photos/200",
            };

            authState.isLoggedIn = true;

            mqttService.start();
        } catch (error) {
            toast.error(error as string);
        }
    },
    logout: async () => {
        await signOut();
        authState.isLoggedIn = false;
        authState.profile = undefined;
        mqttService.stop();
        toast.success("Đăng xuất thành công");
    },
};
