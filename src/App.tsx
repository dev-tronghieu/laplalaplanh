import Device from "@/components/Device";
import Auth from "@/components/Auth";
import { useSnapshot } from "valtio";
import { authState } from "./valtio/auth";

function App() {
    const authSnap = useSnapshot(authState);

    return (
        <div className="mx-auto my-4 flex flex-col items-center gap-4">
            <Auth />
            {authSnap.isLoggedIn && <Device />}
        </div>
    );
}

export default App;
