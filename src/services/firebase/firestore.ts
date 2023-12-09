import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseApp } from "./setup";

const db = getFirestore(firebaseApp);

export interface FirestoreUser {
    devices: string[];
}

export interface FirestoreDevice {
    owner: string;
}

export const getUser = async (email: string) => {
    const userRef = doc(db, "Users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as FirestoreUser;
    } else {
        return null;
    }
};
