import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    NextOrObserver,
    User,
} from "firebase/auth";
import { firebaseApp } from "./setup";

const provider = new GoogleAuthProvider();

export const firebaseAuth = getAuth(firebaseApp);

export const onAuthStateChange = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(firebaseAuth, callback);

export const signInWithGoogle = () => signInWithPopup(firebaseAuth, provider);

export const signOut = () => firebaseAuth.signOut();
