import Auth from "@/components/Auth";
import Container from "@/layouts/Container";
import Dashboard from "@/pages/Dashboard";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSnapshot } from "valtio";
import Sidebar from "./layouts/Sidebar";
import { authState } from "./valtio/auth";

function App() {
    const authSnap = useSnapshot(authState);
    const [collapsed, setCollapsed] = useState(true);

    const containerAnimation = collapsed ? "" : "translate-x-64";

    return (
        <Container className="relative overflow-hidden">
            {!authSnap.isLoggedIn && (
                <div className="flex-1 flex justify-center items-center">
                    <Auth />
                </div>
            )}

            {authSnap.isLoggedIn && (
                <div
                    className={`absolute -left-64 flex-1 flex transition duration-300 ${containerAnimation}`}
                >
                    <Sidebar className="w-64 h-screen" />

                    <div className="px-4 flex-1 w-screen">
                        <MenuOutlined
                            className="my-4 text-2xl cursor-pointer rounded-md hover:bg-tertiary transition select-none w-10 h-10 flex justify-center items-center"
                            onClick={() => setCollapsed(!collapsed)}
                        />

                        <Dashboard />
                    </div>
                </div>
            )}
        </Container>
    );
}

export default App;
