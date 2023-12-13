import {
    LogoutOutlined,
    DashboardOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { authActions } from "@/valtio/auth";
import { Link } from "react-router-dom";

interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    href: string;
    onClick?: () => void;
}

const SidebarItem = ({ icon, href, label, onClick }: SidebarItemProps) => {
    const pathname = window.location.pathname;

    const activeStyle =
        !onClick && href === pathname && "bg-indigo-500 text-white";

    return (
        <Link
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white transition-colors ${activeStyle}`}
            to={onClick ? "#" : href}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
};

const Sidebar = () => {
    return (
        <nav className="bg-indigo-400 min-w-[250px]">
            <SidebarItem
                icon={<DashboardOutlined />}
                label="Bảng điều khiển"
                href="/"
            />

            <SidebarItem
                icon={<ProfileOutlined />}
                label="Hồ sơ"
                href="/profile"
            />

            <SidebarItem
                icon={<SettingOutlined />}
                label="Quản lý thiết bị"
                href="manage"
            />

            <SidebarItem
                icon={<LogoutOutlined />}
                label="Đăng xuất"
                href="/"
                onClick={async () => {
                    await authActions.logout();
                }}
            />
        </nav>
    );
};

export default Sidebar;
