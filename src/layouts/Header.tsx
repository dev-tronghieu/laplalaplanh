"use client";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { authActions, authState } from "@/valtio/auth";
import { Link } from "react-router-dom";

interface Route {
    href: string;
    label: string;
}

const routes: Route[] = [
    {
        href: "/page1",
        label: "Trang 1",
    },
    {
        href: "/page2",
        label: "Trang 2",
    },
];

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const { isLoggedIn } = useSnapshot(authState);
    const pathname = window.location.pathname;

    const navContainerStyle = `${
        showMenu ? "flex flex-col gap-2" : "hidden"
    } md:flex md:flex-row md:items-center md:gap-4`;

    const menuStyle = "text-xl md:hidden";

    const handleLogin = async () => {
        await authActions.login();
    };

    const handleLogout = async () => {
        await authActions.logout();
    };

    return (
        <nav className="bg-indigo-400 p-4 text-white font-semibold text-center flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-fit flex items-center justify-between">
                <Link className="font-semibold uppercase" to="/">
                    Logo
                </Link>

                {showMenu ? (
                    <CloseOutlined
                        className={menuStyle}
                        onClick={() => {
                            setShowMenu(false);
                        }}
                    />
                ) : (
                    <MenuOutlined
                        className={menuStyle}
                        onClick={() => {
                            setShowMenu(true);
                        }}
                    />
                )}
            </div>

            <div className={navContainerStyle}>
                {routes.map((route) => (
                    <Link
                        className={`text-lg ${
                            pathname === route.href ? "text-cyan-200" : ""
                        }`}
                        to={route.href}
                        key={route.href}
                    >
                        {route.label}
                    </Link>
                ))}

                <button
                    className="text-lg"
                    onClick={isLoggedIn ? handleLogout : handleLogin}
                    type="button"
                >
                    {isLoggedIn ? `Đăng xuất` : "Đăng nhập"}
                </button>
            </div>
        </nav>
    );
}

export default Header;
