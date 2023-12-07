import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "./setup";

const provider = new GoogleAuthProvider();

const auth = getAuth(firebaseApp);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
