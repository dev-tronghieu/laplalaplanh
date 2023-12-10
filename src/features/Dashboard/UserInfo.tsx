import { authState } from "@/valtio/auth";
import { useSnapshot } from "valtio";

const UserInfo = () => {
    const authSnap = useSnapshot(authState);

    if (!authSnap.profile) return null;

    return (
        <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">
                Xin chào bạn, {authSnap.profile.displayName}
            </p>
            <img
                src={authSnap.profile.photoURL}
                alt="avatar"
                className="w-6 h-6 rounded-full"
            />
        </div>
    );
};

export default UserInfo;
