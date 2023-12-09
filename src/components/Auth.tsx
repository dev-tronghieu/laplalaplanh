import { authActions, authState } from "@/valtio/auth";
import { useSnapshot } from "valtio";

const Auth = () => {
    const authSnap = useSnapshot(authState);

    if (!authSnap.isLoggedIn || !authSnap.profile) {
        return (
            <button className="btn" onClick={authActions.login}>
                Login with Google
            </button>
        );
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-2">
                <img
                    src={authSnap.profile.photoURL}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                />
                <p className="text-lg font-semibold">
                    {authSnap.profile.displayName}
                </p>
            </div>

            <button className="btn" onClick={authActions.logout}>
                Logout
            </button>
        </div>
    );
};

export default Auth;
