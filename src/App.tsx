import Auth from "@/components/Auth";
import { useSnapshot } from "valtio";
import { authState } from "./valtio/auth";
import Container from "@/layouts/Container";
import Dashboard from "@/features/Dashboard";

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
                <div className="flex-1">
                    <Dashboard />
                </div>
            )}
        </Container>
    );
}

export default App;
