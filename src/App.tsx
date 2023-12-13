import Auth from "@/components/Auth";
import Container from "@/layouts/Container";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSnapshot } from "valtio";
import Sidebar from "./layouts/Sidebar";
import { authState } from "./valtio/auth";
import { Outlet } from "react-router-dom";

function App() {
    const authSnap = useSnapshot(authState);
    const [collapsed, setCollapsed] = useState(true);

    const containerAnimation = collapsed ? "" : "translate-x-64";

    return (
        <Container className="relative overflow-x-hidden">
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
                        <div className="my-4 border-b border-secondary">
                            <MenuOutlined
                                className="text-2xl cursor-pointer rounded-md text-tertiary hover:text-primary transition select-none w-10 h-10 flex justify-center items-center"
                                onClick={() => setCollapsed(!collapsed)}
                            />
                        </div>

                        <Outlet />
                    </div>
                </div>
            )}
        </Container>
    );
}

export default App;
