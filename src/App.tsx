import Auth from "@/components/Auth";
import Container from "@/layouts/Container";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSnapshot } from "valtio";
import Sidebar from "./layouts/Sidebar";
import { authState } from "./valtio/auth";
import { Outlet } from "react-router-dom";
import { mqttState } from "./valtio/mqtt";

function App() {
    const authSnap = useSnapshot(authState);
    const mqttSnap = useSnapshot(mqttState);
    const [collapsed, setCollapsed] = useState(true);

    const containerAnimation = collapsed
        ? "translate-x-0   "
        : "translate-x-64";

    if (!mqttSnap.isConnected) {
        return (
            <Container>
                <div className="flex-1 flex justify-center items-center">
                    <div className="text-tertiary flex items-center gap-2">
                        <svg
                            className="animate-spin h-6 w-6"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>

                        <p className="text-xl font-bold">
                            Đang kết nối đến máy chủ MQTT
                        </p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            {!authSnap.isLoggedIn && (
                <div className="flex-1 flex justify-center items-center">
                    <Auth />
                </div>
            )}

            {authSnap.isLoggedIn && (
                <div className="flex-1 flex relative overflow-x-hidden">
                    <Sidebar className="w-64 fixed z-10 left-0 top-0 h-screen" />

                    <div
                        className={`min-h-screen bg-background px-4 py-2 transition duration-300 w-full absolute z-20 ${containerAnimation}`}
                    >
                        <div className="flex flex-col gap-2 mb-6">
                            <MenuOutlined
                                className="text-2xl cursor-pointer rounded-md text-tertiary hover:text-primary transition select-none w-10 h-10 flex justify-center items-center"
                                onClick={() => setCollapsed(!collapsed)}
                            />

                            <div className="h-[1px] w-full bg-primary" />
                        </div>

                        <Outlet />
                    </div>
                </div>
            )}
        </Container>
    );
}

export default App;
