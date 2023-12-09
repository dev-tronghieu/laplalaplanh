import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "./setup";

const provider = new GoogleAuthProvider();

export const firebaseAuth = getAuth(firebaseApp);

export const signInWithGoogle = () => signInWithPopup(firebaseAuth, provider);

export const signOut = () => firebaseAuth.signOut();
