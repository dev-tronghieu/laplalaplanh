import { signInWithGoogle } from "@/services/firebase";
import { UserCredential } from "firebase/auth";
import { proxy } from "valtio";

export interface AuthState {
    isLoggedIn: boolean;
    useCredential?: UserCredential;
}

export const authState = proxy<AuthState>({
    isLoggedIn: false,
});

export const authActions = {
    login: async () => {
        try {
            authState.isLoggedIn = true;
            authState.useCredential = await signInWithGoogle();
            console.log("--> auth", authState.useCredential);
        } catch (error) {
            console.log("[ERROR]", error);
        }
    },
    logout: () => {
        authState.isLoggedIn = false;
        authState.useCredential = undefined;
    },
};
