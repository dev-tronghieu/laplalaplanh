import Auth from "@/components/Auth";
import { useSnapshot } from "valtio";
import { authState } from "./valtio/auth";
import Container from "@/layouts/Container";
import Dashboard from "@/features/Dashboard";
import Sidebar from "./layouts/Sidebar";

function App() {
    const authSnap = useSnapshot(authState);

    return (
        <Container>
            {!authSnap.isLoggedIn && (
                <div className="flex-1 flex justify-center items-center">
                    <Auth />
                </div>
            )}

            {authSnap.isLoggedIn && (
                <div className="flex-1 flex">
                    <Sidebar />
                    <Dashboard />
                </div>
            )}
        </Container>
    );
}

export default App;
